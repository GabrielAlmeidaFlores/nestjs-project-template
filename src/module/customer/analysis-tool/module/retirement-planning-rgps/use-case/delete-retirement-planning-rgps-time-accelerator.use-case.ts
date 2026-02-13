import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/command/retirement-planning-rgps-time-accelerator.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { RetirementPlanningRgpsTimeAcceleratorEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/retirement-planning-rgps-time-accelerator.entity';
import { RetirementPlanningRgpsTimeAcceleratorId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-time-accelerator/value-object/retirement-planning-rgps-time-accelerator-id.value-object';
import { RetirementPlanningRgpsTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-time-accelerator-not-found.error';
import { DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/delete-retirement-planning-rgps-time-accelerator.response.dto';

@Injectable()
export class DeleteRetirementPlanningRgpsTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteRetirementPlanningRgpsTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway)
    private readonly retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway: RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway)
    private readonly retirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway: RetirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsTimeAcceleratorId: RetirementPlanningRgpsTimeAcceleratorId,
  ): Promise<DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    const timeAcceleratorResult =
      await this.retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway.findOneByRetirementPlanningRgpsTimeAcceleratorIdOrFail(
        retirementPlanningRgpsTimeAcceleratorId,
        RetirementPlanningRgpsTimeAcceleratorNotFoundError,
      );

    const updatedEntity = new RetirementPlanningRgpsTimeAcceleratorEntity({
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
    });

    const updateTx =
      this.retirementPlanningRgpsTimeAcceleratorCommandRepositoryGateway.updateRetirementPlanningRgpsTimeAccelerator(
        timeAcceleratorResult.id,
        updatedEntity,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTx,
    ]);

    await transaction.commit();

    return DeleteRetirementPlanningRgpsTimeAcceleratorResponseDto.build({
      retirementPlanningRgpsTimeAcceleratorId: timeAcceleratorResult.id,
    });
  }
}
