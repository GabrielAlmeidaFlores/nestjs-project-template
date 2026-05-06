import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/enum/retirement-permanent-disability-revision-disability-analysis-document-type.enum';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from './retirement-permanent-disability-revision-disability-analysis.typeorm.entity';

@Entity({
  name: 'retirement_per_dis_rev_dis_analysis_document',
})
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 500 })
  public fileName: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum,
  })
  public type: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisDocument,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_disability_analysis_id',
  })
  public retirementPermanentDisabilityRevisionDisabilityAnalysis?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity.name;
}
