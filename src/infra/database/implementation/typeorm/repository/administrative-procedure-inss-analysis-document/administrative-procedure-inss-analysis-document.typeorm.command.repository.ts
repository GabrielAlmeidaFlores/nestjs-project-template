import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis-document/command/administrative-procedure-inss-analysis-document.command.repository.gateway';
import { AdministrativeProcedureInssAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisDocumentId } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/schema/entity/administrative-procedure-inss-analysis-document/value-object/administrative-procedure-inss-analysis-document-id/administrative-procedure-inss-analysis-document-id.value-object';

@Injectable()
export class AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AdministrativeProcedureInssAnalysisDocumentTypeormEntity>
  implements AdministrativeProcedureInssAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AdministrativeProcedureInssAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AdministrativeProcedureInssAnalysisDocumentTypeormEntity)
    repository: Repository<AdministrativeProcedureInssAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAdministrativeProcedureInssAnalysisDocument(
    props: AdministrativeProcedureInssAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AdministrativeProcedureInssAnalysisDocumentEntity,
      AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAdministrativeProcedureInssAnalysisDocument(
    id: AdministrativeProcedureInssAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
