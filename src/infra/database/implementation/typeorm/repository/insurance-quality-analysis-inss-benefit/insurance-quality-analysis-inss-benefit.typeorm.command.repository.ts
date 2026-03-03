import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-inss-benefit/command/insurance-quality-analysis-inss-benefit.command.repository.gateway';
import { InsuranceQualityAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/insurance-quality-analysis-inss-benefit.entity';
import { InsuranceQualityAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis-inss-benefit/value-object/insurance-quality-analysis-inss-benefit-id/insurance-quality-analysis-inss-benefit-id.value-object';

@Injectable()
export class InsuranceQualityAnalysisInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<InsuranceQualityAnalysisInssBenefitTypeormEntity>
  implements InsuranceQualityAnalysisInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    InsuranceQualityAnalysisInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(InsuranceQualityAnalysisInssBenefitTypeormEntity)
    repository: Repository<InsuranceQualityAnalysisInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createInsuranceQualityAnalysisInssBenefit(
    entity: InsuranceQualityAnalysisInssBenefitEntity,
  ): TransactionType {
    const ormEntity = this.mapperGateway.map(
      entity,
      InsuranceQualityAnalysisInssBenefitEntity,
      InsuranceQualityAnalysisInssBenefitTypeormEntity,
    );
    return this.create(ormEntity);
  }

  public deleteInsuranceQualityAnalysisInssBenefit(
    id: InsuranceQualityAnalysisInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
