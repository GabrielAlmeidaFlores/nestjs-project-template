import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-result/command/per-capita-income-for-bpc-analysis-result.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { PerCapitaIncomeForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/per-capita-income-for-bpc-analysis-result.entity';
import { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisResultTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisResultTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updatePerCapitaIncomeForBpcAnalysisResult(
    id: PerCapitaIncomeForBpcAnalysisResultId,
    props: PerCapitaIncomeForBpcAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisResultEntity,
      PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createPerCapitaIncomeForBpcAnalysisResult(
    props: PerCapitaIncomeForBpcAnalysisResultEntity,
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisResultEntity,
      PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
    );

    mappedData.perCapitaIncomeForBpcAnalysis = {
      id: perCapitaIncomeForBpcAnalysisId.toString(),
    } as PerCapitaIncomeForBpcAnalysisTypeormEntity;

    return this.create(mappedData);
  }
}
