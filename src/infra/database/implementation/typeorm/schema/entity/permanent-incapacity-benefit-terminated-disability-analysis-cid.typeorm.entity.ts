import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';

@Entity({
  name: 'permanent_incapacity_benefit_terminated_disability_analysis_cid',
})
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid_ten_id', type: 'varchar', length: 50 })
  public cidTenId: string;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.cids,
  )
  @JoinColumn({
    name: 'permanent_incapacity_benefit_terminated_disability_analysis_id',
  })
  public permanentIncapacityBenefitTerminatedDisabilityAnalysis?: PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity.name;
}
