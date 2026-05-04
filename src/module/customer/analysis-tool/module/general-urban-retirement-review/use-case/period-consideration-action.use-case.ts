import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodConsiderationActionEnum,
  PeriodConsiderationActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/general-urban-retirement-review-period.query.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { GeneralUrbanRetirementReviewPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-period-not-found.error';

@Injectable()
export class PeriodConsiderationActionUseCase {
  protected readonly _type = PeriodConsiderationActionUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodQueryRepositoryGateway: GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewPeriodId: GeneralUrbanRetirementReviewPeriodId,
    dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    const period =
      await this.generalUrbanRetirementReviewPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewPeriodIdOrFailWithRelations(
        generalUrbanRetirementReviewPeriodId,
        GeneralUrbanRetirementReviewPeriodNotFoundError,
      );

    const generalUrbanRetirementReview = new GeneralUrbanRetirementReviewEntity(
      {
        ...period.generalUrbanRetirementReview,
      },
    );

    if (dto.action === PeriodConsiderationActionEnum.IGNORE) {
      const updatedPeriod = new GeneralUrbanRetirementReviewPeriodEntity({
        ...period,
        deletedAt: new Date(),
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
      return;
    }

    if (dto.action === PeriodConsiderationActionEnum.CONSIDER) {
      const updatedPeriod = new GeneralUrbanRetirementReviewPeriodEntity({
        ...period,
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
      return;
    }
  }
}
