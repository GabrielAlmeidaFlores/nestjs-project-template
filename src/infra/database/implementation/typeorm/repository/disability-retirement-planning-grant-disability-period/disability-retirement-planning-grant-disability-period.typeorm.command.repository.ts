import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/command/disability-retirement-planning-grant-disability-period.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantDisabilityPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantDisabilityPeriod(
    props: DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningGrantDisabilityPeriod(
    id: DisabilityRetirementPlanningGrantDisabilityPeriodId,
    props: DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
