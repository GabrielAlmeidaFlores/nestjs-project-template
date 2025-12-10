import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period/command/retirement-planning-rpps-period.command.repository.gateway';
import { RetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/retirement-plannig-rpps-period.entity';
import { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsPeriodTypeormEntity>
  implements RetirementPlanningRppsPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsPeriodTypeormEntity)
    repository: Repository<RetirementPlanningRppsPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsPeriod(
    id: RetirementPlanningRppsPeriodId,
    props: RetirementPlanningRppsPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodEntity,
      RetirementPlanningRppsPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsPeriod(
    props: RetirementPlanningRppsPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodEntity,
      RetirementPlanningRppsPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
