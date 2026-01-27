import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-benefit/command/disability-assessment-for-bpc-analysis-benefit.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/value-object/disability-assessment-for-bpc-analysis-benefit-id/disability-assessment-for-bpc-analysis-benefit-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity>
  implements DisabilityAssessmentForBpcAnalysisBenefitCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity)
    repository: Repository<DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public deleteDisabilityAssessmentForBpcAnalysisBenefit(
    id: DisabilityAssessmentForBpcAnalysisBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public createDisabilityAssessmentForBpcAnalysisBenefit(
    props: DisabilityAssessmentForBpcAnalysisBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisBenefitEntity,
      DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }
}
