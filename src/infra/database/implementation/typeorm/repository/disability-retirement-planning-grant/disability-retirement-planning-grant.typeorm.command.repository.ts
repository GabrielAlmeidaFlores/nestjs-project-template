import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/command/disability-retirement-planning-grant.command.repository.gateway';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantTypeormEntity>
  implements DisabilityRetirementPlanningGrantCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrant(
    props: DisabilityRetirementPlanningGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantEntity,
      DisabilityRetirementPlanningGrantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningGrant(
    id: DisabilityRetirementPlanningGrantId,
    props: DisabilityRetirementPlanningGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantEntity,
      DisabilityRetirementPlanningGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateDisabilityRetirementPlanningGrantResultId(
    id: DisabilityRetirementPlanningGrantId,
    resultId: DisabilityRetirementPlanningGrantResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      disabilityRetirementPlanningGrantResult:
        DisabilityRetirementPlanningGrantResultTypeormEntity.build({
          id: resultId.toString(),
        } as DisabilityRetirementPlanningGrantResultTypeormEntity),
    });
  }
}
