import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/enum/rural-or-hybrid-retirement-analysis-work-period-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_work_period_document' })
export class RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisWorkPeriodDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_work_period_id' })
  public ruralOrHybridRetirementAnalysisWorkPeriod?:
    | RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity.name;
}
