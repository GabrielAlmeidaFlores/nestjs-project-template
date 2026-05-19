import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-period-document/command/disability-retirement-planning-rejection-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import { DisabilityRetirementPlanningRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/disability-retirement-planning-rejection-period-document.entity';

@Injectable()
export class DisabilityRetirementPlanningRejectionPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity>
  implements
    DisabilityRetirementPlanningRejectionPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionPeriodDocument(
    props: DisabilityRetirementPlanningRejectionPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionPeriodDocumentEntity,
      DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningRejectionPeriodId(
    disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          DisabilityRetirementPlanningRejectionPeriodDocumentTypeormEntity,
        )
        .softDelete({
          disabilityRetirementPlanningRejectionPeriod: {
            id: disabilityRetirementPlanningRejectionPeriodId.toString(),
          },
        });
    };
  }
}
