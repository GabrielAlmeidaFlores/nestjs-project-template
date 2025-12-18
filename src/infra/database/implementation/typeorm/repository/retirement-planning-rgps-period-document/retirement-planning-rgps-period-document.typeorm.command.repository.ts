import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPlanningRgpsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';

@Injectable()
export class RetirementPlanningRgpsPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPlanningRgpsPeriodDocumentTypeormEntity>
  implements RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPlanningRgpsPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RetirementPlanningRgpsPeriodDocumentTypeormEntity)
    repository: Repository<RetirementPlanningRgpsPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateRetirementPlanningRgpsPeriodDocument(
    id: RetirementPlanningRgpsPeriodDocumentId,
    props: RetirementPlanningRgpsPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsPeriodDocumentEntity,
      RetirementPlanningRgpsPeriodDocumentTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createRetirementPlanningRgpsPeriodDocument(
    props: RetirementPlanningRgpsPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPlanningRgpsPeriodDocumentEntity,
      RetirementPlanningRgpsPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }
}
