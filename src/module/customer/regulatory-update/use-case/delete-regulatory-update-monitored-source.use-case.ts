import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RegulatoryUpdateMonitoredSourceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/command/regulatory-update-monitored-source.command.repository.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';
import { RegulatoryUpdateMonitoredSourceNotFoundError } from '@module/customer/regulatory-update/error/regulatory-update-monitored-source-not-found.error';

@Injectable()
export class DeleteRegulatoryUpdateMonitoredSourceUseCase {
  protected readonly _type = DeleteRegulatoryUpdateMonitoredSourceUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    @Inject(RegulatoryUpdateMonitoredSourceCommandRepositoryGateway)
    private readonly monitoredSourceCommandRepository: RegulatoryUpdateMonitoredSourceCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(id: RegulatoryUpdateMonitoredSourceId): Promise<void> {
    const existing =
      await this.monitoredSourceQueryRepository.findOneMonitoredSourceById(id);

    if (!existing) {
      throw new RegulatoryUpdateMonitoredSourceNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.monitoredSourceCommandRepository.deleteMonitoredSource(id),
    );

    await transaction.commit();
  }
}
