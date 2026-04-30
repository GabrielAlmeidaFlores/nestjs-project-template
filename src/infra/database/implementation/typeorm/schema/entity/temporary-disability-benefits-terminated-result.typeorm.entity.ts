import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';

@Entity({ name: 'temporary_disability_benefits_terminated_result' })
export class TemporaryDisabilityBenefitsTerminatedResultTypeormEntity extends BaseTypeormEntity {
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
    () => TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedResult,
  )
  public temporaryDisabilityBenefitsTerminated?: TemporaryDisabilityBenefitsTerminatedTypeormEntity;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedResultTypeormEntity.name;
}
