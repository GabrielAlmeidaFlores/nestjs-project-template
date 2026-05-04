import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodLeaveDateActionEnum,
  PeriodLeaveDateActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-leave-date-action.request.dto';
import { DataLeaveIsEmptyError } from '@module/customer/analysis-tool/error/data-leave-is-empty.error';
import { GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-earnings-history/query/general-urban-retirement-review-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/general-urban-retirement-review-period.query.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { GeneralUrbanRetirementReviewPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-period-not-found.error';

@Injectable()
export class PeriodLeaveDateActionUseCase {
  protected readonly _type = PeriodLeaveDateActionUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodQueryRepositoryGateway: GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway: GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
    dto: PeriodLeaveDateActionRequestDto,
  ): Promise<void> {
    const period =
      await this.generalUrbanRetirementReviewPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewPeriodIdOrFailWithRelations(
        generalUrbanRetirementReviewPeriodId,
        GeneralUrbanRetirementReviewPeriodNotFoundError,
      );

    if (dto.action === PeriodLeaveDateActionEnum.IGNORE_PERIOD) {
      const updatedPeriod = new GeneralUrbanRetirementReviewPeriodEntity({
        ...period,
        deletedAt: new Date(),
      });

      const updateTransaction =
        this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementReviewPeriod(
          generalUrbanRetirementReviewPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();

      return;
    }

    if (dto.action === PeriodLeaveDateActionEnum.UPDATE_PERIOD) {
      if (!dto.dataLeave) {
        throw new DataLeaveIsEmptyError();
      }

      const updatedPeriod = new GeneralUrbanRetirementReviewPeriodEntity({
        ...period,
        periodEnd: dto.dataLeave,
        isPendency: false,
        reasonPendency: null,
      });

      const updateTransaction =
        this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementReviewPeriod(
          generalUrbanRetirementReviewPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();

      return;
    }

    const earnings =
      await this.generalUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway.findByGeneralUrbanRetirementReviewPeriodId(
        generalUrbanRetirementReviewPeriodId,
      );
    if (!earnings.length) {
      return;
    }
    const lastEarning = earnings.reduce((prev, curr) =>
      prev.competence && curr.competence && prev.competence > curr.competence
        ? prev
        : curr,
    );

    const generalUrbanRetirementReview = new GeneralUrbanRetirementReviewEntity(
      {
        ...period.generalUrbanRetirementReview,
      },
    );

    const updatedPeriod = new GeneralUrbanRetirementReviewPeriodEntity({
      ...period,
      periodEnd: lastEarning.competence,
      isPendency: false,
      reasonPendency: null,
      generalUrbanRetirementReview,
    });

    const updateTransaction =
      this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementReviewPeriod(
        generalUrbanRetirementReviewPeriodId,
        updatedPeriod,
      );
    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transactions.commit();
  }
}
