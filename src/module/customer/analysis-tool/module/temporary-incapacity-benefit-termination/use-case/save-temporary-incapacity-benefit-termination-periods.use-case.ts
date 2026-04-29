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
import { SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/request/save-temporary-incapacity-benefit-termination-periods.request.dto';
import { SaveTemporaryIncapacityBenefitTerminationPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/dto/response/save-temporary-incapacity-benefit-termination-periods.response.dto';
import { TemporaryIncapacityBenefitTerminationNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/error/temporary-incapacity-benefit-termination-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SaveTemporaryIncapacityBenefitTerminationPeriodsUseCase {
  protected readonly _type =
    SaveTemporaryIncapacityBenefitTerminationPeriodsUseCase.name;

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
    dto: SaveTemporaryIncapacityBenefitTerminationPeriodsRequestDto,
  ): Promise<SaveTemporaryIncapacityBenefitTerminationPeriodsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.temporaryIncapacityBenefitTerminationQueryRepositoryGateway.findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
      temporaryIncapacityBenefitTerminationId,
      TemporaryIncapacityBenefitTerminationNotFoundError,
    );

    const transactions: TransactionType[] = [
      this.temporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway.deleteAllByTemporaryIncapacityBenefitTerminationId(
        temporaryIncapacityBenefitTerminationId,
      ),
    ];

    for (const periodDto of dto.periods) {
      const workPeriodsId =
        new TemporaryIncapacityBenefitTerminationWorkPeriodsId();

      transactions.push(
        this.temporaryIncapacityBenefitTerminationWorkPeriodsCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationWorkPeriods(
          new TemporaryIncapacityBenefitTerminationWorkPeriodsEntity({
            id: workPeriodsId,
            bondOrigin: periodDto.bondOrigin ?? null,
            startDate: this.parseDateString(periodDto.startDate),
            endDate:
              periodDto.endDate !== undefined
                ? this.parseDateString(periodDto.endDate)
                : null,
            category: periodDto.category ?? null,
            activityDescription: periodDto.activityDescription ?? null,
            competenceBelowTheMinimum: periodDto.competenceBelowTheMinimum,
            pendencyReason: periodDto.pendencyReason ?? null,
            periodConsideration: periodDto.periodConsideration ?? null,
            contributionAverage: periodDto.contributionAverage ?? null,
            impactMonths: periodDto.impactMonths ?? null,
            gracePeriod: periodDto.graceMonths ?? null,
            isPendency: periodDto.isPendency,
            wantsToComplementViaMeuINSS:
              periodDto.wantsToComplementViaMeuINSS ?? null,
            status: periodDto.status,
            temporaryIncapacityBenefitTerminationId,
          }),
        ),
      );

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.temporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistory(
              new TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryIncapacityBenefitTerminationWorkPeriodsEarningsHistoryId(),
                  temporaryIncapacityBenefitTerminationWorkPeriodsId:
                    workPeriodsId,
                  ...(item.competence !== undefined && {
                    competence: this.parseDateString(item.competence),
                  }),
                  ...(item.value !== undefined && {
                    remuneration: item.value,
                  }),
                },
              ),
            ),
          );
        }
      }
    }

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return SaveTemporaryIncapacityBenefitTerminationPeriodsResponseDto.build({
      temporaryIncapacityBenefitTerminationId,
    });
  }

  private parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');

    return new Date(`${year}-${month}-${day}T00:00:00`);
  }
}
