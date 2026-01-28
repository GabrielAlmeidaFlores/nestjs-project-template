import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelinePeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-period/command/rural-timeline-period.command.repository.gateway';
import { RuralTimelinePeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity';
import { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';

@Injectable()
export class RuralTimelinePeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelinePeriodTypeormEntity>
  implements RuralTimelinePeriodCommandRepositoryGateway
{
  protected readonly _type = RuralTimelinePeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelinePeriodTypeormEntity)
    repository: Repository<RuralTimelinePeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelinePeriod(
    props: RuralTimelinePeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelinePeriodEntity,
      RuralTimelinePeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelinePeriod(id: RuralTimelinePeriodId): TransactionType {
    return this.delete(id.toString());
  }
}
