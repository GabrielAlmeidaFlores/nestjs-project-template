import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-disability-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-disability-document/command/disability-retirement-planning-period-disability-document.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/disability-retirement-planning-period-disability-document.entity';
import { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity>
  implements
    DisabilityRetirementPlanningPeriodDisabilityDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningPeriodDisabilityDocument(
    props: DisabilityRetirementPlanningPeriodDisabilityDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningPeriodDisabilityDocumentEntity,
      DisabilityRetirementPlanningPeriodDisabilityDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningPeriodDisabilityDocument(
    id: DisabilityRetirementPlanningPeriodDisabilityDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
