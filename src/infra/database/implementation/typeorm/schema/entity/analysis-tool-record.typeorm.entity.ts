import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';

@Entity({ name: 'analysis_tool_record' })
export class AnalysisToolRecordTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  public code: string;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | null;

  @OneToOne(
    () => LegalPleadingTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'legal_pleading_id' })
  public legalPleading?: LegalPleadingTypeormEntity | null;

  protected override readonly _type = AnalysisToolRecordTypeormEntity.name;
}
