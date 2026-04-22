import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period/command/disability-retirement-planning-rejection-period.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionPeriodTypeormEntity>
  implements DisabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRejectionPeriodTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRejectionPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionPeriod(
    props: DisabilityRetirementPlanningRejectionPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionPeriodEntity,
      DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningRejectionPeriod(
    id: DisabilityRetirementPlanningRejectionPeriodId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
