import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RegulatoryUpdateMonitoredSourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/regulatory-update-monitored-source.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RegulatoryUpdateMonitoredSourceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/regulatory-update-monitored-source.query.repository.gateway';
import { GetRegulatoryUpdateMonitoredSourceQueryResult } from '@module/customer/regulatory-update/domain/repository/regulatory-update-monitored-source/query/result/get-regulatory-update-monitored-source.query.result';
import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';

@Injectable()
export class RegulatoryUpdateMonitoredSourceTypeormQueryRepository
  extends BaseTypeormQueryRepository<RegulatoryUpdateMonitoredSourceTypeormEntity>
  implements RegulatoryUpdateMonitoredSourceQueryRepositoryGateway
{
  protected readonly _type =
    RegulatoryUpdateMonitoredSourceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RegulatoryUpdateMonitoredSourceTypeormEntity)
    repository: Repository<RegulatoryUpdateMonitoredSourceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneMonitoredSourceById(
    id: RegulatoryUpdateMonitoredSourceId,
  ): Promise<GetRegulatoryUpdateMonitoredSourceQueryResult | null> {
    const data = await this.findOne({ where: { id: id.toString() } });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
      GetRegulatoryUpdateMonitoredSourceQueryResult,
    );
  }

  public async listAllMonitoredSources(): Promise<
    GetRegulatoryUpdateMonitoredSourceQueryResult[]
  > {
    const data = await this.repository.find({
      order: { name: 'ASC' },
    });

    return this.mapperGateway.mapArray(
      data,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
      GetRegulatoryUpdateMonitoredSourceQueryResult,
    );
  }

  public async listActiveMonitoredSources(): Promise<
    GetRegulatoryUpdateMonitoredSourceQueryResult[]
  > {
    const data = await this.repository.find({
      where: { active: true },
      order: { name: 'ASC' },
    });

    return this.mapperGateway.mapArray(
      data,
      RegulatoryUpdateMonitoredSourceTypeormEntity,
      GetRegulatoryUpdateMonitoredSourceQueryResult,
    );
  }
}
