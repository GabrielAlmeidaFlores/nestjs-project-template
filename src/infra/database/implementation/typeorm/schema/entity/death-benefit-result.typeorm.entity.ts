import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';

@Entity({ name: 'death_benefit_result' })
export class DeathBenefitResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public deathBenefitFirstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public deathBenefitCompleteAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public deathBenefitSimplifiedAnalysis: string | null;

  @Column({ name: 'complete_analysis_download', type: 'longtext', nullable: true })
  public deathBenefitCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => DeathBenefitTypeormEntity,
    (entity) => entity.deathBenefitResult,
  )
  public deathBenefit?: DeathBenefitTypeormEntity | undefined;

  protected override readonly _type = DeathBenefitResultTypeormEntity.name;
}
