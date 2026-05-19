import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodLeaveDateActionEnum,
  PeriodLeaveDateActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-leave-date-action.request.dto';
import { DataLeaveIsEmptyError } from '@module/customer/analysis-tool/error/data-leave-is-empty.error';
import { GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-earnings-history/query/general-urban-retirement-grant-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/query/general-urban-retirement-grant-period.query.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/value-object/general-urban-retirement-grant-period-id.value-object';
import { GeneralUrbanRetirementGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-period-not-found.error';

@Injectable()
export class PeriodLeaveDateActionUseCase {
  protected readonly _type = PeriodLeaveDateActionUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodCommandRepositoryGateway: GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodQueryRepositoryGateway: GeneralUrbanRetirementGrantPeriodQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway: GeneralUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementGrantPeriodId: GeneralUrbanRetirementGrantPeriodId,
    dto: PeriodLeaveDateActionRequestDto,
  ): Promise<void> {
    const period =
      await this.generalUrbanRetirementGrantPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantPeriodIdOrFailWithRelations(
        generalUrbanRetirementGrantPeriodId,
        GeneralUrbanRetirementGrantPeriodNotFoundError,
      );

    if (dto.action === PeriodLeaveDateActionEnum.IGNORE_PERIOD) {
      const updatedPeriod = new GeneralUrbanRetirementGrantPeriodEntity({
        ...period,
        deletedAt: new Date(),
      });

      const updateTransaction =
        this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementGrantPeriod(
          generalUrbanRetirementGrantPeriodId,
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

      const updatedPeriod = new GeneralUrbanRetirementGrantPeriodEntity({
        ...period,
        periodEnd: dto.dataLeave,
        isPendency: false,
        reasonPendency: null,
      });

      const updateTransaction =
        this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementGrantPeriod(
          generalUrbanRetirementGrantPeriodId,
          updatedPeriod,
        );
      const transactions = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transactions.commit();

      return;
    }

    const earnings =
      await this.generalUrbanRetirementGrantEarningsHistoryQueryRepositoryGateway.findByGeneralUrbanRetirementGrantPeriodId(
        generalUrbanRetirementGrantPeriodId,
      );
    if (!earnings.length) {
      return;
    }
    const lastEarning = earnings.reduce((prev, curr) =>
      prev.competence && curr.competence && prev.competence > curr.competence
        ? prev
        : curr,
    );

    const generalUrbanRetirementGrant = new GeneralUrbanRetirementGrantEntity({
      ...period.generalUrbanRetirementGrant,
    });

    const updatedPeriod = new GeneralUrbanRetirementGrantPeriodEntity({
      ...period,
      periodEnd: lastEarning.competence,
      isPendency: false,
      reasonPendency: null,
      generalUrbanRetirementGrant,
    });

    const updateTransaction =
      this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.updateGeneralUrbanRetirementGrantPeriod(
        generalUrbanRetirementGrantPeriodId,
        updatedPeriod,
      );
    const transactions = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transactions.commit();
  }
}
