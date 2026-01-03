import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-special-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/command/retirement-planning-rgps-special-period.repository.gateway';
import { RetirementPlanningRgpsSpecialPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.entity';
import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';

@Injectable()
export class RetirementPlanningRgpsSpecialPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsSpecialPeriodTypeormEntity>
  implements RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsSpecialPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsSpecialPeriodTypeormEntity)
    repository: Repository<RetirementPlanningRgpsSpecialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRgpsSpecialPeriod(
    id: RetirementPlanningRgpsSpecialPeriodId,
    props: RetirementPlanningRgpsSpecialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsSpecialPeriodEntity,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRgpsSpecialPeriod(
    props: RetirementPlanningRgpsSpecialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsSpecialPeriodEntity,
      RetirementPlanningRgpsSpecialPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
