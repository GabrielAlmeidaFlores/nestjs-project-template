import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelinePeriodEconomicAspectsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-economic-aspects.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelinePeriodEconomicAspectsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-period-economic-aspects/command/rural-timeline-period-economic-aspects.command.repository.gateway';
import { RuralTimelinePeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/rural-timeline-period-economic-aspects.entity';
import { RuralTimelinePeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/value-object/rural-timeline-period-economic-aspects-id/rural-timeline-period-economic-aspects-id.value-object';

@Injectable()
export class RuralTimelinePeriodEconomicAspectsTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelinePeriodEconomicAspectsTypeormEntity>
  implements RuralTimelinePeriodEconomicAspectsCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelinePeriodEconomicAspectsTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelinePeriodEconomicAspectsTypeormEntity)
    repository: Repository<RuralTimelinePeriodEconomicAspectsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelinePeriodEconomicAspects(
    props: RuralTimelinePeriodEconomicAspectsEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelinePeriodEconomicAspectsEntity,
      RuralTimelinePeriodEconomicAspectsTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelinePeriodEconomicAspects(
    id: RuralTimelinePeriodEconomicAspectsId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
