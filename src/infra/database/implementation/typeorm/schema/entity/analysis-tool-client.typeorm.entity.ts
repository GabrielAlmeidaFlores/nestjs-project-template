import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { AnalysisToolClientInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-inss-benefit.typeorm.entity';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';

@Entity({ name: 'analysis_tool_client' })
export class AnalysisToolClientTypeormEntity extends BaseTypeormEntity {
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
    nullable: true,
  })
  public email: string | null;

  @Column({
    name: 'corporate_email',
    type: 'varchar',
    length: 100,
    transformer: CryptographyTransformer,
    nullable: true,
  })
  public corporateEmail: string | null;

  @Column({
    name: 'inssPassword',
    type: 'varchar',
    length: 100,
    transformer: CryptographyTransformer,
    nullable: true,
  })
  public inssPassword: string | null;

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
    transformer: DateTransformer,
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
    enum: AnalysisToolClientTypeEnum,
    nullable: true,
  })
  public clientType: AnalysisToolClientTypeEnum | null;

  @OneToMany(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.analysisToolClient,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity[] | undefined;

  @OneToMany(
    () => LegalPleadingTypeormEntity,
    (entity) => entity.analysisToolClient,
  )
  public legalPleading?: LegalPleadingTypeormEntity[] | undefined;

  @OneToMany(
    () => AnalysisToolClientInssBenefitTypeormEntity,
    (entity) => entity.analysisToolClient,
  )
  public analysisToolClientInssBenefit?:
    | AnalysisToolClientInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AnalysisToolClientLegalProceedingTypeormEntity,
    (entity) => entity.analysisToolClient,
  )
  public analysisToolClientLegalProceeding?:
    | AnalysisToolClientLegalProceedingTypeormEntity[]
    | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = AnalysisToolClientTypeormEntity.name;
}
