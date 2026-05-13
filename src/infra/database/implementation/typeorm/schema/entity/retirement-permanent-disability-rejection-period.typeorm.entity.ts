import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-earnings-history.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPermanentDisabilityRejectionPeriodCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-category.enum';
import { RetirementPermanentDisabilityRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-consideration.enum';
import { RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-pendency-reason.enum';
import { RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/enum/retirement-permanent-disability-rejection-period-work-type.enum';

@Entity({ name: 'retirement_permanent_disability_rejection_period' })
export class RetirementPermanentDisabilityRejectionPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionPeriodCategoryEnum,
    nullable: true,
  })
  public category: RetirementPermanentDisabilityRejectionPeriodCategoryEnum | null;

  @Column({ name: 'activity_description', type: 'text', nullable: true })
  public activityDescription: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate: Date | null;

  @Column({
    name: 'work_type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum,
  })
  public workType: RetirementPermanentDisabilityRejectionPeriodWorkTypeEnum;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: RetirementPermanentDisabilityRejectionPeriodPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: RetirementPermanentDisabilityRejectionPeriodConsiderationEnum | null;

  @Column({
    name: 'wants_to_complement_via_meu_inss',
    type: 'boolean',
    nullable: true,
  })
  public wantsToComplementViaMeuINSS: boolean | null;

  @Column({ name: 'status', type: 'boolean' })
  public status: boolean;

  @Column({ name: 'local', type: 'varchar', length: 500, nullable: true })
  public local: string | null;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_permanent_disability_rejection_id' })
  public retirementPermanentDisabilityRejection?: RetirementPermanentDisabilityRejectionTypeormEntity | null;

  @OneToMany(
    () => RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionPeriod,
  )
  public retirementPermanentDisabilityRejectionPeriodDocument?: RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity[];

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionPeriod,
  )
  public retirementPermanentDisabilityRejectionPeriodEarningsHistory?: RetirementPermanentDisabilityRejectionPeriodEarningsHistoryTypeormEntity[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodTypeormEntity.name;
}
