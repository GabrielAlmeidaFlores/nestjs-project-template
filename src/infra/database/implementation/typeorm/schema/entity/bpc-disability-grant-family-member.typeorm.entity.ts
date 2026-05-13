import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-family-member-document.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcDisabilityGrantFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-income-type.enum';
import { BpcDisabilityGrantFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-family-member/enum/bpc-disability-grant-family-member-kinship.enum';

@Entity({ name: 'bpc_disability_grant_family_member' })
export class BpcDisabilityGrantFamilyMemberTypeormEntity extends BaseTypeormEntity {
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
    enum: BpcDisabilityGrantFamilyMemberKinshipEnum,
  })
  public kinship: BpcDisabilityGrantFamilyMemberKinshipEnum;

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
    enum: BpcDisabilityGrantFamilyMemberIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: BpcDisabilityGrantFamilyMemberIncomeTypeEnum | null;

  @Column({ name: 'has_expense_proofs', type: 'boolean', nullable: true })
  public hasExpenseProofs: boolean | null;

  @ManyToOne(() => BpcDisabilityGrantTypeormEntity)
  @JoinColumn({ name: '_bpc_disability_grant_id' })
  public BpcDisabilityGrant?: BpcDisabilityGrantTypeormEntity | undefined;

  @OneToMany(
    () => BpcDisabilityGrantFamilyMemberDocumentTypeormEntity,
    (entity) => entity.BpcDisabilityGrantFamilyMember,
  )
  public BpcDisabilityGrantFamilyMemberDocument?:
    | BpcDisabilityGrantFamilyMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    BpcDisabilityGrantFamilyMemberTypeormEntity.name;
}
