import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AccidentBenefitRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-document.typeorm.entity';
import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { AccidentBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-inss-benefit.typeorm.entity';
import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { AccidentBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-category.enum';
import { AccidentBenefitRejectionMainReasonEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-main-reason.enum';
import { AccidentBenefitRejectionRequestToExtendEnum } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/enum/accident-benefit-rejection-request-to-extend.enum';

@Entity({ name: 'accident_benefit_rejection' })
export class AccidentBenefitRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'requirement_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public requirementStartDate: Date | null;

  @Column({
    name: 'rejection_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public rejectionDate: Date | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: AccidentBenefitRejectionCategoryEnum,
    nullable: true,
  })
  public category: AccidentBenefitRejectionCategoryEnum | null;

  @Column({
    name: 'main_accident_benefit_rejection_reason',
    type: 'simple-enum',
    enum: AccidentBenefitRejectionMainReasonEnum,
    nullable: true,
  })
  public mainAccidentBenefitRejectionReason: AccidentBenefitRejectionMainReasonEnum | null;

  @Column({
    name: 'other_accident_benefit_rejection_reason',
    type: 'longtext',
    nullable: true,
  })
  public otherAccidentBenefitRejectionReason: string | null;

  @Column({
    name: 'has_previous_grant_related',
    type: 'boolean',
    nullable: true,
  })
  public hasPreviousGrantRelated: boolean | null;

  @Column({
    name: 'previous_grant_benefit_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public previousGrantBenefitNumber: string | null;

  @Column({
    name: 'previous_grant_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public previousGrantStartDate: Date | null;

  @Column({
    name: 'previous_grant_termination_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public previousGrantTerminationDate: Date | null;

  @Column({
    name: 'request_to_extend_temporary_disability_benefit',
    type: 'simple-enum',
    enum: AccidentBenefitRejectionRequestToExtendEnum,
    nullable: true,
  })
  public requestToExtendTemporaryDisabilityBenefit: AccidentBenefitRejectionRequestToExtendEnum | null;

  @OneToOne(
    () => AccidentBenefitRejectionResultTypeormEntity,
    (entity) => entity.accidentBenefitRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_benefit_rejection_result_id' })
  public accidentBenefitRejectionResult?:
    | AccidentBenefitRejectionResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => AccidentBenefitRejectionDocumentTypeormEntity,
    (entity) => entity.accidentBenefitRejection,
  )
  public accidentBenefitRejectionDocument?:
    | AccidentBenefitRejectionDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentBenefitRejectionInssBenefitTypeormEntity,
    (entity) => entity.accidentBenefitRejection,
  )
  public accidentBenefitRejectionInssBenefit?:
    | AccidentBenefitRejectionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentBenefitRejectionEventTypeormEntity,
    (entity) => entity.accidentBenefitRejection,
  )
  public accidentBenefitRejectionEvent?:
    | AccidentBenefitRejectionEventTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AccidentBenefitRejectionWorkPeriodTypeormEntity,
    (entity) => entity.accidentBenefitRejection,
  )
  public accidentBenefitRejectionWorkPeriod?:
    | AccidentBenefitRejectionWorkPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type =
    AccidentBenefitRejectionTypeormEntity.name;
}
