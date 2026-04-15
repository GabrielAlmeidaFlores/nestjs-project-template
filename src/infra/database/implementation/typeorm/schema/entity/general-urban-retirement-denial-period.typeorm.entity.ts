import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-document.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period-earnings-history.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';

@Entity({ name: 'general_urban_retirement_denial_period' })
export class GeneralUrbanRetirementDenialPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialPeriodCategoryEnum,
    nullable: true,
  })
  public category: GeneralUrbanRetirementDenialPeriodCategoryEnum | null;

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
    enum: GeneralUrbanRetirementDenialPeriodWorkTypeEnum,
  })
  public workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;

  @Column({ name: 'impact_months', type: 'int', nullable: true })
  public impactMonths: number | null;

  @Column({ name: 'grace_months', type: 'int', nullable: true })
  public graceMonths: number | null;

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
    enum: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: GeneralUrbanRetirementDenialPeriodPendencyReasonEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: GeneralUrbanRetirementDenialPeriodConsiderationEnum | null;

  @Column({
    name: 'wants_to_complement_via_meu_inss',
    type: 'boolean',
    nullable: true,
  })
  public wantsToComplementViaMeuINSS: boolean | null;

  @Column({ name: 'status', type: 'boolean' })
  public status: boolean;

  @ManyToOne(
    () => GeneralUrbanRetirementDenialTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_id' })
  public generalUrbanRetirementDenial?: GeneralUrbanRetirementDenialTypeormEntity | null;

  @OneToMany(
    () => GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialPeriod,
  )
  public generalUrbanRetirementDenialPeriodDocument?: GeneralUrbanRetirementDenialPeriodDocumentTypeormEntity[];

  @OneToMany(
    () => GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialPeriod,
  )
  public generalUrbanRetirementDenialPeriodEarningsHistory?: GeneralUrbanRetirementDenialPeriodEarningsHistoryTypeormEntity[];

  protected override readonly _type =
    GeneralUrbanRetirementDenialPeriodTypeormEntity.name;
}
