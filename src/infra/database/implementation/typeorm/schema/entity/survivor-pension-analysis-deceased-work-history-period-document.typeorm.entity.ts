import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-work-history-period.typeorm.entity';

@Entity({
  name: 'spa_deceased_work_history_period_document',
})
export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document_type', type: 'varchar', length: 255 })
  public documentType: string;

  @Column({ name: 'document_name', type: 'varchar', length: 500 })
  public documentName: string;

  @ManyToOne(
    () => SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'deceased_work_history_period_id',
  })
  public deceasedWorkHistoryPeriod?:
    | SurvivorPensionAnalysisDeceasedWorkHistoryPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentTypeormEntity.name;
}
