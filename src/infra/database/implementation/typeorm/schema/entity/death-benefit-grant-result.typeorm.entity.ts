import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';

@Entity({ name: 'death_benefit_result' })
export class DeathBenefitGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public deathBenefitGrantFirstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public deathBenefitGrantCompleteAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public deathBenefitGrantSimplifiedAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public deathBenefitGrantCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => DeathBenefitGrantTypeormEntity,
    (entity) => entity.deathBenefitGrantResult,
  )
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | undefined;

  protected override readonly _type = DeathBenefitGrantResultTypeormEntity.name;
}
