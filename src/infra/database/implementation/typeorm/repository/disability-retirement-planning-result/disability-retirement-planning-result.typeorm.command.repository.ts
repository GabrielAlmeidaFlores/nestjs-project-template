import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-result/command/disability-retirement-planning-result.command.repository.gateway';
import { DisabilityRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/disability-retirement-planning-result.entity';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningResultTypeormEntity>
  implements DisabilityRetirementPlanningResultCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningResultTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningResult(
    props: DisabilityRetirementPlanningResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningResultEntity,
      DisabilityRetirementPlanningResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningResult(
    id: DisabilityRetirementPlanningResultId,
    props: DisabilityRetirementPlanningResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningResultEntity,
      DisabilityRetirementPlanningResultTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
