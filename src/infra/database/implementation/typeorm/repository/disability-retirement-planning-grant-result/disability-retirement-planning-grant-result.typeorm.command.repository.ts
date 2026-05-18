import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-result/command/disability-retirement-planning-grant-result.command.repository.gateway';
import { DisabilityRetirementPlanningGrantResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/disability-retirement-planning-grant-result.entity';
import { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningGrantResultTypeormEntity>
  implements DisabilityRetirementPlanningGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningGrantResultTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningGrantResult(
    props: DisabilityRetirementPlanningGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantResultEntity,
      DisabilityRetirementPlanningGrantResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningGrantResult(
    id: DisabilityRetirementPlanningGrantResultId,
    props: DisabilityRetirementPlanningGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningGrantResultEntity,
      DisabilityRetirementPlanningGrantResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
