import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period-document.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period-earnings-history.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { SpecialRetirementRejectionWorkPeriodActivityTypeEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-activity-type.enum';
import { SpecialRetirementRejectionWorkPeriodCategoryEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-category.enum';
import { SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/enum/special-retirement-rejection-work-period-period-consideration.enum';

@Entity({ name: 'special_retirement_rejection_work_period' })
export class SpecialRetirementRejectionWorkPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'bond_origin',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public bondOrigin: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public startDate: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: SpecialRetirementRejectionWorkPeriodCategoryEnum | null;

  @Column({
    name: 'pendency_reason',
    type: 'json',
    nullable: true,
  })
  public pendencyReason: string[] | null;

  @Column({
    name: 'period_consideration',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public periodConsideration: SpecialRetirementRejectionWorkPeriodPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public status: string | null;

  @Column({
    name: 'grace_period',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public gracePeriod: string | null;

  @Column({
    name: 'activity_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public activityType: SpecialRetirementRejectionWorkPeriodActivityTypeEnum | null;

  @ManyToOne(
    () => SpecialRetirementRejectionTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_id' })
  public specialRetirementRejection?: SpecialRetirementRejectionTypeormEntity | null;

  @OneToMany(
    () => SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkPeriod,
  )
  public specialRetirementRejectionWorkPeriodDocument?:
    | SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkPeriod,
  )
  public specialRetirementRejectionWorkPeriodEarningsHistory?:
    | SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkPeriod,
  )
  public specialRetirementRejectionWorkSpecialPeriod?:
    | SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialRetirementRejectionWorkPeriodTypeormEntity.name;
}
