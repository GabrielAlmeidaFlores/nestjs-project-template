import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/command/disability-retirement-planning.command.repository.gateway';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningTypeormEntity>
  implements DisabilityRetirementPlanningCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanning(
    props: DisabilityRetirementPlanningEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningEntity,
      DisabilityRetirementPlanningTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanning(
    id: DisabilityRetirementPlanningId,
    props: DisabilityRetirementPlanningEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningEntity,
      DisabilityRetirementPlanningTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateDisabilityRetirementPlanningResultId(
    planningId: DisabilityRetirementPlanningId,
    resultId: DisabilityRetirementPlanningResultId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager.query(
        'UPDATE disability_retirement_planning SET disability_retirement_planning_result_id = ? WHERE id = ?',
        [resultId.toString(), planningId.toString()],
      );
    };
  }

  public deleteDisabilityRetirementPlanning(
    id: DisabilityRetirementPlanningId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
