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
import { BpcDisabilityTerminationDisabilityAssessmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-disability-assessment.typeorm.entity';
import { BpcDisabilityTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-document.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member.typeorm.entity';
import { BpcDisabilityTerminationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-inss-benefit.typeorm.entity';
import { BpcDisabilityTerminationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-legal-proceeding.typeorm.entity';
import { BpcDisabilityTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { BpcDisabilityTerminationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-category.enum';
import { BpcDisabilityTerminationDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-degree.enum';
import { BpcDisabilityTerminationDisabilityTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/enum/bpc-disability-termination-disability-type.enum';

@Entity({ name: 'bpc_disability_termination' })
export class BpcDisabilityTerminationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: BpcDisabilityTerminationCategoryEnum,
    nullable: true,
  })
  public category: BpcDisabilityTerminationCategoryEnum | null;

  @Column({
    name: 'disability_type',
    type: 'simple-enum',
    enum: BpcDisabilityTerminationDisabilityTypeEnum,
    nullable: true,
  })
  public disabilityType: BpcDisabilityTerminationDisabilityTypeEnum | null;

  @Column({
    name: 'disability_degree',
    type: 'simple-enum',
    enum: BpcDisabilityTerminationDisabilityDegreeEnum,
    nullable: true,
  })
  public disabilityDegree: BpcDisabilityTerminationDisabilityDegreeEnum | null;

  @Column({
    name: 'benefit_cessation_reason',
    type: 'text',
    nullable: true,
  })
  public benefitCessationReason: string | null;

  @Column({ name: 'lives_alone', type: 'boolean', nullable: true })
  public livesAlone: boolean | null;

  @OneToOne(
    () => BpcDisabilityTerminationResultTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
    { nullable: true },
  )
  public bpcDisabilityTerminationResult?:
    | BpcDisabilityTerminationResultTypeormEntity
    | undefined;

  @OneToOne(
    () => BpcDisabilityTerminationDisabilityAssessmentTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
    { nullable: true },
  )
  public bpcDisabilityTerminationDisabilityAssessment?:
    | BpcDisabilityTerminationDisabilityAssessmentTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcDisabilityTerminationFamilyMemberTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
  )
  public bpcDisabilityTerminationFamilyMember?:
    | BpcDisabilityTerminationFamilyMemberTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityTerminationDocumentTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
  )
  public bpcDisabilityTerminationDocument?:
    | BpcDisabilityTerminationDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityTerminationInssBenefitTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
  )
  public bpcDisabilityTerminationInssBenefit?:
    | BpcDisabilityTerminationInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcDisabilityTerminationLegalProceedingTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
  )
  public bpcDisabilityTerminationLegalProceeding?:
    | BpcDisabilityTerminationLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.bpcDisabilityTermination,
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
    BpcDisabilityTerminationTypeormEntity.name;
}
