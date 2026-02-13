import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { RetirementPlanningRgpsResultNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-result-not-found.error';
import { UpdateRetirementPlanningRgpsResultRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/update-retirement-planning-rgps-result.request.dto';
import { UpdateRetirementPlanningRgpsResultResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/update-retirement-planning-rgps-result.response.dto';

@Injectable()
export class UpdateRetirementPlanningRgpsResultUseCase {
  protected readonly _type = UpdateRetirementPlanningRgpsResultUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsResultCommandRepositoryGateway: RetirementPlanningRgpsResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    dto: UpdateRetirementPlanningRgpsResultRequestDto,
  ): Promise<UpdateRetirementPlanningRgpsResultResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    if (!retirementPlanningRgps.retirementPlanningRgpsResult) {
      throw new RetirementPlanningRgpsResultNotFoundError();
    }

    const updatedRetirementPlanningRgpsResult =
      new RetirementPlanningRgpsResultEntity({
        ...retirementPlanningRgps.retirementPlanningRgpsResult,
        result: dto.result,
      });

    const updateTransaction =
      this.retirementPlanningRgpsResultCommandRepositoryGateway.updateRetirementPlanningRgpsResult(
        retirementPlanningRgps.retirementPlanningRgpsResult.id,
        updatedRetirementPlanningRgpsResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateRetirementPlanningRgpsResultResponseDto.build({
      retirementPlanningRgpsId,
    });
  }
}
