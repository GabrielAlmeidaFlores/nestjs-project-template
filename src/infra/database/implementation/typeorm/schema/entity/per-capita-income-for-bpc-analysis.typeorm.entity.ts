import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-benefit.entity';
import { PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-document.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-family-member.typeorm.entity';
import { PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-legal-proceeding.entity';
import { PerCapitaIncomeForBpcAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/per-capita-income-for-bpc-analysis-result.typeorm.entity';

@Entity({ name: 'per_capita_income_for_bpc_analysis' })
export class PerCapitaIncomeForBpcAnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => PerCapitaIncomeForBpcAnalysisResultTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysis,
    { nullable: true },
  )
  public perCapitaIncomeForBpcAnalysisResult?:
    | PerCapitaIncomeForBpcAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysis,
  )
  public perCapitaIncomeForBpcAnalysisFamilyMember?:
    | PerCapitaIncomeForBpcAnalysisFamilyMemberTypeormEntity[]
    | undefined;

  @OneToMany(
    () => PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysis,
  )
  public perCapitaIncomeForBpcAnalysisDocument?:
    | PerCapitaIncomeForBpcAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysis,
  )
  public perCapitaIncomeForBpcAnalysisBenefit?:
    | PerCapitaIncomeForBpcAnalysisBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysis,
  )
  public perCapitaIncomeForBpcAnalysisLegalProceeding?:
    | PerCapitaIncomeForBpcAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.perCapitaIncomeForBpcAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisTypeormEntity.name;
}
