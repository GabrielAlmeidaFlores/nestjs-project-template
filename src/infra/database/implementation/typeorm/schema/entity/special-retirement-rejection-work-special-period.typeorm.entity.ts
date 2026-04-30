import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-special-period-legal-framework.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_rejection_work_special_period' })
export class SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity extends BaseTypeormEntity {
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
    name: 'harmful_agents',
    type: 'simple-array',
    nullable: true,
  })
  public harmfulAgents: string[] | null;

  @Column({
    name: 'other_agents',
    type: 'longtext',
    nullable: true,
  })
  public otherAgents: string | null;

  @Column({
    name: 'company_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public companyName: string | null;

  @Column({
    name: 'company_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public companyDocument: string | null;

  @ManyToOne(
    () => SpecialRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkSpecialPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_work_period_id' })
  public specialRetirementRejectionWorkPeriod?: SpecialRetirementRejectionWorkPeriodTypeormEntity | null;

  @OneToMany(
    () =>
      SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkSpecialPeriod,
  )
  public specialRetirementRejectionWorkSpecialPeriodLegalFramework?:
    | SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialRetirementRejectionWorkSpecialPeriodTypeormEntity.name;
}
