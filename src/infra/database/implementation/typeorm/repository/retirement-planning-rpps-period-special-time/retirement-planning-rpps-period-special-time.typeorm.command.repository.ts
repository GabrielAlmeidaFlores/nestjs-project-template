import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-special-time.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-special-time/command/retirement-planning-rpps-period-special-time.command.repository.gateway';
import { RetirementPlanningRppsPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-special-time/retirement-planning-rpps-period-special-time.entity';
import { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsPeriodSpecialTimeTypeormEntity>
  implements RetirementPlanningRppsPeriodSpecialTimeCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsPeriodSpecialTimeTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsPeriodSpecialTimeTypeormEntity)
    repository: Repository<RetirementPlanningRppsPeriodSpecialTimeTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsPeriodSpecialTime(
    id: RetirementPlanningRppsPeriodSpecialTimeId,
    props: RetirementPlanningRppsPeriodSpecialTimeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodSpecialTimeEntity,
      RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsPeriodSpecialTime(
    props: RetirementPlanningRppsPeriodSpecialTimeEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodSpecialTimeEntity,
      RetirementPlanningRppsPeriodSpecialTimeTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRetirementPlanningRppsPeriodSpecialTime(
    id: RetirementPlanningRppsPeriodSpecialTimeId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
