import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-period-special-time-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-period-special-time-document/command/disability-retirement-planning-period-special-time-document.command.repository.gateway';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/disability-retirement-planning-period-special-time-document.entity';
import { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity>
  implements
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
    )
    repository: Repository<DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningPeriodSpecialTimeDocument(
    props: DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntity,
      DisabilityRetirementPlanningPeriodSpecialTimeDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningPeriodSpecialTimeDocument(
    id: DisabilityRetirementPlanningPeriodSpecialTimeDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
