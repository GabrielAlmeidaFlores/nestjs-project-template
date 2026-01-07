import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';

@Injectable()
export class AnalysisToolClientLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<AnalysisToolClientLegalProceedingTypeormEntity>
  implements AnalysisToolClientLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    AnalysisToolClientLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientLegalProceedingTypeormEntity)
    repository: Repository<AnalysisToolClientLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteAnalysisToolClientLegalProceeding(
    id: AnalysisToolClientLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createAnalysisToolClientLegalProceeding(
    props: AnalysisToolClientLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientLegalProceedingEntity,
      AnalysisToolClientLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateAnalysisToolClientLegalProceeding(
    id: AnalysisToolClientLegalProceedingId,
    props: AnalysisToolClientLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AnalysisToolClientLegalProceedingEntity,
      AnalysisToolClientLegalProceedingTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
