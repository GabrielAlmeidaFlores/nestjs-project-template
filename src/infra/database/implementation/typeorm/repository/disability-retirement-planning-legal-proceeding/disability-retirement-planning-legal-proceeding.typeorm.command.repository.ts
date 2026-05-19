import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-legal-proceeding/command/disability-retirement-planning-legal-proceeding.command.repository.gateway';
import { DisabilityRetirementPlanningLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/disability-retirement-planning-legal-proceeding.entity';
import { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningLegalProceedingTypeormEntity>
  implements DisabilityRetirementPlanningLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningLegalProceedingTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningLegalProceeding(
    props: DisabilityRetirementPlanningLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningLegalProceedingEntity,
      DisabilityRetirementPlanningLegalProceedingTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningLegalProceeding(
    id: DisabilityRetirementPlanningLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
