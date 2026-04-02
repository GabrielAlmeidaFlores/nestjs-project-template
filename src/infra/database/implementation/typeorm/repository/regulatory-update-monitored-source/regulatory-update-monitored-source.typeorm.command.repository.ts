import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RegulatoryUpdateMonitoredSourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-monitored-source.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RegulatoryUpdateMonitoredSourceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/command/regulatory-update-monitored-source.command.repository.gateway';
import { RegulatoryUpdateMonitoredSourceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/regulatory-update-monitored-source.entity';
import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

@Injectable()
export class RegulatoryUpdateMonitoredSourceTypeormCommandRepository
  extends BaseTypeormCommandRepository<RegulatoryUpdateMonitoredSourceTypeormEntity>
  implements RegulatoryUpdateMonitoredSourceCommandRepositoryGateway
{
  protected readonly _type =
    RegulatoryUpdateMonitoredSourceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RegulatoryUpdateMonitoredSourceTypeormEntity)
    repository: Repository<RegulatoryUpdateMonitoredSourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMonitoredSource(
    props: RegulatoryUpdateMonitoredSourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RegulatoryUpdateMonitoredSourceEntity,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMonitoredSource(
    id: RegulatoryUpdateMonitoredSourceId,
    props: RegulatoryUpdateMonitoredSourceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RegulatoryUpdateMonitoredSourceEntity,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteMonitoredSource(
    id: RegulatoryUpdateMonitoredSourceId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
