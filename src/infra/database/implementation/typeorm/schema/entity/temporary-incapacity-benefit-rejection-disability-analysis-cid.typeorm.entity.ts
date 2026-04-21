import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';

@Entity({
  name: 'temporary_incapacity_benefit_rejection_disability_analysis_cid',
})
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid_ten_id', type: 'varchar', length: 50 })
  public cidTenId: string;

  @ManyToOne(
    () => TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
    (entity) => entity.cids,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_rejection_disability_analysis_id',
  })
  public disabilityAnalysis?: TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity.name;
}
