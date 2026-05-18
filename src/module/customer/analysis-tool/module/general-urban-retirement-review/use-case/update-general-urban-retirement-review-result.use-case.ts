import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { UpdateGeneralUrbanRetirementReviewResultRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/update-general-urban-retirement-review-result.request.dto';
import { UpdateGeneralUrbanRetirementReviewResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/update-general-urban-retirement-review-result.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { GeneralUrbanRetirementReviewResultNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-result-not-found.error';

@Injectable()
export class UpdateGeneralUrbanRetirementReviewResultUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementReviewResultUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    dto: UpdateGeneralUrbanRetirementReviewResultRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementReviewResultResponseDto> {
    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    if (!generalUrbanRetirementReview.generalUrbanRetirementReviewResult) {
      throw new GeneralUrbanRetirementReviewResultNotFoundError();
    }

    const updatedResult = new GeneralUrbanRetirementReviewResultEntity({
      ...generalUrbanRetirementReview.generalUrbanRetirementReviewResult,
      generalUrbanRetirementReviewCompleteAnalysis:
        dto.generalUrbanRetirementReviewCompleteAnalysis,
    });

    const updateTransaction =
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
        generalUrbanRetirementReview.generalUrbanRetirementReviewResult.id,
        updatedResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateGeneralUrbanRetirementReviewResultResponseDto.build({
      generalUrbanRetirementReviewId,
    });
  }
}
