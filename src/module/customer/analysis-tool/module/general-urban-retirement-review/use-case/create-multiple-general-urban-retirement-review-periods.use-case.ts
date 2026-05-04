import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import {
  CreateMultipleGeneralUrbanRetirementReviewPeriodsRequestDto,
  DataGeneralUrbanRetirementReviewPeriodBulkItemRequestDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-multiple-general-urban-retirement-review-periods.request.dto';
import { CreateMultipleGeneralUrbanRetirementReviewPeriodsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-multiple-general-urban-retirement-review-periods.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';

@Injectable()
export class CreateMultipleGeneralUrbanRetirementReviewPeriodsUseCase {
  protected readonly _type =
    CreateMultipleGeneralUrbanRetirementReviewPeriodsUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateMultipleGeneralUrbanRetirementReviewPeriodsRequestDto,
  ): Promise<CreateMultipleGeneralUrbanRetirementReviewPeriodsResponseDto> {
    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFail(
        dto.generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const generalUrbanRetirementReviewEntity =
      new GeneralUrbanRetirementReviewEntity({
        ...generalUrbanRetirementReview,
      });

    const periodEntities: GeneralUrbanRetirementReviewPeriodEntity[] =
      dto.periods.map(
        (p: DataGeneralUrbanRetirementReviewPeriodBulkItemRequestDto) => {
          return new GeneralUrbanRetirementReviewPeriodEntity({
            periodName: p.periodName,
            periodStart: p.periodStart,
            periodEnd: p.periodEnd ?? null,
            category: p.category,
            isPendency: p.isPendency,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            contributionAverage: new DecimalValue(p.contributionAverage),
            typeOfContribution: p.typeOfContribution,
            generalUrbanRetirementReview: generalUrbanRetirementReviewEntity,
            status: p.status,
          });
        },
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      ...periodEntities.map((period) =>
        this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.createGeneralUrbanRetirementReviewPeriod(
          period,
        ),
      ),
    ]);

    await transactions.commit();

    return CreateMultipleGeneralUrbanRetirementReviewPeriodsResponseDto.build({
      generalUrbanRetirementReviewPeriodIds: periodEntities.map((p) => p.id),
    });
  }
}
