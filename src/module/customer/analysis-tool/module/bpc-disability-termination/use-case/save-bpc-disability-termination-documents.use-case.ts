import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { BpcDisabilityTerminationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-document/command/bpc-disability-termination-document.command.repository.gateway';
import { BpcDisabilityTerminationEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/bpc-disability-termination.entity';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';
import { CreateBpcDisabilityTerminationDocumentRequestDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/request/create-bpc-disability-termination-document.request.dto';
import { CreateBpcDisabilityTerminationDocumentResponseDto } from '@module/customer/analysis-tool/module/bpc-disability-termination/dto/response/create-bpc-disability-termination-document.response.dto';
import { BpcDisabilityTerminationDocumentRequiredError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-document-required.error';
import { BpcDisabilityTerminationNotFoundError } from '@module/customer/analysis-tool/module/bpc-disability-termination/error/bpc-disability-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class SaveBpcDisabilityTerminationDocumentsUseCase {
  protected readonly _type = SaveBpcDisabilityTerminationDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BpcDisabilityTerminationDocumentCommandRepositoryGateway)
    private readonly bpcDisabilityTerminationDocumentCommandRepositoryGateway: BpcDisabilityTerminationDocumentCommandRepositoryGateway,
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
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
    dto: CreateBpcDisabilityTerminationDocumentRequestDto,
  ): Promise<CreateBpcDisabilityTerminationDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByBpcDisabilityTerminationIdAndOrganizationIdAndAuthIdentityIdOrFail(
        bpcDisabilityTerminationId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        BpcDisabilityTerminationNotFoundError,
      );

    const bpcDisabilityTerminationQueryResult =
      analysisToolRecordQueryResult.bpcDisabilityTermination;

    if (bpcDisabilityTerminationQueryResult === null) {
      throw new BpcDisabilityTerminationNotFoundError();
    }

    const bpcDisabilityTermination = new BpcDisabilityTerminationEntity({
      id: bpcDisabilityTerminationQueryResult.id,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    if (dto.documents.length === 0) {
      throw new BpcDisabilityTerminationDocumentRequiredError();
    }

    const documentEntities: BpcDisabilityTerminationDocumentEntity[] = [];

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
        new BpcDisabilityTerminationDocumentEntity({
          document: uploadedDocument,
          name: documentDto.file.originalFileName,
          type: documentDto.type,
          bpcDisabilityTermination,
        }),
      );
    }

    const deleteExistingDocumentsTransaction =
      this.bpcDisabilityTerminationDocumentCommandRepositoryGateway.deleteAllBpcDisabilityTerminationDocumentByBpcDisabilityTerminationId(
        bpcDisabilityTerminationId,
      );

    const createDocumentsTransactions =
      this.bpcDisabilityTerminationDocumentCommandRepositoryGateway.createManyBpcDisabilityTerminationDocument(
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
        transactions: [
          deleteExistingDocumentsTransaction,
          ...createDocumentsTransactions,
        ],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );
    await transaction.commit();

    return CreateBpcDisabilityTerminationDocumentResponseDto.build({
      bpcDisabilityTerminationId: bpcDisabilityTermination.id,
    });
  }
}
