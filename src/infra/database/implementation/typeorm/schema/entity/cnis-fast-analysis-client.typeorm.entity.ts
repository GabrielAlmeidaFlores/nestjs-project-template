import { Column, Entity, OneToOne } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CnisFastAnalysisClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-inss-benefit.typeorm.entity';
import { CnisFastAnalysisClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-client-legal-proceeding.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { QuickCnisAnalysisClientTypeEnum } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/enum/quick-cnis-analysis-client-type.enum';

@Entity({ name: 'cnis_fast_analysis_client' })
export class CnisFastAnalysisClientTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'client_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public name: string | null;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
    nullable: true,
  })
  public federalDocument: string | null;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    transformer: CryptographyTransformer,
  })
  public email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 100,
    nullable: true,
    transformer: CryptographyTransformer,
  })
  public phoneNumber: string | null;

  @Column({
    name: 'birth_date',
    type: 'date',
    nullable: true,
  })
  public birthDate: Date | null;

  @Column({
    name: 'gender',
    type: 'simple-enum',
    enum: GenderEnum,
    nullable: true,
  })
  public gender: GenderEnum | null;

  @Column({
    name: 'client_type',
    type: 'simple-enum',
    enum: QuickCnisAnalysisClientTypeEnum,
    nullable: true,
  })
  public clientType: QuickCnisAnalysisClientTypeEnum | null;

  @OneToOne(
    () => CnisFastAnalysisTypeormEntity,
    (entity) => entity.cnisFastAnalysisClient,
  )
  public cnisFastAnalysis?: CnisFastAnalysisTypeormEntity | undefined;

  @OneToOne(
    () => CnisFastAnalysisClientInssBenefitTypeormEntity,
    (entity) => entity.cnisFastAnalysisClient,
  )
  public cnisFastAnalysisClientInssBenefit?:
    | CnisFastAnalysisClientInssBenefitTypeormEntity
    | undefined;

  @OneToOne(
    () => CnisFastAnalysisClientLegalProceedingTypeormEntity,
    (entity) => entity.cnisFastAnalysisClient,
  )
  public cnisFastAnalysisClientLegalProceeding?:
    | CnisFastAnalysisClientLegalProceedingTypeormEntity
    | undefined;

  protected override readonly _type = CnisFastAnalysisClientTypeormEntity.name;
}
