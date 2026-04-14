import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-document.typeorm.entity';
import { DeathBenefitGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-earnings-history.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitGrantCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-category.enum';
import { DeathBenefitGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-consideration.enum';
import { DeathBenefitGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/enum/death-benefit-grant-period-pendency-reason.enum';

@Entity({ name: 'death_benefit_grant_period' })
export class DeathBenefitGrantPeriodTypeormEntity extends BaseTypeormEntity {
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
    enum: DeathBenefitGrantCategoryEnum,
  })
  public category: DeathBenefitGrantCategoryEnum;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: DeathBenefitGrantPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: DeathBenefitGrantPeriodPendencyReasonEnum | null;

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
    enum: DeathBenefitGrantPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: DeathBenefitGrantPeriodConsiderationEnum | null;

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
    () => DeathBenefitGrantTypeormEntity,
    (entity) => entity.deathBenefitGrantPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_grant_id' })
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitGrantPeriodDocumentTypeormEntity,
    (entity) => entity.deathBenefitGrantPeriod,
  )
  public deathBenefitGrantPeriodDocument?:
    | DeathBenefitGrantPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.deathBenefitGrantPeriod,
  )
  public deathBenefitGrantPeriodEarningsHistory?:
    | DeathBenefitGrantPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type = DeathBenefitGrantPeriodTypeormEntity.name;
}
