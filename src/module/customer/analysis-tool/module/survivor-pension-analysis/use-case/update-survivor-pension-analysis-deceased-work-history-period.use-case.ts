import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/command/survivor-pension-analysis-deceased-work-history-period.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/survivor-pension-analysis-deceased-work-history-period.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-deceased-work-history-period.request.dto';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-deceased-work-history-period.response.dto';
import { SurvivorPensionAnalysisDwhNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-not-found.error';
import { SurvivorPensionAnalysisDwhpNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-period-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase {
  protected readonly _type =
    UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodUseCase.name;

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
      SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway,
    )
    private readonly survivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDwhpId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    dto: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto> {
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

    const updatedEntity =
      new SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity({
        id: survivorPensionAnalysisDwhpId,
        survivorPensionAnalysisDeceasedWorkHistoryId:
          dwhpResult.survivorPensionAnalysisDeceasedWorkHistoryId,
        startDate: dto.startDate ?? dwhpResult.startDate,
        endDate: dto.endDate ?? dwhpResult.endDate,
        specialPeriodStartDate:
          dto.specialPeriodStartDate ?? dwhpResult.specialPeriodStartDate,
        specialPeriodEndDate:
          dto.specialPeriodEndDate ?? dwhpResult.specialPeriodEndDate,
        specialTimeType: dto.specialTimeType ?? dwhpResult.specialTimeType,
        jobTitle: dto.jobTitle ?? dwhpResult.jobTitle,
        careerName: dto.careerName ?? dwhpResult.careerName,
        serviceType: dto.serviceType ?? dwhpResult.serviceType,
        department: dto.department ?? dwhpResult.department,
      });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway.updateSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
        survivorPensionAnalysisDwhpId,
        updatedEntity,
      ),
    ]);

    await txn.commit();

    return UpdateSurvivorPensionAnalysisDeceasedWorkHistoryPeriodResponseDto.build(
      { survivorPensionAnalysisDwhpId },
    );
  }
}
