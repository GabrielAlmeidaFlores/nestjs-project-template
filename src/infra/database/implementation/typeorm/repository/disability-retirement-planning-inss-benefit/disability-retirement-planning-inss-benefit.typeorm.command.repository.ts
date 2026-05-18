import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-inss-benefit/command/disability-retirement-planning-inss-benefit.command.repository.gateway';
import { DisabilityRetirementPlanningInssBenefitEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/disability-retirement-planning-inss-benefit.entity';
import { DisabilityRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-inss-benefit/value-object/disability-retirement-planning-inss-benefit-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningInssBenefitTypeormEntity>
  implements DisabilityRetirementPlanningInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningInssBenefitTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningInssBenefit(
    props: DisabilityRetirementPlanningInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningInssBenefitEntity,
      DisabilityRetirementPlanningInssBenefitTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningInssBenefit(
    id: DisabilityRetirementPlanningInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
