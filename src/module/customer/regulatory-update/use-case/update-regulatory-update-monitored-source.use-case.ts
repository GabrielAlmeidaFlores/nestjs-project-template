import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RegulatoryUpdateMonitoredSourceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/command/regulatory-update-monitored-source.command.repository.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { RegulatoryUpdateMonitoredSourceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity';
import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';
import { UpdateRegulatoryUpdateMonitoredSourceRequestDto } from '@module/customer/regulatory-update/dto/request/update-regulatory-update-monitored-source.request.dto';
import { RegulatoryUpdateMonitoredSourceResponseDto } from '@module/customer/regulatory-update/dto/response/regulatory-update-monitored-source.response.dto';
import { RegulatoryUpdateMonitoredSourceNotFoundError } from '@module/customer/regulatory-update/error/regulatory-update-monitored-source-not-found.error';

@Injectable()
export class UpdateRegulatoryUpdateMonitoredSourceUseCase {
  protected readonly _type = UpdateRegulatoryUpdateMonitoredSourceUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateMonitoredSourceQueryRepositoryGateway)
    private readonly monitoredSourceQueryRepository: RegulatoryUpdateMonitoredSourceQueryRepositoryGateway,
    @Inject(RegulatoryUpdateMonitoredSourceCommandRepositoryGateway)
    private readonly monitoredSourceCommandRepository: RegulatoryUpdateMonitoredSourceCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    id: RegulatoryUpdateMonitoredSourceId,
    dto: UpdateRegulatoryUpdateMonitoredSourceRequestDto,
  ): Promise<RegulatoryUpdateMonitoredSourceResponseDto> {
    const existing =
      await this.monitoredSourceQueryRepository.findOneMonitoredSourceById(id);

    if (!existing) {
      throw new RegulatoryUpdateMonitoredSourceNotFoundError();
    }

    const entity = new RegulatoryUpdateMonitoredSourceEntity({
      id,
      name: dto.name ?? existing.name,
      url: dto.url ?? existing.url,
      active: dto.active ?? existing.active,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.monitoredSourceCommandRepository.updateMonitoredSource(id, entity),
    );

    await transaction.commit();

    return RegulatoryUpdateMonitoredSourceResponseDto.build({
      regulatoryUpdateMonitoredSourceId: id,
      name: entity.name,
      url: entity.url,
      active: entity.active,
    });
  }
}
