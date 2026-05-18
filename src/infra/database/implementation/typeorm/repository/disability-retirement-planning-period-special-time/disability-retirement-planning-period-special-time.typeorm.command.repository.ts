import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time/command/disability-retirement-planning-period-special-time.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/value-object/disability-retirement-planning-period-special-time-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodSpecialTimeTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity>
  implements
    DisabilityRetirementPlanningPeriodSpecialTimeCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningPeriodSpecialTime(
    props: DisabilityRetirementPlanningPeriodSpecialTimeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningPeriodSpecialTimeEntity,
      DisabilityRetirementPlanningPeriodSpecialTimeTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningPeriodSpecialTime(
    id: DisabilityRetirementPlanningPeriodSpecialTimeId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
