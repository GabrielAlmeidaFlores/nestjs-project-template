import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AdministrativeProcedureInssAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-benefit.entity';
import { AdministrativeProcedureInssAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-document.entity';
import { AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-legal-proceeding.entity';
import { AdministrativeProcedureInssAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis-result.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';

@Entity({ name: 'administrative_procedure_inss_analysis' })
export class AdministrativeProcedureInssAnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => AdministrativeProcedureInssAnalysisResultTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'administrative_procedure_inss_analysis_result_id' })
  public administrativeProcedureInssAnalysisResult?:
    | AdministrativeProcedureInssAnalysisResultTypeormEntity
    | undefined;

  @OneToMany(
    () => AdministrativeProcedureInssAnalysisBenefitTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysis,
  )
  public administrativeProcedureInssAnalysisBenefit?:
    | AdministrativeProcedureInssAnalysisBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysis,
  )
  public administrativeProcedureInssAnalysisLegalProceeding?:
    | AdministrativeProcedureInssAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => AdministrativeProcedureInssAnalysisDocumentTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysis,
  )
  public administrativeProcedureInssAnalysisDocument?:
    | AdministrativeProcedureInssAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.administrativeProcedureInssAnalysis,
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
    AdministrativeProcedureInssAnalysisTypeormEntity.name;
}
