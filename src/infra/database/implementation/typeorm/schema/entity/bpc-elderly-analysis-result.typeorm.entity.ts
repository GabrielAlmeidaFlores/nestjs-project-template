import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';

@Entity({ name: 'bpc_elderly_analysis_result' })
export class BpcElderlyAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(() => BpcElderlyAnalysisTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_analysis_id' })
  public bpcElderlyAnalysis?: BpcElderlyAnalysisTypeormEntity | undefined;

  protected override readonly _type = BpcElderlyAnalysisResultTypeormEntity.name;
}
