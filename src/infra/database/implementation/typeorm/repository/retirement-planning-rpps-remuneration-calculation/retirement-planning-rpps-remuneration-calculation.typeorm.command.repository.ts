import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationCalculationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration-calculation.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration-calculation/command/retirement-planning-rpps-remuneration-calculation.command.repository.gateway';
import { RetirementPlanningRppsRemunerationCalculationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity';
import { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

@Injectable()
export class RetirementPlanningRppsRemunerationCalculationTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsRemunerationCalculationTypeormEntity>
  implements
    RetirementPlanningRppsRemunerationCalculationCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsRemunerationCalculationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    )
    repository: Repository<RetirementPlanningRppsRemunerationCalculationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsRemunerationCalculation(
    id: RetirementPlanningRppsRemunerationCalculationId,
    props: RetirementPlanningRppsRemunerationCalculationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsRemunerationCalculationEntity,
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsRemunerationCalculation(
    props: RetirementPlanningRppsRemunerationCalculationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsRemunerationCalculationEntity,
      RetirementPlanningRppsRemunerationCalculationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRetirementPlanningRppsRemunerationCalculation(
    id: RetirementPlanningRppsRemunerationCalculationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
