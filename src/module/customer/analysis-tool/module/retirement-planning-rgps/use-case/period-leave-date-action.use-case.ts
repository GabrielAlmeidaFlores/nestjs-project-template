import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodLeaveDateActionEnum,
  PeriodLeaveDateActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-leave-date-action.request.dto';
import { DataLeaveIsEmptyError } from '@module/customer/analysis-tool/error/data-leave-is-empty.error';
import { RetirementPlanningRgpsPeriodNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-period-not-found.error';
import { RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-earnings-history/query/retirement-planning-rgps-earnings-history.query.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

@Injectable()
export class PeriodLeaveDateActionUseCase {
  protected readonly _type = PeriodLeaveDateActionUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodCommandRepositoryGateway: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodQueryRepositoryGateway: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway)
    private readonly retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway: RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsPeriodId: RetirementPlanningRgpsPeriodId,
    dto: PeriodLeaveDateActionRequestDto,
  ): Promise<void> {
    const period =
      await this.retirementPlanningRgpsPeriodQueryRepositoryGateway.findOneByRetirementPlanningRgpsPeriodIdOrFailWithRelations(
        retirementPlanningRgpsPeriodId,
        RetirementPlanningRgpsPeriodNotFoundError,
      );

    if (dto.action === PeriodLeaveDateActionEnum.IGNORE_PERIOD) {
      const updatedPeriod = new RetirementPlanningRgpsPeriodEntity({
        ...period,
        deletedAt: new Date(),
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

    if (dto.action === PeriodLeaveDateActionEnum.UPDATE_PERIOD) {
      if (!dto.dataLeave) {
        throw new DataLeaveIsEmptyError();
      }

      const updatedPeriod = new RetirementPlanningRgpsPeriodEntity({
        ...period,
        periodEnd: dto.dataLeave,
        isPendency: false,
        reasonPendency: null,
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

    const earnings =
      await this.retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway.findByRetirementPlanningRgpsPeriodId(
        retirementPlanningRgpsPeriodId,
      );
    if (!earnings.length) {
      return;
    }
    const lastEarning = earnings.reduce((prev, curr) =>
      prev.competence && curr.competence && prev.competence > curr.competence
        ? prev
        : curr,
    );

    const retirementPlanningRgps = new RetirementPlanningRgpsEntity({
      ...period.retirementPlanningRgps,
    });

    const updatedPeriod = new RetirementPlanningRgpsPeriodEntity({
      ...period,
      periodEnd: lastEarning.competence,
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
  }
}
