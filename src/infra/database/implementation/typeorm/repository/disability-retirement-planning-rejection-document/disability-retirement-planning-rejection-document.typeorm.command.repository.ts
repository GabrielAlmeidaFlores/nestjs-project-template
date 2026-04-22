import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-document/command/disability-retirement-planning-rejection-document.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/disability-retirement-planning-rejection-document.entity';

@Injectable()
export class DisabilityRetirementPlanningRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionDocumentTypeormEntity>
  implements
    DisabilityRetirementPlanningRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningRejectionDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionDocument(
    props: DisabilityRetirementPlanningRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionDocumentEntity,
      DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningRejectionId(
    disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
        )
        .softDelete({
          disabilityRetirementPlanningRejection: {
            id: disabilityRetirementPlanningRejectionId.toString(),
          },
        });
    };
  }
}
