import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/command/survivor-pension-analysis-deceased-work-history.command.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/survivor-pension-analysis-deceased-work-history.query.repository.gateway';
import { SurvivorPensionAnalysisDeceasedWorkHistoryEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/update-survivor-pension-analysis-deceased-work-history.request.dto';
import { UpdateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/update-survivor-pension-analysis-deceased-work-history.response.dto';
import { SurvivorPensionAnalysisDeceasedWorkHistoryNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-deceased-work-history-not-found.error';
import { SurvivorPensionAnalysisNotFoundError } from '@module/customer/analysis-tool/module/survivor-pension-analysis/error/survivor-pension-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase {
  protected readonly _type =
    UpdateSurvivorPensionAnalysisDeceasedWorkHistoryUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway)
    private readonly survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway,
    @Inject(SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway)
    private readonly survivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway: SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    dto: UpdateSurvivorPensionAnalysisDeceasedWorkHistoryRequestDto,
  ): Promise<UpdateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const dwhQueryResult =
      await this.survivorPensionAnalysisDeceasedWorkHistoryQueryRepositoryGateway.findOneByIdOrFail(
        survivorPensionAnalysisDeceasedWorkHistoryId,
        SurvivorPensionAnalysisDeceasedWorkHistoryNotFoundError,
      );

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySurvivorPensionAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      dwhQueryResult.survivorPensionAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      SurvivorPensionAnalysisNotFoundError,
    );

    const updatedDwh = new SurvivorPensionAnalysisDeceasedWorkHistoryEntity({
      id: survivorPensionAnalysisDeceasedWorkHistoryId,
      survivorPensionAnalysisId: dwhQueryResult.survivorPensionAnalysisId,
      startDate: dto.startDate ?? dwhQueryResult.startDate,
      endDate: dto.endDate ?? dwhQueryResult.endDate,
      remunerations: dto.remunerations ?? dwhQueryResult.remunerations,
    });

    const txn = await this.baseTransactionRepositoryGateway.execute([
      this.survivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway.updateSurvivorPensionAnalysisDeceasedWorkHistory(
        survivorPensionAnalysisDeceasedWorkHistoryId,
        updatedDwh,
      ),
    ]);

    await txn.commit();

    return UpdateSurvivorPensionAnalysisDeceasedWorkHistoryResponseDto.build({
      survivorPensionAnalysisDeceasedWorkHistoryId,
    });
  }
}
