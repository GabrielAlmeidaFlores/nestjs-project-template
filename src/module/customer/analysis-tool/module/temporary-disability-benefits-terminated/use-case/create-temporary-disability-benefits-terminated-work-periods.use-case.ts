import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods/command/temporary-disability-benefits-terminated-work-periods.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-periods-earnings-history/command/temporary-disability-benefits-terminated-work-periods-earnings-history.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/value-object/temporary-disability-benefits-terminated-work-periods-earnings-history-id.value-object';
import { CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/request/create-temporary-disability-benefits-terminated-work-periods.request.dto';
import { CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/dto/response/create-temporary-disability-benefits-terminated-work-periods.response.dto';
import { TemporaryDisabilityBenefitsTerminatedNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/error/temporary-disability-benefits-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsUseCase {
  protected readonly _type =
    CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway: TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
    dto: CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsRequestDto,
  ): Promise<CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryDisabilityBenefitsTerminatedQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
      temporaryDisabilityBenefitsTerminatedId,
      TemporaryDisabilityBenefitsTerminatedNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.temporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsTerminatedId(
        temporaryDisabilityBenefitsTerminatedId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodsId =
        new TemporaryDisabilityBenefitsTerminatedWorkPeriodsId();

      transactions.push(
        this.temporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedWorkPeriods(
          new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity({
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
            temporaryDisabilityBenefitsTerminatedId,
          }),
        ),
      );

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (item) =>
            this.temporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistory(
              new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryId(),
                  competence: item.competence ?? null,
                  remuneration: item.remuneration ?? null,
                  indicators: item.indicators ?? null,
                  paymentDate: item.paymentDate ?? null,
                  contribution: item.contribution ?? null,
                  contributionSalary: item.contributionSalary ?? null,
                  competenceBelowTheMinimum:
                    item.competenceBelowTheMinimum ?? null,
                  temporaryDisabilityBenefitsTerminatedWorkPeriodsId:
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

    return CreateTemporaryDisabilityBenefitsTerminatedWorkPeriodsResponseDto.build(
      {
        temporaryDisabilityBenefitsTerminatedId,
      },
    );
  }
}
