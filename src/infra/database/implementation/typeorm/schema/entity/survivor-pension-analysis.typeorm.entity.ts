import { Entity, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';

@Entity({ name: 'spa' })
export class SurvivorPensionAnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.survivorPensionAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToOne(
    () => SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    (entity) => entity.survivorPensionAnalysis,
    { nullable: true },
  )
  public customerProfileIdentification?:
    | SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity
    | undefined;

  @OneToOne(
    () => SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    (entity) => entity.survivorPensionAnalysis,
    { nullable: true },
  )
  public benefitOriginatorIdentification?:
    | SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity
    | undefined;

  @OneToOne(
    () => SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    (entity) => entity.survivorPensionAnalysis,
    { nullable: true },
  )
  public deceasedWorkHistory?:
    | SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity
    | undefined;

  @OneToOne(
    () => SurvivorPensionAnalysisResultTypeormEntity,
    (entity) => entity.survivorPensionAnalysis,
    { nullable: true },
  )
  public result?: SurvivorPensionAnalysisResultTypeormEntity | undefined;

  @OneToMany(
    () => SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    (entity) => entity.survivorPensionAnalysis,
  )
  public deceasedBenefitDependents?:
    | SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity[]
    | undefined;

  protected override readonly _type = SurvivorPensionAnalysisTypeormEntity.name;
}
