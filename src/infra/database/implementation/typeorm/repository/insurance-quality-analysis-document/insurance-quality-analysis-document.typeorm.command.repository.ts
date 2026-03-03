import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InsuranceQualityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InsuranceQualityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-document/command/insurance-quality-analysis-document.command.repository.gateway';
import { InsuranceQualityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/insurance-quality-analysis-document.entity';
import { InsuranceQualityAnalysisDocumentId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-document/value-object/insurance-quality-analysis-document-id/insurance-quality-analysis-document-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<InsuranceQualityAnalysisDocumentTypeormEntity>
  implements InsuranceQualityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    InsuranceQualityAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InsuranceQualityAnalysisDocumentTypeormEntity)
    repository: Repository<InsuranceQualityAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createInsuranceQualityAnalysisDocument(
    props: InsuranceQualityAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InsuranceQualityAnalysisDocumentEntity,
      InsuranceQualityAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteInsuranceQualityAnalysisDocument(
    id: InsuranceQualityAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
