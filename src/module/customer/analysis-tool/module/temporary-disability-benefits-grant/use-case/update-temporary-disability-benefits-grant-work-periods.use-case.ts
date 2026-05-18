import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods/command/temporary-disability-benefits-grant-work-periods.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-work-periods-earnings-history/command/temporary-disability-benefits-grant-work-periods-earnings-history.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/temporary-disability-benefits-grant-work-periods-earnings-history.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history/value-object/temporary-disability-benefits-grant-work-periods-earnings-history-id.value-object';
import { UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/request/update-temporary-disability-benefits-grant-work-periods.request.dto';
import { UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/dto/response/update-temporary-disability-benefits-grant-work-periods.response.dto';
import { TemporaryDisabilityBenefitsGrantNotFoundError } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/error/temporary-disability-benefits-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase {
  protected readonly _type =
    UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantQueryRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantQueryRepositoryGateway: TemporaryDisabilityBenefitsGrantQueryRepositoryGateway,
    @Inject(TemporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway)
    private readonly temporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway,
    @Inject(
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway: TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
    dto: UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsRequestDto,
  ): Promise<UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryDisabilityBenefitsGrantQueryRepositoryGateway.findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
      temporaryDisabilityBenefitsGrantId,
      TemporaryDisabilityBenefitsGrantNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.temporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway.deleteAllByTemporaryDisabilityBenefitsGrantId(
        temporaryDisabilityBenefitsGrantId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodsId = new TemporaryDisabilityBenefitsGrantWorkPeriodsId();

      transactions.push(
        this.temporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantWorkPeriods(
          new TemporaryDisabilityBenefitsGrantWorkPeriodsEntity({
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
            temporaryDisabilityBenefitsGrantId,
          }),
        ),
      );

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (item) =>
            this.temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory(
              new TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryId(),
                  competence: item.competence ?? null,
                  remuneration: item.remuneration ?? null,
                  indicators: item.indicators ?? null,
                  paymentDate: item.paymentDate ?? null,
                  contribution: item.contribution ?? null,
                  contributionSalary: item.contributionSalary ?? null,
                  competenceBelowTheMinimum:
                    item.competenceBelowTheMinimum ?? null,
                  temporaryDisabilityBenefitsGrantWorkPeriodsId: workPeriodsId,
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

    return UpdateTemporaryDisabilityBenefitsGrantWorkPeriodsResponseDto.build({
      temporaryDisabilityBenefitsGrantId,
    });
  }
}
