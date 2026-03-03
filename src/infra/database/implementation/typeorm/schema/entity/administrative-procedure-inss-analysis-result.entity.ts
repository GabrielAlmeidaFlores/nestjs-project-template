import { Column, Entity, OneToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'administrative_procedure_inss_analysis_result' })
export class AdministrativeProcedureInssAnalysisResultTypeormEntity extends BaseTypeormEntity {
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
    name: 'administrative_procedure_inss_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public administrativeProcedureInssCompleteAnalysis: string | null;

  @Column({
    name: 'administrative_procedure_inss_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public administrativeProcedureInssSimplifiedAnalysis: string | null;

  @OneToOne(
    () => AdministrativeProcedureInssAnalysisTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysisResult,
  )
  public administrativeProcedureInssAnalysis?:
    | AdministrativeProcedureInssAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    AdministrativeProcedureInssAnalysisResultTypeormEntity.name;
}
