import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis-benefit/command/per-capita-income-for-bpc-analysis-benefit.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-benefit/value-object/per-capita-income-for-bpc-analysis-benefit-id/per-capita-income-for-bpc-analysis-benefit-id.value-object';

@Injectable()
export class PerCapitaIncomeForBpcAnalysisBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity>
  implements PerCapitaIncomeForBpcAnalysisBenefitCommandRepositoryGateway
{
  protected readonly _type =
    PerCapitaIncomeForBpcAnalysisBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity)
    repository: Repository<PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deletePerCapitaIncomeForBpcAnalysisBenefit(
    id: PerCapitaIncomeForBpcAnalysisBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createPerCapitaIncomeForBpcAnalysisBenefit(
    props: PerCapitaIncomeForBpcAnalysisBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PerCapitaIncomeForBpcAnalysisBenefitEntity,
      PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
