import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { JudicialCaseAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-benefit.typeorm.entity';
import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { JudicialCaseAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-legal-proceeding.typeorm.entity';
import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'judicial_case_analysis' })
export class JudicialCaseAnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => JudicialCaseAnalysisResultTypeormEntity,
    (entity) => entity.judicialCaseAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'judicial_case_analysis_result_id' })
  public judicialCaseAnalysisResult?:
    | JudicialCaseAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => JudicialCaseAnalysisBenefitTypeormEntity,
    (entity) => entity.judicialCaseAnalysis,
  )
  public judicialCaseAnalysisBenefit?:
    | JudicialCaseAnalysisBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => JudicialCaseAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.judicialCaseAnalysis,
  )
  public judicialCaseAnalysisLegalProceeding?:
    | JudicialCaseAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => JudicialCaseAnalysisDocumentTypeormEntity,
    (entity) => entity.judicialCaseAnalysis,
  )
  public judicialCaseAnalysisDocument?:
    | JudicialCaseAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.judicialCaseAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'created_by_id' })
  public createdBy?: OrganizationMemberTypeormEntity | undefined;

  @ManyToOne(() => OrganizationMemberTypeormEntity)
  @JoinColumn({ name: 'updated_by_id' })
  public updatedBy?: OrganizationMemberTypeormEntity | undefined;

  protected override readonly _type = JudicialCaseAnalysisTypeormEntity.name;
}
