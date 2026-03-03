import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-legal-proceeding/command/insurance-quality-analysis-legal-proceeding.command.repository.gateway';
import { InsuranceQualityAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/insurance-quality-analysis-legal-proceeding.entity';
import { InsuranceQualityAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-legal-proceeding/value-object/insurance-quality-analysis-legal-proceeding-id/insurance-quality-analysis-legal-proceeding-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<InsuranceQualityAnalysisLegalProceedingTypeormEntity>
  implements InsuranceQualityAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    InsuranceQualityAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InsuranceQualityAnalysisLegalProceedingTypeormEntity)
    repository: Repository<InsuranceQualityAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createInsuranceQualityAnalysisLegalProceeding(
    entity: InsuranceQualityAnalysisLegalProceedingEntity,
  ): TransactionType {
    const ormEntity = this.mapperGateway.map(
      entity,
      InsuranceQualityAnalysisLegalProceedingEntity,
      InsuranceQualityAnalysisLegalProceedingTypeormEntity,
    );
    return this.create(ormEntity);
  }

  public deleteInsuranceQualityAnalysisLegalProceeding(
    id: InsuranceQualityAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
