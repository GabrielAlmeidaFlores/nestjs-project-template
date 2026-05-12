import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_grant_technical_diagnosis' })
export class SpecialRetirementGrantTechnicalDiagnosisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'period_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public periodStartDate: Date;

  @Column({
    name: 'period_end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public periodEndDate: Date;

  @Column({
    name: 'recognized',
    type: 'boolean',
  })
  public recognized: boolean;

  @Column({
    name: 'justification',
    type: 'varchar',
    length: 1000,
  })
  public justification: string;

  @Column({
    name: 'company',
    type: 'varchar',
    length: 255,
  })
  public company: string;

  @Column({
    name: 'cnpj',
    type: 'varchar',
    length: 20,
  })
  public cnpj: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 255,
  })
  public role: string;

  @Column({
    name: 'supporting_document',
    type: 'varchar',
    length: 255,
  })
  public supportingDocument: string;

  @Column({
    name: 'recorded_in_cnis',
    type: 'boolean',
  })
  public recordedInCnis: boolean;

  @Column({
    name: 'remuneration_recorded_in_cnis',
    type: 'boolean',
  })
  public remunerationRecordedInCnis: boolean;

  @Column({
    name: 'hazardous_agents',
    type: 'varchar',
    length: 2000,
  })
  public hazardousAgents: string;

  @Column({
    name: 'information_source',
    type: 'varchar',
    length: 255,
  })
  public informationSource: string;

  @Column({
    name: 'legal_framework',
    type: 'varchar',
    length: 2000,
  })
  public legalFramework: string;

  @Column({
    name: 'epi_eficaz',
    type: 'boolean',
    nullable: true,
  })
  public epiEficaz: boolean | null;

  @Column({
    name: 'observations',
    type: 'varchar',
    length: 2000,
    nullable: true,
  })
  public observations: string | null;

  @ManyToOne(
    () => SpecialRetirementGrantTypeormEntity,
    (entity) => entity.specialRetirementGrantTechnicalDiagnosis,
  )
  @JoinColumn({ name: 'special_retirement_grant_id' })
  public specialRetirementGrant?: SpecialRetirementGrantTypeormEntity;

  protected override readonly _type =
    SpecialRetirementGrantTechnicalDiagnosisTypeormEntity.name;
}
