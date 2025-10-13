import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';

@Entity({ name: 'analysis_tool_record' })
export class AnalysisToolRecordTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  public code: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AnalysisToolRecordTypeEnum,
  })
  public type: AnalysisToolRecordTypeEnum;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.analysisToolRecord,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_id' })
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | null;

  protected override readonly _type = AnalysisToolRecordTypeormEntity.name;
}
