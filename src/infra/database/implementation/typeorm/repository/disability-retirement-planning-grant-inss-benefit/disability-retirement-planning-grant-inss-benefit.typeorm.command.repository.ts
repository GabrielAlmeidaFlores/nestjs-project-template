import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-inss-benefit/command/disability-retirement-planning-grant-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-inss-benefit/disability-retirement-planning-grant-inss-benefit.entity';

@Injectable()
export class DisabilityRetirementPlanningGrantInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantInssBenefitTypeormEntity>
  implements
    DisabilityRetirementPlanningGrantInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantInssBenefitTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantInssBenefit(
    props: DisabilityRetirementPlanningGrantInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantInssBenefitEntity,
      DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
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
          DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
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
