import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';

@Entity({ name: 'death_benefit_rejection_result' })
export class DeathBenefitRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_decision_analysis',
    type: 'longtext',
    nullable: true,
  })
  public deathBenefitRejectionInssDecisionAnalysis: string | null;

  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public deathBenefitRejectionFirstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public deathBenefitRejectionCompleteAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public deathBenefitRejectionSimplifiedAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public deathBenefitRejectionCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionResult,
  )
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | undefined;

  protected override readonly _type =
    DeathBenefitRejectionResultTypeormEntity.name;
}
