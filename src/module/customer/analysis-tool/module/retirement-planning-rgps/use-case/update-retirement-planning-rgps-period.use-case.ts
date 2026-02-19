import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRgpsPeriodNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-period-not-found.error';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { UpdateRetirementPlanningRgpsPeriodRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/update-retirement-planning-rgps-period.request.dto';
import { UpdateRetirementPlanningRgpsPeriodResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/update-retirement-planning-rgps-period.response.dto';

@Injectable()
export class UpdateRetirementPlanningRgpsPeriodUseCase {
  protected readonly _type = UpdateRetirementPlanningRgpsPeriodUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodCommandRepositoryGateway: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodQueryRepositoryGateway: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
    dto: UpdateRetirementPlanningRgpsPeriodRequestDto,
  ): Promise<UpdateRetirementPlanningRgpsPeriodResponseDto> {
    const retirementPlanningRgpsPeriod =
      await this.retirementPlanningRgpsPeriodQueryRepositoryGateway.findOneByRetirementPlanningRgpsPeriodIdOrFailWithRelations(
        retirementPlanningRgpsPeriodId,
        RetirementPlanningRgpsPeriodNotFoundError,
      );

    const retirementPlanningRgps = new RetirementPlanningRgpsEntity({
      ...retirementPlanningRgpsPeriod.retirementPlanningRgps,
    });

    const retirementPlanningRgpsPeriodEntity =
      new RetirementPlanningRgpsPeriodEntity({
        ...retirementPlanningRgpsPeriod,
        category: dto.category ?? retirementPlanningRgpsPeriod.category,
        periodName: dto.periodName ?? retirementPlanningRgpsPeriod.periodName,
        retirementPlanningRgps,
      });

    const updateTransaction =
      this.retirementPlanningRgpsPeriodCommandRepositoryGateway.updateRetirementPlanningRgpsPeriod(
        retirementPlanningRgpsPeriodId,
        retirementPlanningRgpsPeriodEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);

    await transactions.commit();

    return UpdateRetirementPlanningRgpsPeriodResponseDto.build({
      retirementPlanningRgpsPeriodId,
    });
  }
}
