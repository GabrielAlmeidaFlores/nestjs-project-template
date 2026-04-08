import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-document.typeorm.entity';
import { DeathBenefitPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-earnings-history.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-category.enum';
import { DeathBenefitPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-consideration.enum';
import { DeathBenefitPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/enum/death-benefit-period-pendency-reason.enum';

@Entity({ name: 'death_benefit_period' })
export class DeathBenefitPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'start_date', type: 'date', transformer: DateOnlyTransformer })
  public startDate: Date;

  @Column({ name: 'end_date', type: 'date', nullable: true, transformer: DateOnlyTransformer })
  public endDate: Date | null;

  @Column({ name: 'category', type: 'simple-enum', enum: DeathBenefitCategoryEnum })
  public category: DeathBenefitCategoryEnum;

  @Column({ name: 'is_pendency', type: 'boolean' })
  public isPendency: boolean;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean' })
  public competenceBelowTheMinimum: boolean;

  @Column({ name: 'pendency_reason', type: 'simple-enum', enum: DeathBenefitPeriodPendencyReasonEnum, nullable: true })
  public pendencyReason: DeathBenefitPeriodPendencyReasonEnum | null;

  @Column({ name: 'type_of_contribution', type: 'varchar', length: 255, nullable: true })
  public typeOfContribution: string | null;

  @Column({ name: 'status', type: 'boolean' })
  public status: boolean;

  @Column({ name: 'period_consideration', type: 'simple-enum', enum: DeathBenefitPeriodConsiderationEnum, nullable: true })
  public periodConsideration: DeathBenefitPeriodConsiderationEnum | null;

  @Column({ name: 'contribution_average', type: 'decimal', precision: 10, scale: 2, nullable: true })
  public contributionAverage: string | null;

  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

  @ManyToOne(
    () => DeathBenefitTypeormEntity,
    (entity) => entity.deathBenefitPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefit?: DeathBenefitTypeormEntity | null;

  @OneToMany(
    () => DeathBenefitPeriodDocumentTypeormEntity,
    (entity) => entity.deathBenefitPeriod,
  )
  public deathBenefitPeriodDocument?: DeathBenefitPeriodDocumentTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.deathBenefitPeriod,
  )
  public deathBenefitPeriodEarningsHistory?: DeathBenefitPeriodEarningsHistoryTypeormEntity[] | undefined;

  protected override readonly _type = DeathBenefitPeriodTypeormEntity.name;
}
