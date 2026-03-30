import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';
import { DisabilityRetirementPlanningGrantDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/enum/disability-retirement-planning-grant-disability-degree.enum';
import { DisabilityRetirementPlanningGrantPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-consideration.enum';
import { DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/enum/disability-retirement-planning-grant-period-pendency-reason.enum';

@Entity({ name: 'disability_retirement_planning_grant_period' })
export class DisabilityRetirementPlanningGrantPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public endDate: Date | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantCategoryEnum,
  })
  public category: DisabilityRetirementPlanningGrantCategoryEnum;

  @Column({
    name: 'is_pendency',
    type: 'boolean',
  })
  public isPendency: boolean;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
  })
  public competenceBelowTheMinimum: boolean;

  @Column({
    name: 'pendency_reason',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum,
    nullable: true,
  })
  public pendencyReason: DisabilityRetirementPlanningGrantPeriodPendencyReasonEnum | null;

  @Column({
    name: 'type_of_contribution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public typeOfContribution: string | null;

  @Column({
    name: 'status',
    type: 'boolean',
  })
  public status: boolean;

  @Column({
    name: 'disability_status',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantDisabilityDegreeEnum,
    nullable: true,
  })
  public disabilityStatus: DisabilityRetirementPlanningGrantDisabilityDegreeEnum | null;

  @Column({
    name: 'period_consideration',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantPeriodConsiderationEnum,
    nullable: true,
  })
  public periodConsideration: DisabilityRetirementPlanningGrantPeriodConsiderationEnum | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'bond_origin',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public bondOrigin: string | null;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantPeriod,
  )
  public disabilityRetirementPlanningGrantPeriodDocument?:
    | DisabilityRetirementPlanningGrantPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantPeriodTypeormEntity.name;
}
