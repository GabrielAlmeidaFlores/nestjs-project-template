import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-disability/command/retirement-planning-rpps-period-disability.command.repository.gateway';
import { RetirementPlanningRppsPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/retirement-planning-rpps-period-disability.entity';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsPeriodDisabilityTypeormEntity>
  implements RetirementPlanningRppsPeriodDisabilityCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsPeriodDisabilityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsPeriodDisabilityTypeormEntity)
    repository: Repository<RetirementPlanningRppsPeriodDisabilityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsPeriodDisability(
    id: RetirementPlanningRppsPeriodDisabilityId,
    props: RetirementPlanningRppsPeriodDisabilityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodDisabilityEntity,
      RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsPeriodDisability(
    props: RetirementPlanningRppsPeriodDisabilityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodDisabilityEntity,
      RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRetirementPlanningRppsPeriodDisability(
    id: RetirementPlanningRppsPeriodDisabilityId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
