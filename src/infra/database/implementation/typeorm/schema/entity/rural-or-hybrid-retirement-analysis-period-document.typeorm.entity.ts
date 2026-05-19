import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/enum/rural-or-hybrid-retirement-analysis-period-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_period_document' })
export class RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementAnalysisPeriodDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisPeriodDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_period_id' })
  public ruralOrHybridRetirementAnalysisPeriod?:
    | RuralOrHybridRetirementAnalysisPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodDocumentTypeormEntity.name;
}
