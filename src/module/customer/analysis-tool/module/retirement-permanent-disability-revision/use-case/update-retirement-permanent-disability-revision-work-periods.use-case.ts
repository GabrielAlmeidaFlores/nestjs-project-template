import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPermanentDisabilityRevisionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/retirement-permanent-disability-revision.query.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/command/retirement-permanent-disability-revision-work-periods.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods-earnings-history/command/retirement-permanent-disability-revision-work-periods-earnings-history.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/retirement-permanent-disability-revision-work-periods-earnings-history.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods-earnings-history/value-object/retirement-permanent-disability-revision-work-periods-earnings-history-id.value-object';
import { UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/update-retirement-permanent-disability-revision-work-periods.request.dto';
import { UpdateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/response/update-retirement-permanent-disability-revision-work-periods.response.dto';
import { RetirementPermanentDisabilityRevisionNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase {
  protected readonly _type =
    UpdateRetirementPermanentDisabilityRevisionWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionQueryRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionQueryRepositoryGateway: RetirementPermanentDisabilityRevisionQueryRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway)
    private readonly retirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway: RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway,
    @Inject(
      RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly retirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway: RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    dto: UpdateRetirementPermanentDisabilityRevisionWorkPeriodsRequestDto,
  ): Promise<UpdateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.retirementPermanentDisabilityRevisionQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionIdOrFailWithRelations(
      retirementPermanentDisabilityRevisionId,
      RetirementPermanentDisabilityRevisionNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.retirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway.deleteAllByRetirementPermanentDisabilityRevisionId(
        retirementPermanentDisabilityRevisionId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodsId =
        new RetirementPermanentDisabilityRevisionWorkPeriodsId();

      transactions.push(
        this.retirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionWorkPeriods(
          new RetirementPermanentDisabilityRevisionWorkPeriodsEntity({
            id: workPeriodsId,
            bondOrigin: workPeriodDto.bondOrigin,
            startDate: workPeriodDto.startDate,
            endDate: workPeriodDto.endDate ?? null,
            category: workPeriodDto.category,
            competenceBelowTheMinimum: workPeriodDto.competenceBelowTheMinimum,
            pendencyReason: workPeriodDto.pendencyReason ?? null,
            periodConsideration: workPeriodDto.periodConsideration ?? null,
            contributionAverage: workPeriodDto.contributionAverage ?? null,
            status: workPeriodDto.status,
            gracePeriod: workPeriodDto.gracePeriod,
            retirementPermanentDisabilityRevisionId,
          }),
        ),
      );

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (item) =>
            this.retirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryCommandRepositoryGateway.createRetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistory(
              new RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryEntity(
                {
                  id: new RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryId(),
                  competence: item.competence ?? null,
                  remuneration: item.remuneration ?? null,
                  indicators: item.indicators ?? null,
                  paymentDate: item.paymentDate ?? null,
                  contribution: item.contribution ?? null,
                  contributionSalary: item.contributionSalary ?? null,
                  competenceBelowTheMinimum:
                    item.competenceBelowTheMinimum ?? null,
                  retirementPermanentDisabilityRevisionWorkPeriodsId:
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

    return UpdateRetirementPermanentDisabilityRevisionWorkPeriodsResponseDto.build(
      {
        retirementPermanentDisabilityRevisionId,
      },
    );
  }
}
