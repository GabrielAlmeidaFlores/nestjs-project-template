import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelineCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline/command/rural-timeline.command.repository.gateway';
import { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

@Injectable()
export class RuralTimelineTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelineTypeormEntity>
  implements RuralTimelineCommandRepositoryGateway
{
  protected readonly _type = RuralTimelineTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelineTypeormEntity)
    repository: Repository<RuralTimelineTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimeline(props: RuralTimelineEntity): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelineEntity,
      RuralTimelineTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimeline(id: RuralTimelineId): TransactionType {
    return this.delete(id.toString());
  }
}
