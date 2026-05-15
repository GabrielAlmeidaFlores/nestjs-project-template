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
import { BpcDisabilityGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-document.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member.typeorm.entity';
import { BpcDisabilityGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-inss-benefit.typeorm.entity';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-representative-of-a-minor.typeorm.entity';
import { BpcDisabilityGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-proceeding.typeorm.entity';
import { BpcDisabilityGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcDisabilityGrantCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/enum/bpc-disability-grant-category.enum';
import { DisabilityRetirementPlanningPeriodDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/enum/disability-retirement-planning-period-disability-category.enum';
import { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';

@Entity({ name: 'bpc_disability_grant' })
export class BpcDisabilityGrantTypeormEntity extends BaseTypeormEntity {
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
    enum: BpcDisabilityGrantCategoryEnum,
    nullable: true,
  })
  public category: BpcDisabilityGrantCategoryEnum | null;

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

  @OneToOne(
    () => BpcDisabilityGrantResultTypeormEntity,
    (entity) => entity.BpcDisabilityGrant,
    { nullable: true },
  )
  public BpcDisabilityGrantResult?:
    | BpcDisabilityGrantResultTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcDisabilityGrantFamilyMemberTypeormEntity,
    (entity) => entity.BpcDisabilityGrant,
  )
  public BpcDisabilityGrantFamilyMember?:
    | BpcDisabilityGrantFamilyMemberTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityGrantDocumentTypeormEntity,
    (entity) => entity.BpcDisabilityGrant,
  )
  public BpcDisabilityGrantDocument?:
    | BpcDisabilityGrantDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityGrantInssBenefitTypeormEntity,
    (entity) => entity.BpcDisabilityGrant,
  )
  public BpcDisabilityGrantInssBenefit?:
    | BpcDisabilityGrantInssBenefitTypeormEntity[]
    | undefined;

  @OneToOne(
    () => BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
    (entity) => entity.BpcDisabilityGrant,
    { nullable: true },
  )
  public BpcDisabilityGrantLegalRepresentativeOfAMinor?:
    | BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcDisabilityGrantLegalProceedingTypeormEntity,
    (entity) => entity.BpcDisabilityGrant,
  )
  public BpcDisabilityGrantLegalProceeding?:
    | BpcDisabilityGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.bpcDisabilityGrant,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = BpcDisabilityGrantTypeormEntity.name;
}
