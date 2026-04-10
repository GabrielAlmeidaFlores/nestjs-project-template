import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/survivor-pension-analysis-deceased-work-history-period.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period-document/command/survivor-pension-analysis-deceased-work-history-period-document.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.entity';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-work-history-period-documents.request.dto';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-work-history-period-documents.response.dto';
import { SurvivorPensionAnalysisDwhNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-not-found.error';
import { SurvivorPensionAnalysisDwhpNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-period-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsUseCase {
  protected readonly _type =
    PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway)
    private readonly survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDwhpId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    dto: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dwhpResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDwhpId,
        SurvivorPensionAnalysisDwhpNotFoundError,
      );

    const dwhResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway.findOneByIdOrFail(
        dwhpResult.survivorPensionAnalysisDeceasedWorkHistoryId,
        SurvivorPensionAnalysisDwhNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dwhResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const uploadedDocuments = await Promise.all(
      dto.documents.map(async (doc) => {
        const buffer = doc.file.base64.decodeToBuffer();
        const fileModel = FileModel.build({
          buffer,
          originalName: doc.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });
        const documentName =
          await this.fileProcessorGateway.uploadFile(fileModel);
        return { documentType: doc.documentType, documentName };
      }),
    );

    const documentEntities = uploadedDocuments.map(
      (uploaded) =>
        new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity({
          survivorPensionAnalysisDeceasedWorkHistoryPeriodId:
            survivorPensionAnalysisDwhpId,
          documentType: uploaded.documentType,
          documentName: uploaded.documentName,
        }),
    );

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisDeceasedWorkHistoryPeriodId(
        survivorPensionAnalysisDwhpId,
      ),
      ...documentEntities.map((entity) =>
        this.survivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway.createSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocument(
          entity,
        ),
      ),
    ]);

    await txn.commit();

    return PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentsResponseDto.build(
      { survivorPensionAnalysisDwhpId },
    );
  }
}
