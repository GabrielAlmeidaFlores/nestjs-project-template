import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';

@Entity({ name: 'retirement_permanent_disability_rejection_result' })
export class RetirementPermanentDisabilityRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_decision_analysis', type: 'longtext', nullable: true })
  public inssDecisionAnalysis: string | null;

  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRejectionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionResult,
  )
  public retirementPermanentDisabilityRejection?: RetirementPermanentDisabilityRejectionTypeormEntity;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionResultTypeormEntity.name;
}
