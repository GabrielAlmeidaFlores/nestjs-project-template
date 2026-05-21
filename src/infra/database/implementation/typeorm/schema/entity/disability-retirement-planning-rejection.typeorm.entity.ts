import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-document.typeorm.entity';
import { DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-period.typeorm.entity';
import { DisabilityRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-result.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-category.enum';
import { DisabilityRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-denial-reason.enum';
import { DisabilityRetirementPlanningRejectionRetirementTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-retirement-type.enum';

@Entity({ name: 'disability_retirement_planning_rejection' })
export class DisabilityRetirementPlanningRejectionTypeormEntity extends BaseTypeormEntity {
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
    enum: DisabilityRetirementPlanningRejectionCategoryEnum,
    nullable: true,
  })
  public category: DisabilityRetirementPlanningRejectionCategoryEnum | null;

  @Column({
    name: 'retirement_type',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionRetirementTypeEnum,
    nullable: true,
  })
  public retirementType: DisabilityRetirementPlanningRejectionRetirementTypeEnum | null;

  @Column({
    name: 'denial_reason',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningRejectionDenialReasonEnum,
    nullable: true,
  })
  public denialReason: DisabilityRetirementPlanningRejectionDenialReasonEnum | null;

  @Column({
    name: 'denial_reason_description',
    type: 'text',
    nullable: true,
  })
  public denialReasonDescription: string | null;

  @OneToOne(
    () => DisabilityRetirementPlanningRejectionResultTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_result_id' })
  public disabilityRetirementPlanningRejectionResult?: DisabilityRetirementPlanningRejectionResultTypeormEntity | null;

  @OneToMany(
    () => DisabilityRetirementPlanningRejectionDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejection,
  )
  public disabilityRetirementPlanningRejectionDocument?: DisabilityRetirementPlanningRejectionDocumentTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningRejectionPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejection,
  )
  public disabilityRetirementPlanningRejectionPeriod?: DisabilityRetirementPlanningRejectionPeriodTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejection,
  )
  public disabilityRetirementPlanningRejectionTimeAccelerator?: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity[];

  @OneToMany(
    () => DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejection,
  )
  public disabilityRetirementPlanningRejectionInssBenefit?: DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity[];

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejection,
    {
      nullable: true,
      eager: false,
    },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionTypeormEntity.name;
}
