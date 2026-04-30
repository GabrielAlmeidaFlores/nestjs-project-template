import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcElderlyCessationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/repository/bpc-elderly-cessation-document/command/bpc-elderly-cessation-document.command.repository.gateway';
import { BpcElderlyCessationEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/bpc-elderly-cessation.entity';
import { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import { BpcElderlyCessationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/bpc-elderly-cessation-document.entity';
import { CreateBpcElderlyCessationDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/request/create-bpc-elderly-cessation-document.request.dto';
import { CreateBpcElderlyCessationDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/dto/response/create-bpc-elderly-cessation-document.response.dto';
import { BpcElderlyCessationDocumentRequiredError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-document-required.error';
import { BpcElderlyCessationNotFoundError } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/error/bpc-elderly-cessation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateBpcElderlyCessationDocumentUseCase {
  protected readonly _type = CreateBpcElderlyCessationDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcElderlyCessationDocumentCommandRepositoryGateway)
    private readonly bpcElderlyCessationDocumentCommandRepositoryGateway: BpcElderlyCessationDocumentCommandRepositoryGateway,
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
    bpcElderlyCessationId: BpcElderlyCessationId,
    dto: CreateBpcElderlyCessationDocumentRequestDto,
  ): Promise<CreateBpcElderlyCessationDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcElderlyCessationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcElderlyCessationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcElderlyCessationNotFoundError,
      );

    const bpcElderlyCessationQueryResult =
      analysisToolRecordQueryResult.bpcElderlyCessation;

    if (bpcElderlyCessationQueryResult === null) {
      throw new BpcElderlyCessationNotFoundError();
    }

    const bpcElderlyCessation = new BpcElderlyCessationEntity({
      id: bpcElderlyCessationQueryResult.id,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    if (dto.documents.length === 0) {
      throw new BpcElderlyCessationDocumentRequiredError();
    }

    const documentEntities: BpcElderlyCessationDocumentEntity[] = [];

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
        new BpcElderlyCessationDocumentEntity({
          document: uploadedDocument,
          type: documentDto.type,
          bpcElderlyCessation,
        }),
      );
    }

    const createDocumentsTransactions =
      this.bpcElderlyCessationDocumentCommandRepositoryGateway.createManyBpcElderlyCessationDocument(
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

    return CreateBpcElderlyCessationDocumentResponseDto.build({
      bpcElderlyCessationId: bpcElderlyCessation.id,
    });
  }
}
