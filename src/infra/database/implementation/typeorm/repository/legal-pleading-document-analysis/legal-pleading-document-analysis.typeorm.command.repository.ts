import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { LegalPleadingDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document-analysis/command/legal-pleading-document-analysis.repository.gateway';
import { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';

@Injectable()
export class LegalPleadingDocumentAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<LegalPleadingDocumentAnalysisTypeormEntity>
  implements LegalPleadingDocumentAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    LegalPleadingDocumentAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(LegalPleadingDocumentAnalysisTypeormEntity)
    repository: Repository<LegalPleadingDocumentAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createLegalPleadingDocumentAnalysis(
    props: LegalPleadingDocumentAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      LegalPleadingDocumentAnalysisEntity,
      LegalPleadingDocumentAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }
}
