import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AdministrativeProcedureInssAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-procedure-inss-analysis.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { GetRetirementPlanningRgpsWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/result/get-retirement-planning-rgps-with-relations.query.result';
import { GetRetirementPlanningRppsQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/result/get-retirement-planning-rpps.query.resut';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { GetAdministrativeProcedureInssAnalysisQueryResult } from '@module/customer/analysis-tool/module/administrative-procedure-inss-analysis/domain/repository/administrative-procedure-inss-analysis/query/result/get-administrative-procedure-inss-analysis.query.result';
import { GetCnisFastAnalysisQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis.query.result';
import { GetDisabilityAssessmentForBpcAnalysisQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis.query.result';
import { GetJudicialCaseAnalysisQueryResult } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/result/get-judicial-case-analysis.query.result';
import { GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/result/get-medical-and-social-report-objection-generator-analysis.query.result';
import { GetSpecialActivityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/result/get-special-activity-analysis-with-relations.query.result';

@Injectable()
export class GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AnalysisToolRecordTypeormEntity,
    ): GetAnalysisToolRecordWithRelationsQueryResult => {
      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisTypeormEntity,
        GetCnisFastAnalysisQueryResult,
      );

      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        RetirementPlanningRppsTypeormEntity,
        GetRetirementPlanningRppsQueryResult,
      );

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        GetRetirementPlanningRgpsWithRelationsQueryResult,
      );

      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityTypeormEntity,
        GetSpecialActivityAnalysisWithRelationsQueryResult,
      );

      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisTypeormEntity,
        GetJudicialCaseAnalysisQueryResult,
      );

      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        AdministrativeProcedureInssAnalysisTypeormEntity,
        GetAdministrativeProcedureInssAnalysisQueryResult,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
      );

      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
        GetDisabilityAssessmentForBpcAnalysisQueryResult,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        GetAnalysisToolClientWithRelationsQueryResult,
      );

      return GetAnalysisToolRecordWithRelationsQueryResult.build({
        ...source,
        id: new AnalysisToolRecordId(source.id),
        code: new AnalysisToolRecordCode(source.code),
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        specialActivity,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        disabilityAssessmentForBpcAnalysis,
        analysisToolClient,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAnalysisToolRecordWithRelationsQueryResult,
    ): AnalysisToolRecordTypeormEntity => {
      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        GetCnisFastAnalysisQueryResult,
        CnisFastAnalysisTypeormEntity,
      );

      const retirementPlanningRpps = this.mapper.map(
        source.retirementPlanningRpps,
        GetRetirementPlanningRppsQueryResult,
        RetirementPlanningRppsTypeormEntity,
      );

      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        GetRetirementPlanningRgpsWithRelationsQueryResult,
        RetirementPlanningRgpsTypeormEntity,
      );

      const specialActivity = this.mapper.map(
        source.specialActivity,
        GetSpecialActivityAnalysisWithRelationsQueryResult,
        SpecialActivityTypeormEntity,
      );

      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        GetJudicialCaseAnalysisQueryResult,
        JudicialCaseAnalysisTypeormEntity,
      );

      const administrativeProcedureInssAnalysis = this.mapper.map(
        source.administrativeProcedureInssAnalysis,
        GetAdministrativeProcedureInssAnalysisQueryResult,
        AdministrativeProcedureInssAnalysisTypeormEntity,
      );

      const medicalAndSocialReportObjectionGeneratorAnalysis = this.mapper.map(
        source.medicalAndSocialReportObjectionGeneratorAnalysis,
        GetMedicalAndSocialReportObjectionGeneratorAnalysisQueryResult,
        MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
      );

      const disabilityAssessmentForBpcAnalysis = this.mapper.map(
        source.disabilityAssessmentForBpcAnalysis,
        GetDisabilityAssessmentForBpcAnalysisQueryResult,
        DisabilityAssessmentForBpcAnalysisTypeormEntity,
      );

      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        GetAnalysisToolClientWithRelationsQueryResult,
        AnalysisToolClientTypeormEntity,
      );

      return AnalysisToolRecordTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        code: source.code.toString(),
        cnisFastAnalysis,
        retirementPlanningRpps,
        retirementPlanningRgps,
        judicialCaseAnalysis,
        administrativeProcedureInssAnalysis,
        medicalAndSocialReportObjectionGeneratorAnalysis,
        disabilityAssessmentForBpcAnalysis,
        analysisToolClient,
        specialActivity,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolRecordWithRelationsQueryResult,
      AnalysisToolRecordTypeormEntity,
      mappingFunction,
    );
  }
}
