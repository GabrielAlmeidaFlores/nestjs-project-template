import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/enum/bpc-disability-grant-legal-representative-of-a-minor-kinship.enum';

@Entity({ name: 'bpc_disability_grant_legal_representative_of_a_minor' })
export class BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public federalDocument: string | null;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date | null;

  @Column({ name: 'minor_under_custody', type: 'boolean', nullable: true })
  public minorUnderCustody: boolean | null;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum,
    nullable: true,
  })
  public kinship: BpcDisabilityGrantLegalRepresentativeOfAMinorKinshipEnum | null;

  @OneToOne(
    () => BpcDisabilityGrantTypeormEntity,
    (entity) => entity.BpcDisabilityGrantLegalRepresentativeOfAMinor,
  )
  @JoinColumn({ name: '_bpc_disability_grant_id' })
  public BpcDisabilityGrant: BpcDisabilityGrantTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity.name;
}