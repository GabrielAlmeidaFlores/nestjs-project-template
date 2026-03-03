import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-benefit.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import { DisabilityAssessmentForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-result.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'disability_assessment_for_bpc_analysis' })
export class DisabilityAssessmentForBpcAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'estimated_disability_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public estimatedDisabilityStartDate?: Date | null;

  @Column({
    name: 'attends_school_or_technical_course',
    type: 'boolean',
    nullable: true,
  })
  public attendsSchoolOrTechnicalCourse?: boolean | null;

  @Column({
    name: 'performs_labor_activity',
    type: 'boolean',
    nullable: true,
  })
  public performsLaborActivity?: boolean | null;

  @Column({
    name: 'needs_third_party_help',
    type: 'boolean',
    nullable: true,
  })
  public needsThirdPartyHelp?: boolean | null;

  @Column({
    name: 'has_access_to_basic_services',
    type: 'boolean',
    nullable: true,
  })
  public hasAccessToBasicServices?: boolean | null;

  @Column({
    name: 'other_barriers_description',
    type: 'text',
    nullable: true,
  })
  public otherBarriersDescription?: string | null;

  @OneToOne(
    () => DisabilityAssessmentForBpcAnalysisResultTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_assessment_for_bpc_analysis_result_id' })
  public disabilityAssessmentForBpcAnalysisResult?:
    | DisabilityAssessmentForBpcAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysis,
  )
  public disabilityAssessmentForBpcAnalysisBenefit?:
    | DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysis,
  )
  public disabilityAssessmentForBpcAnalysisLegalProceeding?:
    | DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysis,
  )
  public disabilityAssessmentForBpcAnalysisDocument?:
    | DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisTypeormEntity.name;
}
