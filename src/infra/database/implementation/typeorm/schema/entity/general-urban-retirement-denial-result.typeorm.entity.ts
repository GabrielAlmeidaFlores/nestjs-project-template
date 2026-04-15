import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';

@Entity({ name: 'general_urban_retirement_denial_result' })
export class GeneralUrbanRetirementDenialResultTypeormEntity extends BaseTypeormEntity {
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

  @OneToOne(
    () => GeneralUrbanRetirementDenialTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialResult,
  )
  public generalUrbanRetirementDenial?: GeneralUrbanRetirementDenialTypeormEntity;

  protected override readonly _type =
    GeneralUrbanRetirementDenialResultTypeormEntity.name;
}
