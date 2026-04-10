import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/command/survivor-pension-analysis-deceased-work-history-period.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period-document/command/survivor-pension-analysis-deceased-work-history-period-document.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.entity';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/put-survivor-pension-analysis-deceased-work-history-periods.request.dto';
import { PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/put-survivor-pension-analysis-deceased-work-history-periods.response.dto';
import { SurvivorPensionAnalysisDwhNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase {
  protected readonly _type =
    PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway)
    private readonly survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway,
    @Inject(
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway,
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
    survivorPensionAnalysisDwhId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    dto: PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsRequestDto,
  ): Promise<PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dwhResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDwhId,
        SurvivorPensionAnalysisDwhNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dwhResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const periodsWithFileNames = await Promise.all(
      dto.periods.map(async (periodDto) => {
        const fileNames = await Promise.all(
          (periodDto.documents ?? []).map(async (doc) => {
            const buffer = doc.file.base64.decodeToBuffer();
            const fileModel = FileModel.build({
              buffer,
              originalName: doc.file.originalFileName,
              size: buffer.length,
              encoding: '7bit',
            });
            const fileName =
              await this.fileProcessorGateway.uploadFile(fileModel);
            return { documentType: doc.documentType, fileName };
          }),
        );
        return { periodDto, fileNames };
      }),
    );

    const periodEntities = periodsWithFileNames.map(
      ({ periodDto }) =>
        new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity({
          survivorPensionAnalysisDeceasedWorkHistoryId:
            survivorPensionAnalysisDwhId,
          ...(periodDto.startDate !== undefined && {
            startDate: periodDto.startDate,
          }),
          ...(periodDto.endDate !== undefined && {
            endDate: periodDto.endDate,
          }),
          ...(periodDto.specialPeriodStartDate !== undefined && {
            specialPeriodStartDate: periodDto.specialPeriodStartDate,
          }),
          ...(periodDto.specialPeriodEndDate !== undefined && {
            specialPeriodEndDate: periodDto.specialPeriodEndDate,
          }),
          ...(periodDto.specialTimeType !== undefined && {
            specialTimeType: periodDto.specialTimeType,
          }),
          ...(periodDto.jobTitle !== undefined && {
            jobTitle: periodDto.jobTitle,
          }),
          ...(periodDto.careerName !== undefined && {
            careerName: periodDto.careerName,
          }),
          ...(periodDto.serviceType !== undefined && {
            serviceType: periodDto.serviceType,
          }),
          ...(periodDto.department !== undefined && {
            department: periodDto.department,
          }),
        }),
    );

    const transactions = [
      this.survivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway.deleteAllBySurvivorPensionAnalysisDeceasedWorkHistoryId(
        survivorPensionAnalysisDwhId,
      ),
      ...periodsWithFileNames.flatMap(({ fileNames }, i) => {
        const entity = periodEntities[i];
        if (entity === undefined) {
          return [];
        }
        return [
          this.survivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway.createSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
            entity,
          ),
          ...fileNames.map((f) =>
            this.survivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway.createSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocument(
              new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity(
                {
                  survivorPensionAnalysisDeceasedWorkHistoryPeriodId: entity.id,
                  documentType: f.documentType,
                  documentName: f.fileName,
                },
              ),
            ),
          ),
        ];
      }),
    ];

    const txn =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await txn.commit();

    return PutSurvivorPensionAnalysisDeceasedWorkHistoryPeriodsResponseDto.build(
      { survivorPensionAnalysisDwhId },
    );
  }
}
