import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-earnings-history.typeorm.entity';
import { SpecialRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-document.typeorm.entity';
import { SpecialRetirementGrantPeriodObservationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-observation.typeorm.entity';
import { SpecialRetirementGrantPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-overdue-contribution.typeorm.entity';
import { SpecialRetirementGrantPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-pending-exit-date.typeorm.entity';
import { SpecialRetirementGrantPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period-under-minimum.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { SpecialRetirementGrantPeriodBelowTheMinimumEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-below-the-minimum.enum';
import { SpecialRetirementGrantPeriodLeaveDateEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-leave-date.enum';
import { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';

@Entity({ name: 'special_retirement_grant_period' })
export class SpecialRetirementGrantPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'sequencial',
    type: 'int',
    nullable: true,
  })
  public sequencial?: number | null;

  @Column({
    name: 'employment_relationship_source',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public employmentRelationshipSource?: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public startDate?: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate?: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category?: string | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public status?: SpecialRetirementGrantPeriodStatusEnum | null;

  @Column({
    name: 'average_contribution_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public averageContributionAmount?: string | null;

  @Column({
    name: 'should_consider_period',
    type: 'boolean',
    default: true,
  })
  public shouldConsiderPeriod: boolean;

  @Column({
    name: 'should_consider_last_remuneration_as_exit_date',
    type: 'boolean',
    default: false,
  })
  public shouldConsiderLastRemunerationAsExitDate: boolean;

  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument?: string | null;

  @Column({
    name: 'below_the_minimum',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public belowTheMinimum?: SpecialRetirementGrantPeriodBelowTheMinimumEnum | null;

  @Column({
    name: 'leave_date',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public leaveDate?: SpecialRetirementGrantPeriodLeaveDateEnum | null;

  @ManyToOne(
    () => SpecialRetirementGrantTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant?: SpecialRetirementGrantTypeormEntity | null;

  @OneToMany(
    () => SpecialRetirementGrantEarningsHistoryTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
  )
  public specialRetirementGrantEarningsHistory?:
    | SpecialRetirementGrantEarningsHistoryTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantPeriodUnderMinimumTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
  )
  public specialRetirementGrantPeriodUnderMinimum?:
    | SpecialRetirementGrantPeriodUnderMinimumTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantPeriodPendingExitDateTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
  )
  public specialRetirementGrantPeriodPendingExitDate?:
    | SpecialRetirementGrantPeriodPendingExitDateTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantPeriodOverdueContributionTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
  )
  public specialRetirementGrantPeriodOverdueContribution?:
    | SpecialRetirementGrantPeriodOverdueContributionTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantPeriodObservationTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
  )
  public specialRetirementGrantPeriodObservation?:
    | SpecialRetirementGrantPeriodObservationTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantPeriodDocumentTypeormEntity,
    (entity) => entity.specialRetirementGrantPeriod,
  )
  public specialRetirementGrantPeriodDocument?:
    | SpecialRetirementGrantPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialRetirementGrantPeriodTypeormEntity.name;
}
