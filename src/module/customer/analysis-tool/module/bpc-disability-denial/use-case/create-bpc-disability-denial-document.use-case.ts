import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityDenialDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/repository/bpc-disability-denial-document/command/bpc-disability-denial-document.command.repository.gateway';
import { BpcDisabilityDenialEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/bpc-disability-denial.entity';
import { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import { BpcDisabilityDenialDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/bpc-disability-denial-document.entity';
import { CreateBpcDisabilityDenialDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/request/create-bpc-disability-denial-document.request.dto';
import { CreateBpcDisabilityDenialDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-denial/dto/response/create-bpc-disability-denial-document.response.dto';
import { BpcDisabilityDenialDocumentRequiredError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-document-required.error';
import { BpcDisabilityDenialNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-denial/error/bpc-disability-denial-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateBpcDisabilityDenialDocumentUseCase {
  protected readonly _type = CreateBpcDisabilityDenialDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityDenialDocumentCommandRepositoryGateway)
    private readonly bpcDisabilityDenialDocumentCommandRepositoryGateway: BpcDisabilityDenialDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    bpcDisabilityDenialId: BpcDisabilityDenialId,
    dto: CreateBpcDisabilityDenialDocumentRequestDto,
  ): Promise<CreateBpcDisabilityDenialDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityDenialIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityDenialId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityDenialNotFoundError,
      );

    const bpcDisabilityDenialQueryResult =
      analysisToolRecordQueryResult.bpcDisabilityDenial;

    if (bpcDisabilityDenialQueryResult === null) {
      throw new BpcDisabilityDenialNotFoundError();
    }

    const bpcDisabilityDenial = new BpcDisabilityDenialEntity({
      id: bpcDisabilityDenialQueryResult.id,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    if (dto.documents.length === 0) {
      throw new BpcDisabilityDenialDocumentRequiredError();
    }

    const documentEntities: BpcDisabilityDenialDocumentEntity[] = [];

    for (const documentDto of dto.documents) {
      const fileBuffer = Buffer.from(
        documentDto.file.base64.toString(),
        'base64',
      );

      const fileModel = FileModel.build({
        buffer: fileBuffer,
        originalName: documentDto.file.originalFileName,
        size: fileBuffer.length,
        encoding: '7bit',
      });

      const uploadedDocument =
        await this.fileProcessorGateway.uploadFile(fileModel);

      documentEntities.push(
        new BpcDisabilityDenialDocumentEntity({
          document: uploadedDocument,
          type: documentDto.type,
          bpcDisabilityDenial,
        }),
      );
    }

    const createDocumentsTransactions =
      this.bpcDisabilityDenialDocumentCommandRepositoryGateway.createManyBpcDisabilityDenialDocument(
        documentEntities,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: createDocumentsTransactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return CreateBpcDisabilityDenialDocumentResponseDto.build({
      bpcDisabilityDenialId: bpcDisabilityDenial.id,
    });
  }
}
