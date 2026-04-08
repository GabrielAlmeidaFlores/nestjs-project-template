import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';

@Entity({ name: 'temporary_disability_benefits_grant_result' })
export class TemporaryDisabilityBenefitsGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysis: string | null;

  @Column({
    name: 'simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public simplifiedAnalysis: string | null;

  @Column({
    name: 'first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public firstAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @OneToOne(
    () => TemporaryDisabilityBenefitsGrantTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantResult,
  )
  public temporaryDisabilityBenefitsGrant?:
    | TemporaryDisabilityBenefitsGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantResultTypeormEntity.name;
}
