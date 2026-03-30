import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period-document/command/disability-retirement-planning-grant-disability-period-document.command.repository.gateway';
import { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/disability-retirement-planning-grant-disability-period-document.entity';

@Injectable()
export class DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantDisabilityPeriodDocument(
    props: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntity,
      DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByDisabilityRetirementPlanningGrantDisabilityPeriodId(
    disabilityRetirementPlanningGrantDisabilityPeriodId: DisabilityRetirementPlanningGrantDisabilityPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeormEntity,
        )
        .createQueryBuilder()
        .softDelete()
        .where(
          'disability_retirement_planning_grant_disability_period_id = :disabilityRetirementPlanningGrantDisabilityPeriodId',
          {
            disabilityRetirementPlanningGrantDisabilityPeriodId:
              disabilityRetirementPlanningGrantDisabilityPeriodId.toString(),
          },
        )
        .execute();
    };
  }
}
