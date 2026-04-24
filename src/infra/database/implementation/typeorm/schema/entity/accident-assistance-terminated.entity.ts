import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AccidentAssistanceTerminatedBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-cid.entity';
import { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-legal-proceeding.entity';
import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';

@Entity({ name: 'accident_assistance_terminated' })
export class AccidentAssistanceTerminatedTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'accident_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public accidentDate: Date | null;

  @Column({
    name: 'accident_description',
    type: 'text',
    nullable: true,
  })
  public accidentDescription: string | null;

  @Column({
    name: 'der',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public der: Date;

  @Column({
    name: 'denial_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public denialDate: Date;

  @Column({ name: 'category', type: 'varchar', length: 100 })
  public category: AccidentAssistanceTerminatedCategoryEnum;

  @Column({
    name: 'inss_password',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public inssPassword: string | null;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({ name: 'benefit_cessation_reason', type: 'text' })
  public benefitCessationReason: string;

  @Column({ name: 'had_previous_incapacity_benefit', type: 'boolean' })
  public hadPreviousIncapacityBenefit: boolean;

  @Column({
    name: 'previous_incapacity_benefit_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public previousIncapacityBenefitNumber: string | null;

  @Column({
    name: 'previous_incapacity_benefit_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public previousIncapacityBenefitStartDate: Date | null;

  @Column({
    name: 'previous_incapacity_benefit_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public previousIncapacityBenefitEndDate: Date | null;

  @Column({
    name: 'extension_request_status',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public extensionRequestStatus: AccidentAssistanceTerminatedExtensionRequestStatusEnum | null;

  @OneToOne(
    () => AccidentAssistanceTerminatedResultTypeormEntity,
    (entity) => entity.accidentAssistanceTerminated,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_assistance_terminated_result_id' })
  public accidentAssistanceTerminatedResult?:
    | AccidentAssistanceTerminatedResultTypeormEntity
    | undefined;

  @OneToMany(
    () => AccidentAssistanceTerminatedBenefitTypeormEntity,
    (entity) => entity.accidentAssistanceTerminated,
  )
  public accidentAssistanceTerminatedBenefit?:
    | AccidentAssistanceTerminatedBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
    (entity) => entity.accidentAssistanceTerminated,
  )
  public accidentAssistanceTerminatedLegalProceeding?:
    | AccidentAssistanceTerminatedLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentAssistanceTerminatedDocumentTypeormEntity,
    (entity) => entity.accidentAssistanceTerminated,
  )
  public accidentAssistanceTerminatedDocument?:
    | AccidentAssistanceTerminatedDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentAssistanceTerminatedCidTypeormEntity,
    (entity) => entity.accidentAssistanceTerminated,
  )
  public accidentAssistanceTerminatedCid?:
    | AccidentAssistanceTerminatedCidTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.accidentAssistanceTerminated,
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
    AccidentAssistanceTerminatedTypeormEntity.name;
}
