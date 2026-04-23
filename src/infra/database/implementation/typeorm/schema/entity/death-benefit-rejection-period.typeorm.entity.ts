import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-document.typeorm.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-earnings-history.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-category.enum';
import { DeathBenefitRejectionPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-consideration.enum';
import { DeathBenefitRejectionPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/enum/death-benefit-rejection-period-pendency-reason.enum';

@Entity({ name: 'death_benefit_rejection_period' })
export class DeathBenefitRejectionPeriodTypeormEntity extends BaseTypeormEntity {
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
    enum: DeathBenefitRejectionCategoryEnum,
  })
  public category: DeathBenefitRejectionCategoryEnum;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: DeathBenefitRejectionPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: DeathBenefitRejectionPeriodPendencyReasonEnum | null;

  @Column({
    name: 'type_of_contribution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public typeOfContribution: string | null;

  @Column({ name: 'status', type: 'boolean' })
  public status: boolean;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: DeathBenefitRejectionPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: DeathBenefitRejectionPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

  @Column({ name: 'impact', type: 'varchar', length: 500, nullable: true })
  public impact: string | null;

  @Column({ name: 'grace_period', type: 'int', nullable: true })
  public gracePeriod: number | null;

  @Column({
    name: 'complement_via_my_inss',
    type: 'boolean',
    nullable: true,
  })
  public complementViaMyInss: boolean | null;

  @ManyToOne(
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitRejectionPeriodDocumentTypeormEntity,
    (entity) => entity.deathBenefitRejectionPeriod,
  )
  public deathBenefitRejectionPeriodDocument?:
    | DeathBenefitRejectionPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.deathBenefitRejectionPeriod,
  )
  public deathBenefitRejectionPeriodEarningsHistory?:
    | DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DeathBenefitRejectionPeriodTypeormEntity.name;
}
