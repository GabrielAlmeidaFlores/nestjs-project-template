import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/command/disability-retirement-planning-remuneration.command.repository.gateway';
import { DisabilityRetirementPlanningRemunerationEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.entity';
import { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRemunerationTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRemunerationTypeormEntity>
  implements DisabilityRetirementPlanningRemunerationCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRemunerationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRemunerationTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRemuneration(
    props: DisabilityRetirementPlanningRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRemunerationEntity,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningRemuneration(
    id: DisabilityRetirementPlanningRemunerationId,
    props: DisabilityRetirementPlanningRemunerationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRemunerationEntity,
      DisabilityRetirementPlanningRemunerationTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public deleteDisabilityRetirementPlanningRemuneration(
    id: DisabilityRetirementPlanningRemunerationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
