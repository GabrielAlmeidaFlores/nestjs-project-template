import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/command/retirement-planning-rpps-period-document.command.repository.gateway';
import { RetirementPlanningRppsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/retirement-planning-rpps-period-document.entity';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';

@Injectable()
export class RetirementPlanningRppsPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRppsPeriodDocumentTypeormEntity>
  implements RetirementPlanningRppsPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRppsPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRppsPeriodDocumentTypeormEntity)
    repository: Repository<RetirementPlanningRppsPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRppsPeriodDocument(
    id: RetirementPlanningRppsPeriodDocumentId,
    props: RetirementPlanningRppsPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodDocumentEntity,
      RetirementPlanningRppsPeriodDocumentTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRppsPeriodDocument(
    props: RetirementPlanningRppsPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRppsPeriodDocumentEntity,
      RetirementPlanningRppsPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteRetirementPlanningRppsPeriodDocument(
    id: RetirementPlanningRppsPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
