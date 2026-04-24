import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { AccidentAssistanceTerminatedPeriodReasonPendencyEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/enum/accident-assistance-terminated-period-reason-pendency.enum';

@Entity({ name: 'accident_assistance_terminated_period' })
export class AccidentAssistanceTerminatedPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'sequencial',
    type: 'int',
    nullable: true,
  })
  public sequencial: number | null;

  @Column({
    name: 'period_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public periodName: string | null;

  @Column({
    name: 'period_start',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodStart: Date | null;

  @Column({
    name: 'period_end',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodEnd: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'is_pendency',
    type: 'boolean',
    nullable: true,
  })
  public isPendency: boolean | null;

  @Column({
    name: 'reason_pendency',
    type: 'simple-enum',
    enum: AccidentAssistanceTerminatedPeriodReasonPendencyEnum,
    nullable: true,
  })
  public reasonPendency: AccidentAssistanceTerminatedPeriodReasonPendencyEnum | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'type_of_contribution',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public typeOfContribution: string | null;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: true,
  })
  public status: boolean | null;

  @ManyToOne(
    () => AccidentAssistanceTerminatedTypeormEntity,
    (entity) => entity.accidentAssistanceTerminatedPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_assistance_terminated_id' })
  public accidentAssistanceTerminated?: AccidentAssistanceTerminatedTypeormEntity | null;

  protected override readonly _type =
    AccidentAssistanceTerminatedPeriodTypeormEntity.name;
}
