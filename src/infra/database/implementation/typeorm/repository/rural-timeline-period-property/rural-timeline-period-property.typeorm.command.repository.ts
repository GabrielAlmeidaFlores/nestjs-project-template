import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelinePeriodPropertyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-property.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelinePeriodPropertyCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-period-property/command/rural-timeline-period-property.command.repository.gateway';
import { RuralTimelinePeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/rural-timeline-period-property.entity';
import { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';

@Injectable()
export class RuralTimelinePeriodPropertyTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelinePeriodPropertyTypeormEntity>
  implements RuralTimelinePeriodPropertyCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelinePeriodPropertyTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelinePeriodPropertyTypeormEntity)
    repository: Repository<RuralTimelinePeriodPropertyTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelinePeriodProperty(
    props: RuralTimelinePeriodPropertyEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelinePeriodPropertyEntity,
      RuralTimelinePeriodPropertyTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelinePeriodProperty(
    id: RuralTimelinePeriodPropertyId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
