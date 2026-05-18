import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/command/disability-retirement-planning-grant-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantPeriodTypeormEntity>
  implements DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantPeriodTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantPeriod(
    props: DisabilityRetirementPlanningGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantPeriodEntity,
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningGrantPeriod(
    id: DisabilityRetirementPlanningGrantPeriodId,
    props: DisabilityRetirementPlanningGrantPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantPeriodEntity,
      DisabilityRetirementPlanningGrantPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
