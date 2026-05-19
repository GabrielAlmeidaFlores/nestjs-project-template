import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';

import type { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/enum/permanent-incapacity-benefit-terminated-disability-analysis-document-type.enum';

@Entity({
  name: 'perm_incapacity_benefit_terminated_disability_analysis_doc',
})
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'permanent_incapacity_benefit_terminated_disability_analysis_id',
  })
  public permanentIncapacityBenefitTerminatedDisabilityAnalysis?: PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity.name;
}
