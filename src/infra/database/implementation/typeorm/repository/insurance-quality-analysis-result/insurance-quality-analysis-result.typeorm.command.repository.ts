import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InsuranceQualityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/command/insurance-quality-analysis-result.command.repository.gateway';
import { InsuranceQualityAnalysisResultEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/insurance-quality-analysis-result.entity';
import { InsuranceQualityAnalysisResultId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-result/value-object/insurance-quality-analysis-result-id/insurance-quality-analysis-result-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<InsuranceQualityAnalysisResultTypeormEntity>
  implements InsuranceQualityAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    InsuranceQualityAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InsuranceQualityAnalysisResultTypeormEntity)
    repository: Repository<InsuranceQualityAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createInsuranceQualityAnalysisResult(
    props: InsuranceQualityAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InsuranceQualityAnalysisResultEntity,
      InsuranceQualityAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateInsuranceQualityAnalysisResult(
    id: InsuranceQualityAnalysisResultId,
    props: InsuranceQualityAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InsuranceQualityAnalysisResultEntity,
      InsuranceQualityAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
