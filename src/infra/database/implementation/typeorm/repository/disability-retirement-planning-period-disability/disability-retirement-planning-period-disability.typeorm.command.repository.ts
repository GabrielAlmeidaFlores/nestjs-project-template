import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability/command/disability-retirement-planning-period-disability.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import { DisabilityRetirementPlanningPeriodDisabilityId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/value-object/disability-retirement-planning-period-disability-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodDisabilityTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningPeriodDisabilityTypeormEntity>
  implements
    DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningPeriodDisabilityTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningPeriodDisabilityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningPeriodDisability(
    props: DisabilityRetirementPlanningPeriodDisabilityEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningPeriodDisabilityEntity,
      DisabilityRetirementPlanningPeriodDisabilityTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningPeriodDisability(
    id: DisabilityRetirementPlanningPeriodDisabilityId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
