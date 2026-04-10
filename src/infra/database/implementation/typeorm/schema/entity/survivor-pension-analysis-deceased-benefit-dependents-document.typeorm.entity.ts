import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';

@Entity({
  name: 'survivor_pension_analysis_deceased_benefit_dependents_document',
})
export class SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document_type', type: 'varchar', length: 255 })
  public documentType: string;

  @Column({ name: 'document_name', type: 'varchar', length: 500 })
  public documentName: string;

  @ManyToOne(
    () => SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'deceased_benefit_dependents_id',
  })
  public deceasedBenefitDependents?:
    | SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity.name;
}
