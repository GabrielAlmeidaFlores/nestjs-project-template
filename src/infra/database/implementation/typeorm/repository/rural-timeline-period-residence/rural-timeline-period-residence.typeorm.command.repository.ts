import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralTimelinePeriodResidenceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period-residence.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RuralTimelinePeriodResidenceCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline-period-residence/command/rural-timeline-period-residence.command.repository.gateway';
import { RuralTimelinePeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/rural-timeline-period-residence.entity';
import { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

@Injectable()
export class RuralTimelinePeriodResidenceTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralTimelinePeriodResidenceTypeormEntity>
  implements RuralTimelinePeriodResidenceCommandRepositoryGateway
{
  protected readonly _type =
    RuralTimelinePeriodResidenceTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralTimelinePeriodResidenceTypeormEntity)
    repository: Repository<RuralTimelinePeriodResidenceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRuralTimelinePeriodResidence(
    props: RuralTimelinePeriodResidenceEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RuralTimelinePeriodResidenceEntity,
      RuralTimelinePeriodResidenceTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRuralTimelinePeriodResidence(
    id: RuralTimelinePeriodResidenceId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
