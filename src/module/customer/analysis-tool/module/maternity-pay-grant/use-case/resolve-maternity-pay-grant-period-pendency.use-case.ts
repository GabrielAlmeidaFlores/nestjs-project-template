import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DataLeaveIsEmptyError } from '@module/customer/analysis-tool/error/data-leave-is-empty.error';
import { MaternityPayGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/command/maternity-pay-grant-period.command.repository.gateway';
import { MaternityPayGrantPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/maternity-pay-grant-period.query.repository.gateway';
import { GetMaternityPayGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period/query/result/get-maternity-pay-grant-period.query.result';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import { MaternityPayGrantPeriodEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/maternity-pay-grant-period.entity';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import {
  ResolveMaternityPayGrantPeriodPendencyActionEnum,
  ResolveMaternityPayGrantPeriodPendencyRequestDto,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/resolve-maternity-pay-grant-period-pendency.request.dto';
import { MaternityPayGrantPeriodNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-period-not-found.error';

@Injectable()
export class ResolveMaternityPayGrantPeriodPendencyUseCase {
  protected readonly _type = ResolveMaternityPayGrantPeriodPendencyUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(MaternityPayGrantPeriodCommandRepositoryGateway)
    private readonly maternityPayGrantPeriodCommandRepositoryGateway: MaternityPayGrantPeriodCommandRepositoryGateway,
    @Inject(MaternityPayGrantPeriodQueryRepositoryGateway)
    private readonly maternityPayGrantPeriodQueryRepositoryGateway: MaternityPayGrantPeriodQueryRepositoryGateway,
  ) {}

  public async execute(
    maternityPayGrantId: MaternityPayGrantId,
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
    dto: ResolveMaternityPayGrantPeriodPendencyRequestDto,
  ): Promise<void> {
    const period =
      await this.maternityPayGrantPeriodQueryRepositoryGateway.findOneByMaternityPayGrantPeriodIdOrFail(
        maternityPayGrantPeriodId,
        MaternityPayGrantPeriodNotFoundError,
      );

    if (
      dto.action === ResolveMaternityPayGrantPeriodPendencyActionEnum.IGNORE
    ) {
      await this.ignorePeriod(
        maternityPayGrantId,
        maternityPayGrantPeriodId,
        period,
      );
      return;
    }

    if (
      dto.action === ResolveMaternityPayGrantPeriodPendencyActionEnum.CONSIDER
    ) {
      await this.considerPeriod(
        maternityPayGrantId,
        maternityPayGrantPeriodId,
        period,
      );
      return;
    }

    if (
      dto.action ===
      ResolveMaternityPayGrantPeriodPendencyActionEnum.PROVISIONAL
    ) {
      await this.considerProvisionalPeriod(
        maternityPayGrantId,
        maternityPayGrantPeriodId,
        period,
      );
      return;
    }

    await this.updatePeriodEnd(
      maternityPayGrantId,
      maternityPayGrantPeriodId,
      period,
      dto.periodEnd,
    );
    return;
  }

  private async ignorePeriod(
    maternityPayGrantId: MaternityPayGrantId,
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
    period: GetMaternityPayGrantPeriodQueryResult,
  ): Promise<void> {
    const updatedPeriod = new MaternityPayGrantPeriodEntity({
      ...period,
      id: period.id,
      maternityPayGrantId,
      deletedAt: new Date(),
    });

    const updateTransaction =
      this.maternityPayGrantPeriodCommandRepositoryGateway.updateMaternityPayGrantPeriod(
        maternityPayGrantPeriodId,
        updatedPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }

  private async considerPeriod(
    maternityPayGrantId: MaternityPayGrantId,
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
    period: GetMaternityPayGrantPeriodQueryResult,
  ): Promise<void> {
    const updatedPeriod = new MaternityPayGrantPeriodEntity({
      ...period,
      id: period.id,
      maternityPayGrantId,
      isPendency: false,
      pendencyReason: null,
      periodConsideration: MaternityPayGrantPeriodConsiderationEnum.SIM,
    });

    const updateTransaction =
      this.maternityPayGrantPeriodCommandRepositoryGateway.updateMaternityPayGrantPeriod(
        maternityPayGrantPeriodId,
        updatedPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }

  private async considerProvisionalPeriod(
    maternityPayGrantId: MaternityPayGrantId,
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
    period: GetMaternityPayGrantPeriodQueryResult,
  ): Promise<void> {
    const updatedPeriod = new MaternityPayGrantPeriodEntity({
      ...period,
      id: period.id,
      maternityPayGrantId,
      isPendency: false,
      pendencyReason: null,
      periodConsideration: MaternityPayGrantPeriodConsiderationEnum.PROVISORIO,
    });

    const updateTransaction =
      this.maternityPayGrantPeriodCommandRepositoryGateway.updateMaternityPayGrantPeriod(
        maternityPayGrantPeriodId,
        updatedPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }

  private async updatePeriodEnd(
    maternityPayGrantId: MaternityPayGrantId,
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
    period: GetMaternityPayGrantPeriodQueryResult,
    periodEnd: Date | undefined,
  ): Promise<void> {
    if (!periodEnd) {
      throw new DataLeaveIsEmptyError();
    }

    const updatedPeriod = new MaternityPayGrantPeriodEntity({
      ...period,
      id: period.id,
      maternityPayGrantId,
      endDate: periodEnd,
      isPendency: false,
      pendencyReason: null,
      periodConsideration: MaternityPayGrantPeriodConsiderationEnum.SIM,
    });

    const updateTransaction =
      this.maternityPayGrantPeriodCommandRepositoryGateway.updateMaternityPayGrantPeriod(
        maternityPayGrantPeriodId,
        updatedPeriod,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
    ]);
    await transaction.commit();
  }
}
