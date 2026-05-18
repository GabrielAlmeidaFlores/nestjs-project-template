import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';

@Entity({ name: 'temporary_incapacity_benefit_rejection_result' })
export class TemporaryIncapacityBenefitRejectionResultTypeormEntity extends BaseTypeormEntity {
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
    () => TemporaryIncapacityBenefitRejectionTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejectionResult,
  )
  public temporaryIncapacityBenefitRejection?: TemporaryIncapacityBenefitRejectionTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionResultTypeormEntity.name;
}
