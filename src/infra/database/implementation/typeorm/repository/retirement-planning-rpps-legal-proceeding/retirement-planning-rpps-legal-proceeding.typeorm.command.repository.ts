import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-legal-proceeding/command/retirement-planning-rpps-legal-proceeding.command.repository.gateway';
import { RetirementPlanningRppsLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/retirement-planning-rpps-legal-proceeding.entity';
import { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';

@Injectable()
export class RetirementPlanningRppsLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsLegalProceedingTypeormEntity>
  implements RetirementPlanningRppsLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsLegalProceedingTypeormEntity)
    repository: Repository<RetirementPlanningRppsLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteRetirementPlanningRppsLegalProceeding(
    id: RetirementPlanningRppsLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createRetirementPlanningRppsLegalProceeding(
    props: RetirementPlanningRppsLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsLegalProceedingEntity,
      RetirementPlanningRppsLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
