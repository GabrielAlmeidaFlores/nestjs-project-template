import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-document.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-familiar-group.typeorm.entity';
import { ElderlyBpcRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-inss-benefit.typeorm.entity';
import { ElderlyBpcRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-legal-proceeding.typeorm.entity';
import { ElderlyBpcRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-result.typeorm.entity';
import { ElderlyBpcRejectionCategoryEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-category.enum';
import { ElderlyBpcRejectionMaritalStatusEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/enum/elderly-bpc-rejection-marital-status.enum';

@Entity({ name: 'elderly_bpc_rejection' })
export class ElderlyBpcRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: ElderlyBpcRejectionCategoryEnum,
    nullable: true,
  })
  public category: ElderlyBpcRejectionCategoryEnum | null;

  @Column({
    name: 'marital_status',
    type: 'simple-enum',
    enum: ElderlyBpcRejectionMaritalStatusEnum,
    nullable: true,
  })
  public maritalStatus: ElderlyBpcRejectionMaritalStatusEnum | null;

  @Column({ name: 'applicant_lives_alone', type: 'boolean', nullable: true })
  public applicantLivesAlone: boolean | null;

  @OneToOne(
    () => ElderlyBpcRejectionResultTypeormEntity,
    (entity) => entity.elderlyBpcRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'elderly_bpc_rejection_result_id' })
  public elderlyBpcRejectionResult?:
    | ElderlyBpcRejectionResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => ElderlyBpcRejectionDocumentTypeormEntity,
    (entity) => entity.elderlyBpcRejection,
  )
  public elderlyBpcRejectionDocument?:
    | ElderlyBpcRejectionDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => ElderlyBpcRejectionInssBenefitTypeormEntity,
    (entity) => entity.elderlyBpcRejection,
  )
  public elderlyBpcRejectionInssBenefit?:
    | ElderlyBpcRejectionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => ElderlyBpcRejectionLegalProceedingTypeormEntity,
    (entity) => entity.elderlyBpcRejection,
  )
  public elderlyBpcRejectionLegalProceeding?:
    | ElderlyBpcRejectionLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => ElderlyBpcRejectionFamiliarGroupTypeormEntity,
    (entity) => entity.elderlyBpcRejection,
  )
  public elderlyBpcRejectionFamiliarGroup?:
    | ElderlyBpcRejectionFamiliarGroupTypeormEntity[]
    | undefined;

  protected override readonly _type = ElderlyBpcRejectionTypeormEntity.name;
}
