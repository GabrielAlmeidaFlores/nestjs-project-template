import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-result/command/disability-retirement-planning-rejection-result.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionResultEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/disability-retirement-planning-rejection-result.entity';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionResultTypeormEntity>
  implements DisabilityRetirementPlanningRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRejectionResultTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejectionResult(
    props: DisabilityRetirementPlanningRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionResultEntity,
      DisabilityRetirementPlanningRejectionResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningRejectionResult(
    id: DisabilityRetirementPlanningRejectionResultId,
    props: DisabilityRetirementPlanningRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionResultEntity,
      DisabilityRetirementPlanningRejectionResultTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }
}
