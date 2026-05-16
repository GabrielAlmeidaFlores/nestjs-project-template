import { Entity, JoinColumn, OneToMany, OneToOne, Column } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-inss-benefit.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryIncapacityBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-category.enum';
import type { TemporaryIncapacityBenefitRejectionConditionEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-condition.enum';
import type { TemporaryIncapacityBenefitRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/enum/temporary-incapacity-benefit-rejection-denial-reason.enum';

@Entity({ name: 'temporary_incapacity_benefit_rejection' })
export class TemporaryIncapacityBenefitRejectionTypeormEntity extends BaseTypeormEntity {
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

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  public category: TemporaryIncapacityBenefitRejectionCategoryEnum | null;

  @Column({
    name: 'denial_reason',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public denialReason: TemporaryIncapacityBenefitRejectionDenialReasonEnum | null;

  @Column({ name: 'denial_reason_description', type: 'text', nullable: true })
  public denialReasonDescription: string | null;

  @Column({ name: 'condition', type: 'varchar', length: 100, nullable: true })
  public condition: TemporaryIncapacityBenefitRejectionConditionEnum | null;

  @Column({ name: 'condition_description', type: 'text', nullable: true })
  public conditionDescription: string | null;

  @OneToOne(() => TemporaryIncapacityBenefitRejectionResultTypeormEntity, {
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'temporary_incapacity_benefit_rejection_result_id' })
  public temporaryIncapacityBenefitRejectionResult?: TemporaryIncapacityBenefitRejectionResultTypeormEntity | null;

  @OneToMany(
    () => TemporaryIncapacityBenefitRejectionDocumentTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejection,
  )
  public documents?: TemporaryIncapacityBenefitRejectionDocumentTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejection,
  )
  public inssBenefits?: TemporaryIncapacityBenefitRejectionInssBenefitTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejection,
  )
  public disabilityAnalysis?: TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejection,
  )
  public insuredStatus?: TemporaryIncapacityBenefitRejectionInsuredStatusTypeormEntity[];

  @OneToMany(
    () => TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejection,
  )
  public workPeriods?: TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity[];

  @OneToOne(() => AnalysisToolRecordTypeormEntity, (entity) => entity.temporaryIncapacityBenefitRejection, {
    nullable: true,
    eager: false,
  })
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionTypeormEntity.name;
}
