import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityRetirementPlanningDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-document/command/disability-retirement-planning-document.command.repository.gateway';
import { DisabilityRetirementPlanningDocumentEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/disability-retirement-planning-document.entity';
import { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityRetirementPlanningDocumentTypeormEntity>
  implements DisabilityRetirementPlanningDocumentCommandRepositoryGateway
{
  protected readonly _type = DisabilityRetirementPlanningDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityRetirementPlanningDocumentTypeormEntity)
    repository: Repository<DisabilityRetirementPlanningDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityRetirementPlanningDocument(
    props: DisabilityRetirementPlanningDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityRetirementPlanningDocumentEntity,
      DisabilityRetirementPlanningDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteDisabilityRetirementPlanningDocument(
    id: DisabilityRetirementPlanningDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
