import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';

@Entity({ name: 'death_benefit_legal_representative' })
export class DeathBenefitLegalRepresentativeTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public cpf: string | null;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date | null;

  @Column({ name: 'legal_representative_relationship', type: 'varchar', length: 255, nullable: true })
  public legalRepresentativeRelationship: string | null;

  @Column({ name: 'is_minor_under_guardianship', type: 'boolean', nullable: true })
  public isMinorUnderGuardianship: boolean | null;

  @ManyToOne(
    () => DeathBenefitTypeormEntity,
    (entity) => entity.deathBenefitLegalRepresentative,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefit?: DeathBenefitTypeormEntity | null;

  protected override readonly _type = DeathBenefitLegalRepresentativeTypeormEntity.name;
}
