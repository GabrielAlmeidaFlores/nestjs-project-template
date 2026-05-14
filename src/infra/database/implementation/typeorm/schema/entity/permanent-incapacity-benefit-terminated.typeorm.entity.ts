import { Entity, JoinColumn, OneToMany, OneToOne, Column } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-result.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { PermanentIncapacityBenefitTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-category.enum';
import type { PermanentIncapacityBenefitTerminatedReasonEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/enum/permanent-incapacity-benefit-terminated-reason.enum';

@Entity({ name: 'permanent_incapacity_benefit_terminated' })
export class PermanentIncapacityBenefitTerminatedTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'benefit_termination_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public benefitTerminationDate: Date | null;

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  public category: PermanentIncapacityBenefitTerminatedCategoryEnum | null;

  @Column({
    name: 'termination_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public terminationReason: PermanentIncapacityBenefitTerminatedReasonEnum | null;

  @Column({
    name: 'termination_reason_description',
    type: 'text',
    nullable: true,
  })
  public terminationReasonDescription: string | null;

  @OneToOne(() => PermanentIncapacityBenefitTerminatedResultTypeormEntity, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'permanent_incapacity_benefit_terminated_result_id' })
  public permanentIncapacityBenefitTerminatedResult?: PermanentIncapacityBenefitTerminatedResultTypeormEntity | null;

  @OneToMany(
    () => PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminated,
  )
  public documents?: PermanentIncapacityBenefitTerminatedDocumentTypeormEntity[];

  @OneToMany(
    () => PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminated,
  )
  public inssBenefits?: PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity[];

  @OneToMany(
    () => PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminated,
  )
  public disabilityAnalysis?: PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity[];

  @OneToMany(
    () => PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminated,
  )
  public insuredStatus?: PermanentIncapacityBenefitTerminatedInsuredStatusTypeormEntity[];

  @OneToMany(
    () => PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminated,
  )
  public workPeriods?: PermanentIncapacityBenefitTerminatedWorkPeriodsTypeormEntity[];

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminated,
    {
      nullable: true,
      eager: false,
    },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedTypeormEntity.name;
}
