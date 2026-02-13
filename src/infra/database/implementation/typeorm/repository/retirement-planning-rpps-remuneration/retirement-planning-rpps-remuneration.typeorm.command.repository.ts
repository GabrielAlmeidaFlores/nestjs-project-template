import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';

@Injectable()
export class RetirementPlanningRppsRemunerationTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsRemunerationTypeormEntity>
  implements RetirementPlanningRppsRemunerationCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsRemunerationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsRemunerationTypeormEntity)
    repository: Repository<RetirementPlanningRppsRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsRemuneration(
    id: RetirementPlanningRppsRemunerationId,
    props: RetirementPlanningRppsRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsRemunerationEntity,
      RetirementPlanningRppsRemunerationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsRemuneration(
    props: RetirementPlanningRppsRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsRemunerationEntity,
      RetirementPlanningRppsRemunerationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRetirementPlanningRppsRemuneration(
    id: RetirementPlanningRppsRemunerationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
