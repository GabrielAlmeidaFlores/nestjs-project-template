import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-legal-proceeding/command/disability-assessment-for-bpc-analysis-legal-proceeding.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/value-object/disability-assessment-for-bpc-analysis-legal-proceeding-id/disability-assessment-for-bpc-analysis-legal-proceeding-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity>
  implements
    DisabilityAssessmentForBpcAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
    )
    repository: Repository<DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteDisabilityAssessmentForBpcAnalysisLegalProceeding(
    id: DisabilityAssessmentForBpcAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createDisabilityAssessmentForBpcAnalysisLegalProceeding(
    props: DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisLegalProceedingEntity,
      DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }
}
