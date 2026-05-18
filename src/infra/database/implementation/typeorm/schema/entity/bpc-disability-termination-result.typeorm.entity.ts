import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';

@Entity({ name: 'bpc_disability_termination_result' })
export class BpcDisabilityTerminationResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_decision_analysis', type: 'text', nullable: true })
  public inssDecisionAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(() => BpcDisabilityTerminationTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_id' })
  public bpcDisabilityTermination?:
    | BpcDisabilityTerminationTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationResultTypeormEntity.name;
}
