import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/enum/rural-or-hybrid-retirement-analysis-document-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_document' })
export class RuralOrHybridRetirementAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisDocumentTypeEnum,
    nullable: true,
  })
  public type: RuralOrHybridRetirementAnalysisDocumentTypeEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisDocument,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_id' })
  public ruralOrHybridRetirementAnalysis?:
    | RuralOrHybridRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisDocumentTypeormEntity.name;
}
