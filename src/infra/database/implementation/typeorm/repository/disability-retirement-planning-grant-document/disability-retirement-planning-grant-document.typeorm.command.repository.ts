import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-document/command/disability-retirement-planning-grant-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/disability-retirement-planning-grant-document.entity';

@Injectable()
export class DisabilityRetirementPlanningGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantDocumentTypeormEntity>
  implements DisabilityRetirementPlanningGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantDocumentTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantDocument(
    props: DisabilityRetirementPlanningGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantDocumentEntity,
      DisabilityRetirementPlanningGrantDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningGrantId(
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(DisabilityRetirementPlanningGrantDocumentTypeormEntity)
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
