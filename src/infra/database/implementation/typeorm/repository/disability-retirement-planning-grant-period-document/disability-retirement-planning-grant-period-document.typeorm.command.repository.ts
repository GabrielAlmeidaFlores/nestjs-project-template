import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period-document/command/disability-retirement-planning-grant-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import { DisabilityRetirementPlanningGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/disability-retirement-planning-grant-period-document.entity';

@Injectable()
export class DisabilityRetirementPlanningGrantPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantPeriodDocument(
    props: DisabilityRetirementPlanningGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantPeriodDocumentEntity,
      DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningGrantPeriodId(
    disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
        )
        .createQueryBuilder()
        .softDelete()
        .where(
          'disability_retirement_planning_grant_period_id = :disabilityRetirementPlanningGrantPeriodId',
          {
            disabilityRetirementPlanningGrantPeriodId:
              disabilityRetirementPlanningGrantPeriodId.toString(),
          },
        )
        .execute();
    };
  }
}
