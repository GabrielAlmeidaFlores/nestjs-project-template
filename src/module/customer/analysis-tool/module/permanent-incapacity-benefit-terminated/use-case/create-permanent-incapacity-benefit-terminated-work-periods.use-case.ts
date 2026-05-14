import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-work-periods/command/permanent-incapacity-benefit-terminated-work-periods.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-work-periods-earnings-history/command/permanent-incapacity-benefit-terminated-work-periods-earnings-history.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/permanent-incapacity-benefit-terminated-work-periods.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods/value-object/permanent-incapacity-benefit-terminated-work-periods-id.value-object';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/permanent-incapacity-benefit-terminated-work-periods-earnings-history.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-work-periods-earnings-history/value-object/permanent-incapacity-benefit-terminated-work-periods-earnings-history-id.value-object';
import { CreatePermanentIncapacityBenefitTerminatedWorkPeriodsRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/create-permanent-incapacity-benefit-terminated-work-periods.request.dto';
import { CreatePermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/create-permanent-incapacity-benefit-terminated-work-periods.response.dto';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreatePermanentIncapacityBenefitTerminatedWorkPeriodsUseCase {
  protected readonly _type =
    CreatePermanentIncapacityBenefitTerminatedWorkPeriodsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PermanentIncapacityBenefitTerminatedQueryRepositoryGateway)
    private readonly permanentIncapacityBenefitTerminatedQueryRepositoryGateway: PermanentIncapacityBenefitTerminatedQueryRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway,
    @Inject(
      PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    )
    private readonly permanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway: PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
    dto: CreatePermanentIncapacityBenefitTerminatedWorkPeriodsRequestDto,
  ): Promise<CreatePermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.permanentIncapacityBenefitTerminatedQueryRepositoryGateway.findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
      permanentIncapacityBenefitTerminatedId,
      PermanentIncapacityBenefitTerminatedNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.permanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway.deleteAllByPermanentIncapacityBenefitTerminatedId(
        permanentIncapacityBenefitTerminatedId,
      ),
    ];

    for (const workPeriodDto of dto.workPeriods) {
      const workPeriodsId =
        new PermanentIncapacityBenefitTerminatedWorkPeriodsId();

      transactions.push(
        this.permanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedWorkPeriods(
          new PermanentIncapacityBenefitTerminatedWorkPeriodsEntity({
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
            permanentIncapacityBenefitTerminatedId,
          }),
        ),
      );

      if (
        workPeriodDto.earningsHistory &&
        workPeriodDto.earningsHistory.length > 0
      ) {
        const earningsHistoryTransactions = workPeriodDto.earningsHistory.map(
          (item) =>
            this.permanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistory(
              new PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity(
                {
                  id: new PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId(),
                  competence: item.competence ?? null,
                  remuneration: item.remuneration ?? null,
                  indicators: item.indicators ?? null,
                  paymentDate: item.paymentDate ?? null,
                  contribution: item.contribution ?? null,
                  contributionSalary: item.contributionSalary ?? null,
                  competenceBelowTheMinimum:
                    item.competenceBelowTheMinimum ?? null,
                  permanentIncapacityBenefitTerminatedWorkPeriodsId:
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

    return CreatePermanentIncapacityBenefitTerminatedWorkPeriodsResponseDto.build(
      {
        permanentIncapacityBenefitTerminatedId,
      },
    );
  }
}
