import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';

@Entity({
  name: 'temporary_incapacity_benefit_termination_disability_analysis_cid',
})
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid_ten_id', type: 'varchar', length: 50 })
  public cidTenId: string;

  @ManyToOne(
    () => TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
    (entity) => entity.cids,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_termination_disability_analysis_id',
  })
  public temporaryIncapacityBenefitTerminationDisabilityAnalysis?: TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity.name;
}
