import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';

@Entity({ name: 'special_retirement_grant' })
export class SpecialRetirementGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  public name: string;

  @Column({
    name: 'special_activity',
    type: 'boolean',
    default: false,
  })
  public specialActivity: boolean;

  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
  })
  public cnisDocument: string;

  @OneToMany(
    () => SpecialRetirementGrantDocumentTypeormEntity,
    (entity) => entity.specialRetirementGrant,
  )
  public specialRetirementGrantDocument?:
    | SpecialRetirementGrantDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantBenefitTypeormEntity,
    (entity) => entity.specialRetirementGrant,
  )
  public specialRetirementGrantBenefit?:
    | SpecialRetirementGrantBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialRetirementGrantLegalProceedingTypeormEntity,
    (entity) => entity.specialRetirementGrant,
  )
  public specialRetirementGrantLegalProceeding?:
    | SpecialRetirementGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => SpecialRetirementGrantResultTypeormEntity,
    (entity) => entity.specialRetirementGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_grant_result_id' })
  public specialRetirementGrantResult?:
    | SpecialRetirementGrantResultTypeormEntity
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.specialRetirementGrant,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = SpecialRetirementGrantTypeormEntity.name;
}
