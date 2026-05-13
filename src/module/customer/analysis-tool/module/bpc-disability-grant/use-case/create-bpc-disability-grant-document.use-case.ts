import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-document/command/bpc-disability-grant-document.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import { CreateBpcDisabilityGrantDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/request/create-bpc-disability-grant-document.request.dto';
import { CreateBpcDisabilityGrantDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-grant/dto/response/create-bpc-disability-grant-document.response.dto';
import { BpcDisabilityGrantDocumentRequiredError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-document-required.error';
import { BpcDisabilityGrantNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-grant/error/bpc-disability-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateBpcDisabilityGrantDocumentUseCase {
  protected readonly _type = CreateBpcDisabilityGrantDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityGrantDocumentCommandRepositoryGateway)
    private readonly bpcDisabilityGrantDocumentCommandRepositoryGateway: BpcDisabilityGrantDocumentCommandRepositoryGateway,
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
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    dto: CreateBpcDisabilityGrantDocumentRequestDto,
  ): Promise<CreateBpcDisabilityGrantDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityGrantNotFoundError,
      );

    const bpcDisabilityGrantQueryResult =
      analysisToolRecordQueryResult.bpcDisabilityGrant;

    if (bpcDisabilityGrantQueryResult === null) {
      throw new BpcDisabilityGrantNotFoundError();
    }

    if (dto.documents.length === 0) {
      throw new BpcDisabilityGrantDocumentRequiredError();
    }

    const documentEntities: BpcDisabilityGrantDocumentEntity[] = [];

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
        new BpcDisabilityGrantDocumentEntity({
          document: uploadedDocument,
          type: documentDto.type,
          BpcDisabilityGrantId: bpcDisabilityGrantId,
        }),
      );
    }

    const createDocumentsTransactions =
      this.bpcDisabilityGrantDocumentCommandRepositoryGateway.createManyBpcDisabilityGrantDocument(
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

    return CreateBpcDisabilityGrantDocumentResponseDto.build({
      BpcDisabilityGrantId: bpcDisabilityGrantId,
    });
  }
}
