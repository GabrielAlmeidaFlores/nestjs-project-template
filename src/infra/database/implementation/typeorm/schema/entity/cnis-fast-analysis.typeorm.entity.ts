import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-inss-benefit.typeorm.entity';
import { CnisFastAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';

@Entity({ name: 'cnis_fast_analysis' })
export class CnisFastAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @OneToOne(
    () => CnisFastAnalysisResultTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'cnis_fast_analysis_result_id' })
  public cnisFastAnalysisResult?:
    | CnisFastAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => CnisFastAnalysisInssBenefitTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  public cnisFastAnalysisInssBenefit?:
    | CnisFastAnalysisInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => CnisFastAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
  )
  public cnisFastAnalysisLegalProceeding?:
    | CnisFastAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.cnisFastAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  protected override readonly _type = CnisFastAnalysisTypeormEntity.name;
}
