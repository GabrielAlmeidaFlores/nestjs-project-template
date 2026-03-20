import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/command/general-urban-retirement-grant-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/general-urban-retirement-grant-time-accelerator.query.repository.gateway';
import { GeneralUrbanRetirementGrantTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/general-urban-retirement-grant-time-accelerator.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';
import { DeleteGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/delete-general-urban-retirement-grant-time-accelerator.response.dto';
import { GeneralUrbanRetirementGrantTimeAcceleratorNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-time-accelerator-not-found.error';

@Injectable()
export class DeleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase {
  protected readonly _type =
    DeleteGeneralUrbanRetirementGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway: GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantTimeAcceleratorId: GeneralUrbanRetirementGrantTimeAcceleratorId,
  ): Promise<DeleteGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
    const timeAcceleratorResult =
      await this.generalUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantTimeAcceleratorIdOrFail(
        generalUrbanRetirementGrantTimeAcceleratorId,
        GeneralUrbanRetirementGrantTimeAcceleratorNotFoundError,
      );

    const updatedEntity = new GeneralUrbanRetirementGrantTimeAcceleratorEntity({
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
      this.generalUrbanRetirementGrantTimeAcceleratorCommandRepositoryGateway.updateGeneralUrbanRetirementGrantTimeAccelerator(
        timeAcceleratorResult.id,
        updatedEntity,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTx,
    ]);

    await transaction.commit();

    return DeleteGeneralUrbanRetirementGrantTimeAcceleratorResponseDto.build({
      generalUrbanRetirementGrantTimeAcceleratorId: timeAcceleratorResult.id,
    });
  }
}
