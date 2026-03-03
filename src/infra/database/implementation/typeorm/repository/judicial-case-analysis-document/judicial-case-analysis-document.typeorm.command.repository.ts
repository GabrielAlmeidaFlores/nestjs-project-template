import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { JudicialCaseAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis-document/command/judicial-case-analysis-document.command.repository.gateway';
import { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';

@Injectable()
export class JudicialCaseAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<JudicialCaseAnalysisDocumentTypeormEntity>
  implements JudicialCaseAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    JudicialCaseAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(JudicialCaseAnalysisDocumentTypeormEntity)
    repository: Repository<JudicialCaseAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createJudicialCaseAnalysisDocument(
    props: JudicialCaseAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      JudicialCaseAnalysisDocumentEntity,
      JudicialCaseAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteJudicialCaseAnalysisDocument(
    id: JudicialCaseAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
