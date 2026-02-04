import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-document/command/per-capita-income-for-bpc-analysis-document.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-document/per-capita-income-for-bpc-analysis-document.entity';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type = PerCapitaIncomeForBpcAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPerCapitaIncomeForBpcAnalysisDocument(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisDocumentEntity,
      PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyPerCapitaIncomeForBpcAnalysisDocument(
    props: PerCapitaIncomeForBpcAnalysisDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) => this.createPerCapitaIncomeForBpcAnalysisDocument(item));
  }
}
