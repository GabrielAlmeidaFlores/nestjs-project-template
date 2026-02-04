import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-legal-proceeding/command/per-capita-income-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding/value-object/per-capita-income-for-bpc-analysis-legal-proceeding-id/per-capita-income-for-bpc-analysis-legal-proceeding-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity>
  implements
    PerCapitaIncomeForBpcAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deletePerCapitaIncomeForBpcAnalysisLegalProceeding(
    id: PerCapitaIncomeForBpcAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createPerCapitaIncomeForBpcAnalysisLegalProceeding(
    props: PerCapitaIncomeForBpcAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisLegalProceedingEntity,
      PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
