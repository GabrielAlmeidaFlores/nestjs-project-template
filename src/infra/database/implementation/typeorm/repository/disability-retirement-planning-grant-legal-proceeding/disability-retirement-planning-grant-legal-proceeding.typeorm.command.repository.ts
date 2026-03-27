import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-legal-proceeding/command/disability-retirement-planning-grant-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/disability-retirement-planning-grant-legal-proceeding.entity';

@Injectable()
export class DisabilityRetirementPlanningGrantLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantLegalProceeding(
    props: DisabilityRetirementPlanningGrantLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantLegalProceedingEntity,
      DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningGrantId(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
        )
        .createQueryBuilder()
        .softDelete()
        .where(
          'disability_retirement_planning_grant_id = :disabilityRetirementPlanningGrantId',
          {
            disabilityRetirementPlanningGrantId:
              disabilityRetirementPlanningGrantId.toString(),
          },
        )
        .execute();
    };
  }
}
