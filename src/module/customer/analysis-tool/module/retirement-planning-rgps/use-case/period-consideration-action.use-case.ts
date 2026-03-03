import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodConsiderationActionEnum,
  PeriodConsiderationActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';
import { RetirementPlanningRgpsPeriodNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-period-not-found.error';

@Injectable()
export class PeriodConsiderationActionUseCase {
  protected readonly _type = PeriodConsiderationActionUseCase.name;

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
    dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    const period =
      await this.retirementPlanningRgpsPeriodQueryRepositoryGateway.findOneByRetirementPlanningRgpsPeriodIdOrFailWithRelations(
        retirementPlanningRgpsPeriodId,
        RetirementPlanningRgpsPeriodNotFoundError,
      );

    const retirementPlanningRgps = new RetirementPlanningRgpsEntity({
      ...period.retirementPlanningRgps,
    });

    if (dto.action === PeriodConsiderationActionEnum.IGNORE) {
      const updatedPeriod = new RetirementPlanningRgpsPeriodEntity({
        ...period,
        deletedAt: new Date(),
        retirementPlanningRgps,
      });
      const updateTransaction =
        this.retirementPlanningRgpsPeriodCommandRepositoryGateway.updateRetirementPlanningRgpsPeriod(
          retirementPlanningRgpsPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();
      return;
    }

    if (dto.action === PeriodConsiderationActionEnum.CONSIDER) {
      const updatedPeriod = new RetirementPlanningRgpsPeriodEntity({
        ...period,
        isPendency: false,
        reasonPendency: null,
        retirementPlanningRgps,
      });
      const updateTransaction =
        this.retirementPlanningRgpsPeriodCommandRepositoryGateway.updateRetirementPlanningRgpsPeriod(
          retirementPlanningRgpsPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();
      return;
    }

    return;
  }
}
