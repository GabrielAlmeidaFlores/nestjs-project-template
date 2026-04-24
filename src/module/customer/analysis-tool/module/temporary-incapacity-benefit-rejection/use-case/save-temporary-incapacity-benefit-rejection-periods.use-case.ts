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
import { SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/request/save-temporary-incapacity-benefit-rejection-periods.request.dto';
import { SaveTemporaryIncapacityBenefitRejectionPeriodsResponseDto } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/dto/response/save-temporary-incapacity-benefit-rejection-periods.response.dto';
import { TemporaryIncapacityBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/error/temporary-incapacity-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SaveTemporaryIncapacityBenefitRejectionPeriodsUseCase {
  protected readonly _type =
    SaveTemporaryIncapacityBenefitRejectionPeriodsUseCase.name;

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
    dto: SaveTemporaryIncapacityBenefitRejectionPeriodsRequestDto,
  ): Promise<SaveTemporaryIncapacityBenefitRejectionPeriodsResponseDto> {
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

    for (const periodDto of dto.periods) {
      const workPeriodsId =
        new TemporaryIncapacityBenefitRejectionWorkPeriodsId();

      transactions.push(
        this.temporaryIncapacityBenefitRejectionWorkPeriodsCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionWorkPeriods(
          new TemporaryIncapacityBenefitRejectionWorkPeriodsEntity({
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
            temporaryIncapacityBenefitRejectionId,
          }),
        ),
      );

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.temporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryCommandRepositoryGateway.createTemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistory(
              new TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryEntity(
                {
                  id: new TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryId(),
                  temporaryIncapacityBenefitRejectionWorkPeriodsId:
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

    return SaveTemporaryIncapacityBenefitRejectionPeriodsResponseDto.build({
      temporaryIncapacityBenefitRejectionId,
    });
  }

  private parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');

    return new Date(`${year}-${month}-${day}T00:00:00`);
  }
}
