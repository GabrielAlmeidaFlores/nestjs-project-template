import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';

@Entity({
  name: 'temporary_disability_benefits_terminated_disability_analysis_cid',
})
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid_ten_id', type: 'varchar', length: 50 })
  public cidTenId: string;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.cids,
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_disability_analysis_id',
  })
  public temporaryDisabilityBenefitsTerminatedDisabilityAnalysis?: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity.name;
}
