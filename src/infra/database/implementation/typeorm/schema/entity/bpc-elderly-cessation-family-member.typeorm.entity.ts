import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyCessationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation-family-member-document.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcElderlyCessationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-income-type.enum';
import { BpcElderlyCessationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-family-member/enum/bpc-elderly-cessation-family-member-kinship.enum';

@Entity({ name: 'bpc_elderly_cessation_family_member' })
export class BpcElderlyCessationFamilyMemberTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  public fullName: string;

  @Column({
    name: 'birth_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public birthDate: Date;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: BpcElderlyCessationFamilyMemberKinshipEnum,
  })
  public kinship: BpcElderlyCessationFamilyMemberKinshipEnum;

  @Column({ name: 'lives_in_same_residence', type: 'boolean' })
  public livesInSameResidence: boolean;

  @Column({ name: 'has_income', type: 'boolean' })
  public hasIncome: boolean;

  @Column({
    name: 'monthly_income_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public monthlyIncomeAmount?: string | null;

  @Column({
    name: 'income_type',
    type: 'simple-enum',
    enum: BpcElderlyCessationFamilyMemberIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: BpcElderlyCessationFamilyMemberIncomeTypeEnum | null;

  @Column({ name: 'has_expense_proofs', type: 'boolean', nullable: true })
  public hasExpenseProofs: boolean | null;

  @ManyToOne(() => BpcElderlyCessationTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_cessation_id' })
  public bpcElderlyCessation?: BpcElderlyCessationTypeormEntity | undefined;

  @OneToMany(
    () => BpcElderlyCessationFamilyMemberDocumentTypeormEntity,
    (entity) => entity.bpcElderlyCessationFamilyMember,
  )
  public bpcElderlyCessationFamilyMemberDocument?:
    | BpcElderlyCessationFamilyMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    BpcElderlyCessationFamilyMemberTypeormEntity.name;
}
