import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InsuranceQualityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InsuranceQualityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis/command/insurance-quality-analysis.command.repository.gateway';
import { InsuranceQualityAnalysisEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/insurance-quality-analysis.entity';
import { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<InsuranceQualityAnalysisTypeormEntity>
  implements InsuranceQualityAnalysisCommandRepositoryGateway {
  protected readonly _type =
    InsuranceQualityAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InsuranceQualityAnalysisTypeormEntity)
    repository: Repository<InsuranceQualityAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateInsuranceQualityAnalysis(
    id: InsuranceQualityAnalysisId,
    props: InsuranceQualityAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InsuranceQualityAnalysisEntity,
      InsuranceQualityAnalysisTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createInsuranceQualityAnalysis(
    props: InsuranceQualityAnalysisEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      InsuranceQualityAnalysisEntity,
      InsuranceQualityAnalysisTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteInsuranceQualityAnalysis(
    id: InsuranceQualityAnalysisId,
  ): TransactionType {
    return this.delete(id.toString())
  }
}
