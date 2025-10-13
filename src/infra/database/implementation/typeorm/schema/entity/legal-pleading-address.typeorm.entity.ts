import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';

@Entity({ name: 'legal_pleading_address' })
export class LegalPleadingAddressTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 100,
    transformer: CryptographyTransformer,
  })
  public postalCode: string;

  @Column({
    name: 'state_code',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
  })
  public stateCode: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public city: string;

  @Column({
    name: 'neighborhood',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public neighborhood: string;

  @Column({
    name: 'street',
    type: 'varchar',
    length: 255,
    transformer: CryptographyTransformer,
  })
  public street: string;

  @Column({
    name: 'address_number',
    type: 'varchar',
    length: 100,
    transformer: CryptographyTransformer,
  })
  public addressNumber: string;

  @OneToOne(
    () => LegalPleadingTypeormEntity,
    (entity) => entity.legalPleadingAddress,
  )
  public legalPleading?: LegalPleadingTypeormEntity | undefined;

  protected override readonly _type = LegalPleadingAddressTypeormEntity.name;
}
