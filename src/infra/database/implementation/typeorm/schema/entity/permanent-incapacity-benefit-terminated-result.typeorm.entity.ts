import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';

@Entity({ name: 'permanent_incapacity_benefit_terminated_result' })
export class PermanentIncapacityBenefitTerminatedResultTypeormEntity extends BaseTypeormEntity {
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
    () => PermanentIncapacityBenefitTerminatedTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminatedResult,
  )
  public permanentIncapacityBenefitTerminated?: PermanentIncapacityBenefitTerminatedTypeormEntity;

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedResultTypeormEntity.name;
}
