import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'retirement_planning_rgps_result' })
export class RetirementPlanningRgpsResultTypeormEntity extends BaseTypeormEntity {
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

  @OneToOne(
    () => RetirementPlanningRgpsTypeormEntity,
    (entity) => entity.retirementPlanningRgpsResult,
  )
  public retirementPlanningRgps?:
    | RetirementPlanningRgpsTypeormEntity
    | undefined;

  @Column({
    name: 'compare_cnis_ctps',
    type: 'longtext',
    nullable: true,
  })
  public compareCnisCtps: string | null;

  @Column({
    name: 'compare_cnis_ctps_raw',
    type: 'longtext',
    nullable: true,
  })
  public compareCnisCtpsRaw: string | null;

  @Column({
    name: 'result',
    type: 'longtext',
    nullable: true,
  })
  public result: string | null;

  protected override readonly _type =
    RetirementPlanningRgpsResultTypeormEntity.name;
}
