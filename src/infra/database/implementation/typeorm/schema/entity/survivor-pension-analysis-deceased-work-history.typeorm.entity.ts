import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { SurvivorPensionAnalysisDeceasedWorkHistoryRemunerationType } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity.props.interface';

@Entity({ name: 'spa_deceased_work_history' })
export class SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity extends BaseTypeormEntity {
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
    name: 'remunerations',
    type: 'json',
    nullable: true,
  })
  public remunerations:
    | SurvivorPensionAnalysisDeceasedWorkHistoryRemunerationType[]
    | null;

  @OneToOne(
    () => SurvivorPensionAnalysisTypeormEntity,
    (entity) => entity.deceasedWorkHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'survivor_pension_analysis_id' })
  public survivorPensionAnalysis?:
    | SurvivorPensionAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    (entity) => entity.deceasedWorkHistory,
  )
  public periods?:
    | SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryTypeormEntity.name;
}
