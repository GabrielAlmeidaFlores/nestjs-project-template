import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RegulatoryUpdateMonitoredSourceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/command/regulatory-update-monitored-source.command.repository.gateway';
import { RegulatoryUpdateMonitoredSourceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity';
import { CreateRegulatoryUpdateMonitoredSourceRequestDto } from '@module/customer/regulatory-update/dto/request/create-regulatory-update-monitored-source.request.dto';
import { RegulatoryUpdateMonitoredSourceResponseDto } from '@module/customer/regulatory-update/dto/response/regulatory-update-monitored-source.response.dto';

@Injectable()
export class CreateRegulatoryUpdateMonitoredSourceUseCase {
  protected readonly _type = CreateRegulatoryUpdateMonitoredSourceUseCase.name;

  public constructor(
    @Inject(RegulatoryUpdateMonitoredSourceCommandRepositoryGateway)
    private readonly monitoredSourceCommandRepository: RegulatoryUpdateMonitoredSourceCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateRegulatoryUpdateMonitoredSourceRequestDto,
  ): Promise<RegulatoryUpdateMonitoredSourceResponseDto> {
    const entity = new RegulatoryUpdateMonitoredSourceEntity({
      name: dto.name,
      url: dto.url,
      active: dto.active ?? true,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.monitoredSourceCommandRepository.createMonitoredSource(entity),
    );

    await transaction.commit();

    return RegulatoryUpdateMonitoredSourceResponseDto.build({
      regulatoryUpdateMonitoredSourceId: entity.id,
      name: entity.name,
      url: entity.url,
      active: entity.active,
    });
  }
}
