import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

@Injectable()
export class RetirementPlanningRgpsPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsPeriodTypeormEntity>
  implements RetirementPlanningRgpsPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsPeriodTypeormEntity)
    repository: Repository<RetirementPlanningRgpsPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRgpsPeriod(
    id: RetirementPlanningRgpsPeriodId,
    props: RetirementPlanningRgpsPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsPeriodEntity,
      RetirementPlanningRgpsPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRgpsPeriod(
    props: RetirementPlanningRgpsPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsPeriodEntity,
      RetirementPlanningRgpsPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
