import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'death_benefit_grant_institutor' })
export class DeathBenefitGrantInstitorTypeormEntity extends BaseTypeormEntity {
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

  @Column({
    name: 'sex',
    type: 'simple-enum',
    enum: GenderEnum,
    nullable: true,
  })
  public sex: GenderEnum | null;

  @Column({
    name: 'death_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public deathDate: Date | null;

  @Column({ name: 'was_retired', type: 'boolean', nullable: true })
  public wasRetired: boolean | null;

  @Column({
    name: 'retirement_benefit_number',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public retirementBenefitNumber: string | null;

  @ManyToOne(
    () => DeathBenefitGrantTypeormEntity,
    (entity) => entity.deathBenefitGrantBenefitInstitutor,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitGrantInstitorTypeormEntity.name;
}
