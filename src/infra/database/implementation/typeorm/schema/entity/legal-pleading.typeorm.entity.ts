import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { LegalPleadingHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-history.typeorm.entity';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { LegalPleadingBenefitTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-benefit-type.enum';
import { LegalPleadingPetitionTypeEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-petition-type.enum';
import { LegalPleadingSocialSecurityObjectiveEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-objective.enum';
import { LegalPleadingSocialSecuritySystemEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-social-security-system.enum';
import { LegalPleadingWritOfMandamusObjectiveEnum } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/enum/legal-pleading-writ-of-mandamus-objective.enum';

@Entity({ name: 'legal_pleading' })
export class LegalPleadingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  public code: string;

  @Column({
    name: 'status',
    type: 'simple-enum',
    enum: AnalysisStatusEnum,
    default: AnalysisStatusEnum.IN_PROGRESS,
  })
  public status: AnalysisStatusEnum;

  @Column({
    name: 'statement_of_facts',
    type: 'text',
    nullable: true,
  })
  public statementOfFacts: string | null;

  @Column({
    name: 'additional_comments',
    type: 'text',
    nullable: true,
  })
  public additionalComments: string | null;

  @Column({
    name: 'security_system',
    type: 'simple-enum',
    enum: LegalPleadingSocialSecuritySystemEnum,
    nullable: true,
  })
  public securitySystem: LegalPleadingSocialSecuritySystemEnum | null;

  @Column({
    name: 'benefit_type',
    type: 'simple-enum',
    enum: LegalPleadingBenefitTypeEnum,
    nullable: true,
  })
  public benefitType: LegalPleadingBenefitTypeEnum | null;

  @Column({
    name: 'petition_type',
    type: 'simple-enum',
    enum: LegalPleadingPetitionTypeEnum,
    nullable: true,
  })
  public petitionType: LegalPleadingPetitionTypeEnum | null;

  @Column({
    name: 'benefit_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public benefitNumber: string | null;

  @Column({
    name: 'application_submission_date',
    type: 'date',
    nullable: true,
    transformer: DateTransformer,
  })
  public readonly applicationSubmissionDate: Date | null;

  @Column({
    name: 'benefit_termination_date',
    type: 'date',
    nullable: true,
    transformer: DateTransformer,
  })
  public readonly benefitTerminationDate: Date | null;

  @Column({
    name: 'benefit_initial_monthly_income',
    type: 'decimal',
    nullable: true,
  })
  public readonly benefitInitialMonthlyIncome: string | null;

  @Column({
    name: 'benefit_current_monthly_income',
    type: 'decimal',
    nullable: true,
  })
  public readonly benefitCurrentMonthlyIncome: string | null;

  @Column({
    name: 'social_security_objective',
    type: 'simple-enum',
    enum: LegalPleadingSocialSecurityObjectiveEnum,
    nullable: true,
  })
  public socialSecurityObjective: LegalPleadingSocialSecurityObjectiveEnum | null;

  @Column({
    name: 'legal_pleading_writ_of_mandamus_objective',
    type: 'simple-enum',
    enum: LegalPleadingWritOfMandamusObjectiveEnum,
    nullable: true,
  })
  public legalPleadingWritOfMandamusObjective: LegalPleadingWritOfMandamusObjectiveEnum | null;

  @ManyToOne(
    () => AnalysisToolClientTypeormEntity,
    (entity) => entity.legalPleading,
  )
  @JoinColumn({ name: 'analysis_tool_client_id' })
  public analysisToolClient?: AnalysisToolClientTypeormEntity | undefined;

  @OneToMany(
    () => LegalPleadingDocumentTypeormEntity,
    (entity) => entity.legalPleading,
  )
  public legalPleadingDocument?:
    | LegalPleadingDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => LegalPleadingHistoryTypeormEntity,
    (entity) => entity.legalPleading,
  )
  public legalPleadingHistory?: LegalPleadingHistoryTypeormEntity[] | undefined;

  @OneToOne(
    () => LegalPleadingAddressTypeormEntity,
    (entity) => entity.legalPleading,
    { nullable: true },
  )
  @JoinColumn({ name: 'legal_pleading_address_id' })
  public legalPleadingAddress?: LegalPleadingAddressTypeormEntity | undefined;

  @OneToOne(
    () => LegalPleadingResultTypeormEntity,
    (entity) => entity.legalPleading,
    { nullable: true },
  )
  @JoinColumn({ name: 'legal_pleading_result_id' })
  public legalPleadingResult?: LegalPleadingResultTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = LegalPleadingTypeormEntity.name;
}
