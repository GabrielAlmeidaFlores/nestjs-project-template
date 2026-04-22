import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';

@Entity({ name: 'bpc_elderly_analysis_inss_benefit' })
export class BpcElderlyAnalysisInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => BpcElderlyAnalysisTypeormEntity,
    (entity) => entity.bpcElderlyAnalysisInssBenefit,
  )
  @JoinColumn({ name: 'bpc_elderly_analysis_id' })
  public bpcElderlyAnalysis: BpcElderlyAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyAnalysisInssBenefitTypeormEntity.name;
}
