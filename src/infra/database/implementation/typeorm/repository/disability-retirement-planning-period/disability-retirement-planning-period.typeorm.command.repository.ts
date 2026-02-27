import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period/command/disability-retirement-planning-period.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import { DisabilityRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/value-object/disability-retirement-planning-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningPeriodTypeormEntity>
  implements DisabilityRetirementPlanningPeriodCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningPeriodTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningPeriod(
    props: DisabilityRetirementPlanningPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningPeriodEntity,
      DisabilityRetirementPlanningPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningPeriod(
    id: DisabilityRetirementPlanningPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
