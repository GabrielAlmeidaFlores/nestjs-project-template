import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MaternityPayGrantEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-earnings-history.typeorm.entity';
import { MaternityPayGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period-document.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { MaternityPayGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-consideration.enum';
import { MaternityPayGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/enum/maternity-pay-grant-period-pendency-reason.enum';
import { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

@Entity({ name: 'maternity_pay_grant_period' })
export class MaternityPayGrantPeriodTypeormEntity extends BaseTypeormEntity {
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
    enum: MaternityPayGrantCategoryEnum,
  })
  public category: MaternityPayGrantCategoryEnum;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: MaternityPayGrantPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: MaternityPayGrantPeriodPendencyReasonEnum | null;

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
    enum: MaternityPayGrantPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: MaternityPayGrantPeriodConsiderationEnum | null;

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

  @Column({ name: 'impact', type: 'text', nullable: true })
  public impact: string | null;

  @Column({ name: 'grace_period', type: 'int', nullable: true })
  public gracePeriod: number | null;

  @Column({ name: 'complement_via_my_inss', type: 'boolean', nullable: true })
  public complementViaMyInss: boolean | null;

  @ManyToOne(
    () => MaternityPayGrantTypeormEntity,
    (entity) => entity.maternityPayGrantPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'maternity_pay_grant_id' })
  public maternityPayGrant?: MaternityPayGrantTypeormEntity | null;

  @OneToMany(
    () => MaternityPayGrantEarningsHistoryTypeormEntity,
    (entity) => entity.maternityPayGrantPeriod,
  )
  public maternityPayGrantPeriodEarningsHistory?:
    | MaternityPayGrantEarningsHistoryTypeormEntity[]
    | undefined;

  @OneToMany(
    () => MaternityPayGrantPeriodDocumentTypeormEntity,
    (entity) => entity.maternityPayGrantPeriod,
  )
  public maternityPayGrantPeriodDocument?:
    | MaternityPayGrantPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type = MaternityPayGrantPeriodTypeormEntity.name;
}
