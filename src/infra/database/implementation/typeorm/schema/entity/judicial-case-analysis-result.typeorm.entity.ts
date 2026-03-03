import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'judicial_case_analysis_result' })
export class JudicialCaseAnalysisResultTypeormEntity extends BaseTypeormEntity {
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
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public clientBirthDate: Date | null;

  @Column({
    name: 'client_last_affiliation_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public clientLastAffiliationDate: Date | null;

  @Column({
    name: 'judicial_case_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public judicialCaseCompleteAnalysis: string | null;

  @Column({
    name: 'judicial_case_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public judicialCaseSimplifiedAnalysis: string | null;

  @OneToOne(
    () => JudicialCaseAnalysisTypeormEntity,
    (entity) => entity.judicialCaseAnalysisResult,
  )
  public judicialCaseAnalysis?: JudicialCaseAnalysisTypeormEntity | undefined;

  protected override readonly _type =
    JudicialCaseAnalysisResultTypeormEntity.name;
}
