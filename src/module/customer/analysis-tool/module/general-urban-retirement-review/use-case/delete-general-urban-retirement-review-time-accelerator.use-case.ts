import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/command/general-urban-retirement-review-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/query/general-urban-retirement-review-time-accelerator.query.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';
import { DeleteGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/delete-general-urban-retirement-review-time-accelerator.response.dto';
import { GeneralUrbanRetirementReviewTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-time-accelerator-not-found.error';

@Injectable()
export class DeleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteGeneralUrbanRetirementReviewTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway: GeneralUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewTimeAcceleratorId: GeneralUrbanRetirementReviewTimeAcceleratorId,
  ): Promise<DeleteGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
    const timeAcceleratorResult =
      await this.generalUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewTimeAcceleratorIdOrFail(
        generalUrbanRetirementReviewTimeAcceleratorId,
        GeneralUrbanRetirementReviewTimeAcceleratorNotFoundError,
      );

    const updatedEntity = new GeneralUrbanRetirementReviewTimeAcceleratorEntity(
      {
        id: timeAcceleratorResult.id,
        timeType: timeAcceleratorResult.timeType,
        name: timeAcceleratorResult.name ?? null,
        institution: timeAcceleratorResult.institution ?? null,
        periodStart: timeAcceleratorResult.periodStart ?? null,
        periodEnd: timeAcceleratorResult.periodEnd ?? null,
        affectsQualifyingPeriod:
          timeAcceleratorResult.affectsQualifyingPeriod ?? null,
        timeGained: timeAcceleratorResult.timeGained ?? null,
        viability: timeAcceleratorResult.viability ?? null,
        technicalNote: timeAcceleratorResult.technicalNote ?? null,
        recognitionInss: timeAcceleratorResult.recognitionInss,
        recognitionJudicial: timeAcceleratorResult.recognitionJudicial,
        deletedAt: new Date(),
      },
    );

    const updateTx =
      this.generalUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway.updateGeneralUrbanRetirementReviewTimeAccelerator(
        timeAcceleratorResult.id,
        updatedEntity,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTx,
    ]);

    await transaction.commit();

    return DeleteGeneralUrbanRetirementReviewTimeAcceleratorResponseDto.build({
      generalUrbanRetirementReviewTimeAcceleratorId: timeAcceleratorResult.id,
    });
  }
}
