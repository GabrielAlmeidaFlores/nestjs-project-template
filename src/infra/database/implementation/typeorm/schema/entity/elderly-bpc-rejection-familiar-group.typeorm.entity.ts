import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-familiar-group-document.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-income-type.enum';
import { ElderlyBpcRejectionFamiliarGroupKinshipEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/enum/elderly-bpc-rejection-familiar-group-kinship.enum';

@Entity({ name: 'elderly_bpc_rejection_familiar_group' })
export class ElderlyBpcRejectionFamiliarGroupTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public fullName: string | null;

  @Column({
    name: 'birth_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public birthDate: Date | null;

  @Column({
    name: 'kinship',
    type: 'simple-enum',
    enum: ElderlyBpcRejectionFamiliarGroupKinshipEnum,
    nullable: true,
  })
  public kinship: ElderlyBpcRejectionFamiliarGroupKinshipEnum | null;

  @Column({
    name: 'lives_in_same_residence',
    type: 'boolean',
    nullable: true,
  })
  public livesInSameResidence: boolean | null;

  @Column({ name: 'has_income', type: 'boolean', nullable: true })
  public hasIncome: boolean | null;

  @Column({
    name: 'monthly_income',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public monthlyIncome: string | null;

  @Column({
    name: 'income_type',
    type: 'simple-enum',
    enum: ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum,
    nullable: true,
  })
  public incomeType: ElderlyBpcRejectionFamiliarGroupIncomeTypeEnum | null;

  @Column({
    name: 'has_supporting_documents',
    type: 'boolean',
    nullable: true,
  })
  public hasSupportingDocuments: boolean | null;

  @ManyToOne(
    () => ElderlyBpcRejectionTypeormEntity,
    (entity) => entity.elderlyBpcRejectionFamiliarGroup,
  )
  @JoinColumn({ name: 'elderly_bpc_rejection_id' })
  public elderlyBpcRejection?: ElderlyBpcRejectionTypeormEntity | undefined;

  @OneToMany(
    () => ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity,
    (entity) => entity.elderlyBpcRejectionFamiliarGroup,
  )
  public elderlyBpcRejectionFamiliarGroupDocument?:
    | ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    ElderlyBpcRejectionFamiliarGroupTypeormEntity.name;
}
