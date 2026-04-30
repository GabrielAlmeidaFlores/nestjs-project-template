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
import { BpcElderlyCessationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-document.typeorm.entity';
import { BpcElderlyCessationFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member.typeorm.entity';
import { BpcElderlyCessationInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-inss-benefit.typeorm.entity';
import { BpcElderlyCessationLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-legal-proceeding.typeorm.entity';
import { BpcElderlyCessationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcElderlyCessationCategoryEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-category.enum';
import { BpcElderlyCessationCessationReasonEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-cessation-reason.enum';
import { BpcElderlyCessationCivilStatusEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-civil-status.enum';
import { BpcElderlyCessationEducationLevelEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/enum/bpc-elderly-cessation-education-level.enum';

@Entity({ name: 'bpc_elderly_cessation' })
export class BpcElderlyCessationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'decision_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public decisionDate: Date | null;

  @Column({
    name: 'previous_inss_benefit_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public previousInssBenefitNumber: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: BpcElderlyCessationCategoryEnum,
    nullable: true,
  })
  public category: BpcElderlyCessationCategoryEnum | null;

  @Column({
    name: 'cessation_reason',
    type: 'simple-enum',
    enum: BpcElderlyCessationCessationReasonEnum,
    nullable: true,
  })
  public cessationReason: BpcElderlyCessationCessationReasonEnum | null;

  @Column({
    name: 'cessation_reason_description',
    type: 'text',
    nullable: true,
  })
  public cessationReasonDescription: string | null;

  @Column({
    name: 'is_appeal_deadline_expired',
    type: 'boolean',
    nullable: true,
  })
  public isAppealDeadlineExpired: boolean | null;

  @Column({
    name: 'my_inss_password',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public myInssPassword: string | null;

  @Column({
    name: 'civil_status',
    type: 'simple-enum',
    enum: BpcElderlyCessationCivilStatusEnum,
    nullable: true,
  })
  public civilStatus: BpcElderlyCessationCivilStatusEnum | null;

  @Column({
    name: 'education_level',
    type: 'simple-enum',
    enum: BpcElderlyCessationEducationLevelEnum,
    nullable: true,
  })
  public educationLevel: BpcElderlyCessationEducationLevelEnum | null;

  @Column({
    name: 'current_address',
    type: 'text',
    nullable: true,
  })
  public currentAddress: string | null;

  @Column({
    name: 'previous_address',
    type: 'text',
    nullable: true,
  })
  public previousAddress: string | null;

  @Column({
    name: 'has_address_changed_since_decision',
    type: 'boolean',
    nullable: true,
  })
  public hasAddressChangedSinceDecision: boolean | null;

  @Column({ name: 'lives_alone', type: 'boolean', nullable: true })
  public livesAlone: boolean | null;

  @OneToOne(
    () => BpcElderlyCessationResultTypeormEntity,
    (entity) => entity.bpcElderlyCessation,
    { nullable: true },
  )
  public bpcElderlyCessationResult?:
    | BpcElderlyCessationResultTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcElderlyCessationFamilyMemberTypeormEntity,
    (entity) => entity.bpcElderlyCessation,
  )
  public bpcElderlyCessationFamilyMember?:
    | BpcElderlyCessationFamilyMemberTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcElderlyCessationDocumentTypeormEntity,
    (entity) => entity.bpcElderlyCessation,
  )
  public bpcElderlyCessationDocument?:
    | BpcElderlyCessationDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcElderlyCessationInssBenefitTypeormEntity,
    (entity) => entity.bpcElderlyCessation,
  )
  public bpcElderlyCessationInssBenefit?:
    | BpcElderlyCessationInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => BpcElderlyCessationLegalProceedingTypeormEntity,
    (entity) => entity.bpcElderlyCessation,
  )
  public bpcElderlyCessationLegalProceeding?:
    | BpcElderlyCessationLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.bpcElderlyCessation,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = BpcElderlyCessationTypeormEntity.name;
}
