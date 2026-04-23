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
import { BpcDisabilityDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-document.typeorm.entity';
import { BpcDisabilityDenialFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-family-member.typeorm.entity';
import { BpcDisabilityDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-inss-benefit.typeorm.entity';
import { BpcDisabilityDenialLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-legal-proceeding.typeorm.entity';
import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcDisabilityDenialCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-category.enum';
import { BpcDisabilityDenialDenialReasonEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/enum/bpc-disability-denial-denial-reason.enum';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';

@Entity({ name: 'bpc_disability_denial' })
export class BpcDisabilityDenialTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'request_entry_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public requestEntryDate: Date | null;

  @Column({
    name: 'denial_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public denialDate: Date | null;

  @Column({
    name: 'requested_benefit_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public requestedBenefitType: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: BpcDisabilityDenialCategoryEnum,
    nullable: true,
  })
  public category: BpcDisabilityDenialCategoryEnum | null;

  @Column({
    name: 'denial_reason',
    type: 'simple-enum',
    enum: BpcDisabilityDenialDenialReasonEnum,
    nullable: true,
  })
  public denialReason: BpcDisabilityDenialDenialReasonEnum | null;

  @Column({
    name: 'denial_reason_description',
    type: 'text',
    nullable: true,
  })
  public denialReasonDescription: string | null;

  @Column({
    name: 'disability_type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum,
    nullable: true,
  })
  public disabilityType: DisabilityRetirementPlanningPeriodDisabilityCategoryEnum | null;

  @Column({
    name: 'disability_degree',
    type: 'simple-enum',
    enum: RetirementPlanningDisabilityDegreeEnum,
    nullable: true,
  })
  public disabilityDegree: RetirementPlanningDisabilityDegreeEnum | null;

  @Column({
    name: 'estimated_disability_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public estimatedDisabilityStartDate: Date | null;

  @Column({
    name: 'attends_school_or_technical_course',
    type: 'boolean',
    nullable: true,
  })
  public attendsSchoolOrTechnicalCourse: boolean | null;

  @Column({
    name: 'performs_labor_activity',
    type: 'boolean',
    nullable: true,
  })
  public performsLaborActivity: boolean | null;

  @Column({
    name: 'needs_third_party_help',
    type: 'boolean',
    nullable: true,
  })
  public needsThirdPartyHelp: boolean | null;

  @Column({
    name: 'has_access_to_basic_services',
    type: 'boolean',
    nullable: true,
  })
  public hasAccessToBasicServices: boolean | null;

  @Column({
    name: 'other_barriers_description',
    type: 'text',
    nullable: true,
  })
  public otherBarriersDescription: string | null;

  @Column({ name: 'lives_alone', type: 'boolean', nullable: true })
  public livesAlone: boolean | null;

  @OneToOne(
    () => BpcDisabilityDenialResultTypeormEntity,
    (entity) => entity.bpcDisabilityDenial,
    { nullable: true },
  )
  public bpcDisabilityDenialResult?:
    | BpcDisabilityDenialResultTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcDisabilityDenialFamilyMemberTypeormEntity,
    (entity) => entity.bpcDisabilityDenial,
  )
  public bpcDisabilityDenialFamilyMember?:
    | BpcDisabilityDenialFamilyMemberTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityDenialDocumentTypeormEntity,
    (entity) => entity.bpcDisabilityDenial,
  )
  public bpcDisabilityDenialDocument?:
    | BpcDisabilityDenialDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityDenialInssBenefitTypeormEntity,
    (entity) => entity.bpcDisabilityDenial,
  )
  public bpcDisabilityDenialInssBenefit?:
    | BpcDisabilityDenialInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityDenialLegalProceedingTypeormEntity,
    (entity) => entity.bpcDisabilityDenial,
  )
  public bpcDisabilityDenialLegalProceeding?:
    | BpcDisabilityDenialLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.bpcDisabilityDenial,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = BpcDisabilityDenialTypeormEntity.name;
}
