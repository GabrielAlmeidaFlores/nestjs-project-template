import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DataLeaveIsEmptyError } from '@module/customer/analysis-tool/error/data-leave-is-empty.error';
import { RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/command/retirement-permanent-disability-revision-work-periods.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/retirement-permanent-disability-revision-work-periods.query.repository.gateway';
import { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/enum/retirement-permanent-disability-revision-work-periods-period-consideration.enum';
import { RetirementPermanentDisabilityRevisionWorkPeriodsEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/retirement-permanent-disability-revision-work-periods.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';
import {
  ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum,
  ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto,
} from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/dto/request/resolve-retirement-permanent-disability-revision-work-periods-pendency.request.dto';
import { RetirementPermanentDisabilityRevisionWorkPeriodsNotFoundError } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/error/retirement-permanent-disability-revision-work-periods-not-found.error';

@Injectable()
export class ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase {
  protected readonly _type =
    ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway)
    private readonly workPeriodsCommandRepositoryGateway: RetirementPermanentDisabilityRevisionWorkPeriodsCommandRepositoryGateway,
    @Inject(RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway)
    private readonly workPeriodsQueryRepositoryGateway: RetirementPermanentDisabilityRevisionWorkPeriodsQueryRepositoryGateway,
  ) {}

  public async execute(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    dto: ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyRequestDto,
  ): Promise<void> {
    const workPeriod =
      await this.workPeriodsQueryRepositoryGateway.findOneByRetirementPermanentDisabilityRevisionWorkPeriodsIdOrFail(
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        RetirementPermanentDisabilityRevisionWorkPeriodsNotFoundError,
      );

    if (
      dto.action ===
      ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum.IGNORE
    ) {
      await this.ignoreWorkPeriod(
        retirementPermanentDisabilityRevisionId,
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        workPeriod,
      );
      return;
    }

    if (
      dto.action ===
      ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum.CONSIDER
    ) {
      await this.considerWorkPeriod(
        retirementPermanentDisabilityRevisionId,
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        workPeriod,
      );
      return;
    }

    if (
      dto.action ===
      ResolveRetirementPermanentDisabilityRevisionWorkPeriodsPendencyActionEnum.PROVISIONAL
    ) {
      await this.considerProvisionalWorkPeriod(
        retirementPermanentDisabilityRevisionId,
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        workPeriod,
      );
      return;
    }

    await this.updateWorkPeriodEnd(
      retirementPermanentDisabilityRevisionId,
      retirementPermanentDisabilityRevisionWorkPeriodsId,
      workPeriod,
      dto.periodEnd,
    );
    return;
  }

  private async ignoreWorkPeriod(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    workPeriod: GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
  ): Promise<void> {
    const updatedWorkPeriod = new RetirementPermanentDisabilityRevisionWorkPeriodsEntity(
      {
        ...workPeriod,
        id: workPeriod.retirementPermanentDisabilityRevisionWorkPeriodsId,
        retirementPermanentDisabilityRevisionId,
        deletedAt: new Date(),
      },
    );

    const updateTransaction =
      this.workPeriodsCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionWorkPeriods(
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        updatedWorkPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }

  private async considerWorkPeriod(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    workPeriod: GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
  ): Promise<void> {
    const updatedWorkPeriod = new RetirementPermanentDisabilityRevisionWorkPeriodsEntity(
      {
        ...workPeriod,
        id: workPeriod.retirementPermanentDisabilityRevisionWorkPeriodsId,
        retirementPermanentDisabilityRevisionId,
        pendencyReason: null,
        periodConsideration:
          RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum.SIM,
      },
    );

    const updateTransaction =
      this.workPeriodsCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionWorkPeriods(
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        updatedWorkPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }

  private async considerProvisionalWorkPeriod(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    workPeriod: GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
  ): Promise<void> {
    const updatedWorkPeriod = new RetirementPermanentDisabilityRevisionWorkPeriodsEntity(
      {
        ...workPeriod,
        id: workPeriod.retirementPermanentDisabilityRevisionWorkPeriodsId,
        retirementPermanentDisabilityRevisionId,
        pendencyReason: null,
        periodConsideration:
          RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum.PROVISORIO,
      },
    );

    const updateTransaction =
      this.workPeriodsCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionWorkPeriods(
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        updatedWorkPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }

  private async updateWorkPeriodEnd(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    retirementPermanentDisabilityRevisionWorkPeriodsId: RetirementPermanentDisabilityRevisionWorkPeriodsId,
    workPeriod: GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
    periodEnd: Date | undefined,
  ): Promise<void> {
    if (!periodEnd) {
      throw new DataLeaveIsEmptyError();
    }

    const updatedWorkPeriod = new RetirementPermanentDisabilityRevisionWorkPeriodsEntity(
      {
        ...workPeriod,
        id: workPeriod.retirementPermanentDisabilityRevisionWorkPeriodsId,
        retirementPermanentDisabilityRevisionId,
        endDate: periodEnd,
        pendencyReason: null,
        periodConsideration:
          RetirementPermanentDisabilityRevisionWorkPeriodsPeriodConsiderationEnum.SIM,
      },
    );

    const updateTransaction =
      this.workPeriodsCommandRepositoryGateway.updateRetirementPermanentDisabilityRevisionWorkPeriods(
        retirementPermanentDisabilityRevisionWorkPeriodsId,
        updatedWorkPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }
}
