import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';

@Entity({ name: 'cnis_fast_analysis_result' })
export class CnisFastAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'client_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientName: string | null;

  @Column({
    name: 'client_federal_document',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
    nullable: true,
  })
  public clientFederalDocument: string | null;

  @Column({
    name: 'client_birth_date',
    type: 'date',
    nullable: true,
  })
  public clientBirthDate: Date | null;

  @Column({
    name: 'client_last_affiliation_date',
    type: 'date',
    nullable: true,
  })
  public clientLastAffiliationDate: Date | null;

  @Column({
    name: 'cnis_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public cnisCompleteAnalysis: string | null;

  @Column({
    name: 'cnis_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public cnisSimplifiedAnalysis: string | null;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.cnisFastAnalysisResult,
  )
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | undefined;

  protected override readonly _type = CnisFastAnalysisResultTypeormEntity.name;
}
