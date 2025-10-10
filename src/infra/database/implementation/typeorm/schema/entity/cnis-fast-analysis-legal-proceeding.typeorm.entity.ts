import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis_legal_proceeding' })
export class CnisFastAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'bigint',
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.cnisFastAnalysisInssBenefit,
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis: CnisFastAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    CnisFastAnalysisLegalProceedingTypeormEntity.name;
}
