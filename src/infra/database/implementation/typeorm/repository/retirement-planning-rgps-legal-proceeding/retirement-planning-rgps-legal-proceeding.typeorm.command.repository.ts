import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-legal-proceeding/command/retirement-planning-rgps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRgpsLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity';
import { RetirementPlanningRgpsLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-legal-proceeding/value-object/retirement-planning-rgps-legal-proceeding-id.value-object';

@Injectable()
export class RetirementPlanningRgpsLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsLegalProceedingTypeormEntity>
  implements RetirementPlanningRgpsLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsLegalProceedingTypeormEntity)
    repository: Repository<RetirementPlanningRgpsLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteRetirementPlanningRgpsLegalProceeding(
    id: RetirementPlanningRgpsLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createRetirementPlanningRgpsLegalProceeding(
    props: RetirementPlanningRgpsLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsLegalProceedingEntity,
      RetirementPlanningRgpsLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
