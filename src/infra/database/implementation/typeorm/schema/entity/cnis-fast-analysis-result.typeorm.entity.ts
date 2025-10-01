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
  })
  public clientName: string;

  @Column({
    name: 'client_federal_document',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public clientFederalDocument: string;

  @Column({
    name: 'client_birth_date',
    type: 'date',
  })
  public clientBirthDate: Date;

  @Column({
    name: 'client_last_affiliation_date',
    type: 'date',
  })
  public clientLastAffiliationDate: Date;

  @Column({
    name: 'cnis_ai_analysis',
    type: 'text',
  })
  public cnisAiAnalysis: string;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.cnisFastAnalysisResult,
  )
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | undefined;

  protected override readonly _type = CnisFastAnalysisResultTypeormEntity.name;
}
