import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TemporaryIncapacityBenefitTerminationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/temporary-incapacity-benefit-termination.query.repository.gateway';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-work-periods/command/temporary-incapacity-benefit-termination-work-periods.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-work-periods-earnings-history/command/temporary-incapacity-benefit-termination-work-periods-earnings-history.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/temporary-incapacity-benefit-termination-work-periods.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods/value-object/temporary-incapacity-benefit-termination-work-periods-id.value-object';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/temporary-incapacity-benefit-termination-work-periods-earnings-history.entity';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-work-periods-earnings-history/value-object/temporary-incapacity-benefit-termination-work-periods-earnings-history-id.value-object';
import { UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/update-temporary-incapacity-benefit-termination-work-periods.request.dto';
import { UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/update-temporary-incapacity-benefit-termination-work-periods.response.dto';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { TemporaryIncapacityBenefitTerminationWorkPeriodsNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-work-periods-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsUseCase {
  protected readonly _type =
    UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitTerminationQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitTerminationQueryRepositoryGateway: TemporaryIncapacityBenefitTerminationQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway: TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
    dto: UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsRequestDto,
  ): Promise<UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
        temporaryIncapacityBenefitTerminationId,
        TemporaryIncapacityBenefitTerminationNotFoundError,
      );

    if (queryResult.workPeriods.length === 0) {
      throw new TemporaryIncapacityBenefitTerminationWorkPeriodsNotFoundError();
    }

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitTerminationId(
        temporaryIncapacityBenefitTerminationId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodsId =
        new TemporaryIncapacityBenefitTerminationWorkPeriodsId();

      transactions.push(
        this.temporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationWorkPeriods(
          new TemporaryIncapacityBenefitTerminationWorkPeriodsEntity({
            id: workPeriodsId,
            bondOrigin: workPeriodDto.bondOrigin,
            startDate: workPeriodDto.startDate,
            endDate: workPeriodDto.endDate ?? null,
            category: workPeriodDto.category,
            competenceBelowTheMinimum: workPeriodDto.competenceBelowTheMinimum,
            pendencyReason: workPeriodDto.pendencyReason ?? null,
            periodConsideration: workPeriodDto.periodConsideration ?? null,
            contributionAverage: workPeriodDto.contributionAverage ?? null,
            isPendency: false,
            status: workPeriodDto.status,
            gracePeriod: workPeriodDto.gracePeriod,
            temporaryIncapacityBenefitTerminationId,
          }),
        ),
      );

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (item) =>
            this.temporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistory(
              new TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId(),
                  competence: item.competence ?? null,
                  remuneration: item.remuneration ?? null,
                  indicators: item.indicators ?? null,
                  paymentDate: item.paymentDate ?? null,
                  contribution: item.contribution ?? null,
                  contributionSalary: item.contributionSalary ?? null,
                  competenceBelowTheMinimum:
                    item.competenceBelowTheMinimum ?? null,
                  temporaryIncapacityBenefitTerminationWorkPeriodsId:
                    workPeriodsId,
                },
              ),
            ),
        );

        transactions.push(...earningsHistoryTransactions);
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return UpdateTemporaryIncapacityBenefitTerminationWorkPeriodsResponseDto.build(
      {
        temporaryIncapacityBenefitTerminationId,
      },
    );
  }
}
