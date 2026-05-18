import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import {
  PeriodConsiderationActionEnum,
  PeriodConsiderationActionRequestDto,
} from '@module/customer/analysis-tool/dto/request/period-consideration-action.request.dto';
import { AccidentAssistanceTerminatedPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/command/accident-assistance-terminated-period.command.repository.gateway';
import { AccidentAssistanceTerminatedPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/query/accident-assistance-terminated-period.query.repository.gateway';
import { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import { AccidentAssistanceTerminatedPeriodNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-period-not-found.error';

@Injectable()
export class UpdateAccidentAssistanceTerminatedPeriodConsiderationActionUseCase {
  protected readonly _type =
    UpdateAccidentAssistanceTerminatedPeriodConsiderationActionUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedPeriodCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedPeriodCommandRepositoryGateway: AccidentAssistanceTerminatedPeriodCommandRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedPeriodQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedPeriodQueryRepositoryGateway: AccidentAssistanceTerminatedPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    accidentAssistanceTerminatedPeriodId: AccidentAssistanceTerminatedPeriodId,
    dto: PeriodConsiderationActionRequestDto,
  ): Promise<void> {
    if (dto.action === PeriodConsiderationActionEnum.PROVISIONAL) {
      return;
    }

    const period =
      await this.accidentAssistanceTerminatedPeriodQueryRepositoryGateway.findOneAccidentAssistanceTerminatedPeriodByIdOrFail(
        accidentAssistanceTerminatedPeriodId,
        AccidentAssistanceTerminatedPeriodNotFoundError,
      );

    if (dto.action === PeriodConsiderationActionEnum.IGNORE) {
      const deleteTransaction =
        this.accidentAssistanceTerminatedPeriodCommandRepositoryGateway.deleteAccidentAssistanceTerminatedPeriod(
          period.id,
        );
      const transaction = await this.baseTransactionRepositoryGateway.execute([
        deleteTransaction,
      ]);
      await transaction.commit();
      return;
    }

    const updatedPeriod = new AccidentAssistanceTerminatedPeriodEntity({
      id: period.id,
      sequencial: period.sequencial,
      periodName: period.periodName,
      periodStart: period.periodStart,
      periodEnd: period.periodEnd,
      category: period.category,
      isPendency: false,
      competenceBelowTheMinimum: period.competenceBelowTheMinimum,
      contributionAverage: period.contributionAverage,
      typeOfContribution: period.typeOfContribution,
      status: true,
      reasonPendency: null,
      createdAt: period.createdAt,
      updatedAt: period.updatedAt,
    });

    const updateTransaction =
      this.accidentAssistanceTerminatedPeriodCommandRepositoryGateway.updateAccidentAssistanceTerminatedPeriod(
        accidentAssistanceTerminatedPeriodId,
        updatedPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }
}
