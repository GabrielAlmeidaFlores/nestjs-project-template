import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-inss-benefit/command/disability-retirement-planning-rejection-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-inss-benefit/disability-retirement-planning-rejection-inss-benefit.entity';

@Injectable()
export class DisabilityRetirementPlanningRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity>
  implements
    DisabilityRetirementPlanningRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionInssBenefit(
    props: DisabilityRetirementPlanningRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionInssBenefitEntity,
      DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
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
          DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
        )
        .softDelete({
          disabilityRetirementPlanningRejection: {
            id: disabilityRetirementPlanningRejectionId.toString(),
          },
        });
    };
  }
}
