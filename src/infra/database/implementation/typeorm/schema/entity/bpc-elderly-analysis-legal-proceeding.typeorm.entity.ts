import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';

@Entity({ name: 'bpc_elderly_analysis_legal_proceeding' })
export class BpcElderlyAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => BpcElderlyAnalysisTypeormEntity,
    (entity) => entity.bpcElderlyAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'bpc_elderly_analysis_id' })
  public bpcElderlyAnalysis: BpcElderlyAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyAnalysisLegalProceedingTypeormEntity.name;
}
