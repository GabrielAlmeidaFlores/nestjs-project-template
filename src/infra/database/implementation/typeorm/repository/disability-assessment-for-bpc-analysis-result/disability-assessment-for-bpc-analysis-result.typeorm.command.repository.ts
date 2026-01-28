import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/command/disability-assessment-for-bpc-analysis-result.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';
import { DisabilityAssessmentForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/value-object/disability-assessment-for-bpc-analysis-result-id/disability-assessment-for-bpc-analysis-result-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityAssessmentForBpcAnalysisResultTypeormEntity>
  implements DisabilityAssessmentForBpcAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityAssessmentForBpcAnalysisResultTypeormEntity)
    repository: Repository<DisabilityAssessmentForBpcAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateDisabilityAssessmentForBpcAnalysisResult(
    id: DisabilityAssessmentForBpcAnalysisResultId,
    props: DisabilityAssessmentForBpcAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisResultEntity,
      DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createDisabilityAssessmentForBpcAnalysisResult(
    props: DisabilityAssessmentForBpcAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisResultEntity,
      DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
