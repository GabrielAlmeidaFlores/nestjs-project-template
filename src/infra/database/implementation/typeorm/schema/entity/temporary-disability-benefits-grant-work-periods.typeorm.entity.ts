import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods-earnings-history.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-pendency-reason.enum';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/enum/temporary-disability-benefits-grant-work-periods-period-consideration.enum';

@Entity({ name: 'temporary_disability_benefits_grant_work_periods' })
export class TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'bond_origin',
    type: 'varchar',
    length: 255,
  })
  public bondOrigin: string;

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
    name: 'category',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantCategoryEnum,
  })
  public category: TemporaryDisabilityBenefitsGrantCategoryEnum;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
  })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: TemporaryDisabilityBenefitsGrantWorkPeriodsPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: TemporaryDisabilityBenefitsGrantWorkPeriodsPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'status',
    type: 'boolean',
  })
  public status: boolean;

  @Column({
    name: 'grace_period',
    type: 'int',
  })
  public gracePeriod: number;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantWorkPeriods,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_id' })
  public temporaryDisabilityBenefitsGrant?: TemporaryDisabilityBenefitsGrantTypeormEntity | null;

  @OneToMany(
    () =>
      TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantWorkPeriods,
  )
  public temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory?:
    | TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity.name;
}
