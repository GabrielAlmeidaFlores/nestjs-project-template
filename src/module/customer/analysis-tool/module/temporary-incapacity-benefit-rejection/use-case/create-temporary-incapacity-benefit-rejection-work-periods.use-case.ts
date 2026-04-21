import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { TemporaryIncapacityBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/temporary-incapacity-benefit-rejection.query.repository.gateway';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-work-periods/command/temporary-incapacity-benefit-rejection-work-periods.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-work-periods-earnings-history/command/temporary-incapacity-benefit-rejection-work-periods-earnings-history.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/temporary-incapacity-benefit-rejection-work-periods.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods/value-object/temporary-incapacity-benefit-rejection-work-periods-id.value-object';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/temporary-incapacity-benefit-rejection-work-periods-earnings-history.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-work-periods-earnings-history/value-object/temporary-incapacity-benefit-rejection-work-periods-earnings-history-id.value-object';
import { CreateTemporaryIncapacityBenefitRejectionWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/create-temporary-incapacity-benefit-rejection-work-periods.request.dto';
import { CreateTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/create-temporary-incapacity-benefit-rejection-work-periods.response.dto';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase {
  protected readonly _type =
    CreateTemporaryIncapacityBenefitRejectionWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TemporaryIncapacityBenefitRejectionQueryRepositoryGateway)
    private readonly temporaryIncapacityBenefitRejectionQueryRepositoryGateway: TemporaryIncapacityBenefitRejectionQueryRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway,
    @Inject(
      TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly temporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway: TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    temporaryIncapacityBenefitRejectionId: TemporaryIncapacityBenefitRejectionId,
    dto: CreateTemporaryIncapacityBenefitRejectionWorkPeriodsRequestDto,
  ): Promise<CreateTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryIncapacityBenefitRejectionQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
      temporaryIncapacityBenefitRejectionId,
      TemporaryIncapacityBenefitRejectionNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitRejectionId(
        temporaryIncapacityBenefitRejectionId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodsId =
        new TemporaryIncapacityBenefitRejectionWorkPeriodsId();

      transactions.push(
        this.temporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionWorkPeriods(
          new TemporaryIncapacityBenefitRejectionWorkPeriodsEntity({
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
            temporaryIncapacityBenefitRejectionId,
          }),
        ),
      );

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (item) =>
            this.temporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistory(
              new TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId(),
                  competence: item.competence ?? null,
                  remuneration: item.remuneration ?? null,
                  indicators: item.indicators ?? null,
                  paymentDate: item.paymentDate ?? null,
                  contribution: item.contribution ?? null,
                  contributionSalary: item.contributionSalary ?? null,
                  competenceBelowTheMinimum:
                    item.competenceBelowTheMinimum ?? null,
                  temporaryIncapacityBenefitRejectionWorkPeriodsId:
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

    return CreateTemporaryIncapacityBenefitRejectionWorkPeriodsResponseDto.build(
      {
        temporaryIncapacityBenefitRejectionId,
      },
    );
  }
}
