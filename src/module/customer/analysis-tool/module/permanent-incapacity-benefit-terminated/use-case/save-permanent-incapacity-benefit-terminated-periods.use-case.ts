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
import { SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/request/save-permanent-incapacity-benefit-terminated-periods.request.dto';
import { SavePermanentIncapacityBenefitTerminatedPeriodsResponseDto } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/dto/response/save-permanent-incapacity-benefit-terminated-periods.response.dto';
import { PermanentIncapacityBenefitTerminatedNotFoundError } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/error/permanent-incapacity-benefit-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SavePermanentIncapacityBenefitTerminatedPeriodsUseCase {
  protected readonly _type =
    SavePermanentIncapacityBenefitTerminatedPeriodsUseCase.name;

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
    dto: SavePermanentIncapacityBenefitTerminatedPeriodsRequestDto,
  ): Promise<SavePermanentIncapacityBenefitTerminatedPeriodsResponseDto> {
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

    for (const periodDto of dto.periods) {
      const workPeriodsId =
        new PermanentIncapacityBenefitTerminatedWorkPeriodsId();

      transactions.push(
        this.permanentIncapacityBenefitTerminatedWorkPeriodsCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedWorkPeriods(
          new PermanentIncapacityBenefitTerminatedWorkPeriodsEntity({
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
            permanentIncapacityBenefitTerminatedId,
          }),
        ),
      );

      if (periodDto.earningsHistory && periodDto.earningsHistory.length > 0) {
        for (const item of periodDto.earningsHistory) {
          transactions.push(
            this.permanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway.createPermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistory(
              new PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryEntity(
                {
                  id: new PermanentIncapacityBenefitTerminatedWorkPeriodsEarningsHistoryId(),
                  permanentIncapacityBenefitTerminatedWorkPeriodsId:
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

    return SavePermanentIncapacityBenefitTerminatedPeriodsResponseDto.build({
      permanentIncapacityBenefitTerminatedId,
    });
  }

  private parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');

    return new Date(`${year}-${month}-${day}T00:00:00`);
  }
}
