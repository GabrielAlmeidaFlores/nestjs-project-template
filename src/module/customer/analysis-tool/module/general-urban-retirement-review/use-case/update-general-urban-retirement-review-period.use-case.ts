import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/query/general-urban-retirement-review-period.query.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { UpdateGeneralUrbanRetirementReviewPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/update-general-urban-retirement-review-period.request.dto';
import { UpdateGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/update-general-urban-retirement-review-period.response.dto';
import { GeneralUrbanRetirementReviewPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-period-not-found.error';

@Injectable()
export class UpdateGeneralUrbanRetirementReviewPeriodUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementReviewPeriodUseCase.name;

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
    dto: UpdateGeneralUrbanRetirementReviewPeriodRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementReviewPeriodResponseDto> {
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

    const periodEntity = new GeneralUrbanRetirementReviewPeriodEntity({
      ...period,
      category: dto.category ?? period.category,
      periodName: dto.periodName ?? period.periodName,
      generalUrbanRetirementReview,
    });

    const updateTransaction =
      this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementReviewPeriod(
        generalUrbanRetirementReviewPeriodId,
        periodEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateGeneralUrbanRetirementReviewPeriodResponseDto.build({
      generalUrbanRetirementReviewPeriodId,
    });
  }
}
