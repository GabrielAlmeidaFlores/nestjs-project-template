import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';

import type { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document/enum/temporary-disability-benefits-terminated-disability-analysis-document-type.enum';

@Entity({ name: 'temp_disability_benefits_terminated_disability_analysis_doc' })
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public fileName: string;

  @Column({ name: 'type', type: 'varchar', length: 100 })
  public type: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeEnum;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.documents,
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_disability_analysis_id',
  })
  public temporaryDisabilityBenefitsTerminatedDisabilityAnalysis?: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity.name;
}
