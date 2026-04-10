import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period-document.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'spa_deceased_work_history_period' })
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity extends BaseTypeormEntity {
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
    name: 'special_period_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public specialPeriodStartDate: Date | null;

  @Column({
    name: 'special_period_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public specialPeriodEndDate: Date | null;

  @Column({
    name: 'special_time_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public specialTimeType: string | null;

  @Column({ name: 'job_title', type: 'varchar', length: 255, nullable: true })
  public jobTitle: string | null;

  @Column({ name: 'career_name', type: 'varchar', length: 255, nullable: true })
  public careerName: string | null;

  @Column({
    name: 'service_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public serviceType: string | null;

  @Column({ name: 'department', type: 'varchar', length: 255, nullable: true })
  public department: string | null;

  @ManyToOne(
    () => SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity,
    (entity) => entity.periods,
  )
  @JoinColumn({ name: 'deceased_work_history_id' })
  public deceasedWorkHistory?:
    | SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity
    | undefined;

  @OneToMany(
    () => SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity,
    (entity) => entity.deceasedWorkHistoryPeriod,
  )
  public documents?:
    | SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity.name;
}
