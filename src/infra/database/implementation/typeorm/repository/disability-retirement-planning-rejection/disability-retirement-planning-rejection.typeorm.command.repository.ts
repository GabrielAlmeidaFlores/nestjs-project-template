import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection/command/disability-retirement-planning-rejection.command.repository.gateway';
import { DisabilityRetirementPlanningRejectionEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/disability-retirement-planning-rejection.entity';
import { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningRejectionTypeormEntity>
  implements DisabilityRetirementPlanningRejectionCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningRejectionTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningRejection(
    props: DisabilityRetirementPlanningRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionEntity,
      DisabilityRetirementPlanningRejectionTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateDisabilityRetirementPlanningRejection(
    id: DisabilityRetirementPlanningRejectionId,
    props: DisabilityRetirementPlanningRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningRejectionEntity,
      DisabilityRetirementPlanningRejectionTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public updateDisabilityRetirementPlanningRejectionResultId(
    id: DisabilityRetirementPlanningRejectionId,
    resultId: DisabilityRetirementPlanningRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      disabilityRetirementPlanningRejectionResult:
        DisabilityRetirementPlanningRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as DisabilityRetirementPlanningRejectionResultTypeormEntity),
    });
  }
}
