import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-family-member-document.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { BpcDisabilityTerminationFamilyMemberIncomeTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-income-type.enum';
import { BpcDisabilityTerminationFamilyMemberKinshipEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-family-member/enum/bpc-disability-termination-family-member-kinship.enum';

@Entity({ name: 'bpc_disability_termination_family_member' })
export class BpcDisabilityTerminationFamilyMemberTypeormEntity extends BaseTypeormEntity {
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
    enum: BpcDisabilityTerminationFamilyMemberKinshipEnum,
  })
  public kinship: BpcDisabilityTerminationFamilyMemberKinshipEnum;

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
    enum: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: BpcDisabilityTerminationFamilyMemberIncomeTypeEnum | null;

  @Column({ name: 'has_expense_proofs', type: 'boolean', nullable: true })
  public hasExpenseProofs: boolean | null;

  @ManyToOne(() => BpcDisabilityTerminationTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_id' })
  public bpcDisabilityTermination?:
    | BpcDisabilityTerminationTypeormEntity
    | undefined;

  @OneToMany(
    () => BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity,
    (entity) => entity.bpcDisabilityTerminationFamilyMember,
  )
  public bpcDisabilityTerminationFamilyMemberDocument?:
    | BpcDisabilityTerminationFamilyMemberDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationFamilyMemberTypeormEntity.name;
}
