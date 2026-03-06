import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { TeacherRetirementPlanningDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-document.typeorm.entity';
import { TeacherRetirementPlanningInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-legal-proceeding.typeorm.entity';
import { TeacherRetirementPlanningPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-period.typeorm.entity';
import { TeacherRetirementPlanningRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-remuneration.typeorm.entity';
import { TeacherRetirementPlanningResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-result.typeorm.entity';
import { TeacherRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning.typeorm.entity';
import { GetTeacherRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning/query/result/get-teacher-retirement-planning-with-relations.query.result';
import { GetTeacherRetirementPlanningDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-document/query/result/get-teacher-retirement-planning-document.query.result';
import { GetTeacherRetirementPlanningInssBenefitQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-inss-benefit/query/result/get-teacher-retirement-planning-inss-benefit.query.result';
import { GetTeacherRetirementPlanningLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-legal-proceeding/query/result/get-teacher-retirement-planning-legal-proceeding.query.result';
import { GetTeacherRetirementPlanningPeriodQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period/query/result/get-teacher-retirement-planning-period.query.result';
import { GetTeacherRetirementPlanningRemunerationQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-remuneration/query/result/get-teacher-retirement-planning-remuneration.query.result';
import { GetTeacherRetirementPlanningResultQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-result/query/result/get-teacher-retirement-planning-result.query.result';
import { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';

@Injectable()
export class GetTeacherRetirementPlanningWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetTeacherRetirementPlanningWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: TeacherRetirementPlanningTypeormEntity,
    ): GetTeacherRetirementPlanningWithRelationsQueryResult => {
      const inssBenefits = source.inssBenefits
        ? this.mapper.mapArray(
            source.inssBenefits,
            TeacherRetirementPlanningInssBenefitTypeormEntity,
            GetTeacherRetirementPlanningInssBenefitQueryResult,
          )
        : [];

      const legalProceedings = source.legalProceedings
        ? this.mapper.mapArray(
            source.legalProceedings,
            TeacherRetirementPlanningLegalProceedingTypeormEntity,
            GetTeacherRetirementPlanningLegalProceedingQueryResult,
          )
        : [];

      const documents = source.documents
        ? this.mapper.mapArray(
            source.documents,
            TeacherRetirementPlanningDocumentTypeormEntity,
            GetTeacherRetirementPlanningDocumentQueryResult,
          )
        : [];

      const periods = source.periods
        ? this.mapper.mapArray(
            source.periods,
            TeacherRetirementPlanningPeriodTypeormEntity,
            GetTeacherRetirementPlanningPeriodQueryResult,
          )
        : [];

      const remunerations = source.remunerations
        ? this.mapper.mapArray(
            source.remunerations,
            TeacherRetirementPlanningRemunerationTypeormEntity,
            GetTeacherRetirementPlanningRemunerationQueryResult,
          )
        : [];

      const result = source.teacherRetirementPlanningResult
        ? this.mapper.map(
            source.teacherRetirementPlanningResult,
            TeacherRetirementPlanningResultTypeormEntity,
            GetTeacherRetirementPlanningResultQueryResult,
          )
        : null;

      return GetTeacherRetirementPlanningWithRelationsQueryResult.build({
        id: new TeacherRetirementPlanningId(source.id),
        federativeEntity: source.federativeEntity,
        state: source.state as StateCodeEnum | null,
        municipality: source.municipality,
        analysisName: source.analysisName,
        currentPosition: source.currentPosition,
        activityType: source.activityType,
        publicServiceStartDate: source.publicServiceStartDate,
        careerStartDate: source.careerStartDate,
        inssBenefits,
        legalProceedings,
        documents,
        periods,
        remunerations,
        result,
        administrativeProcessAnalysis: source.administrativeProcessAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      TeacherRetirementPlanningTypeormEntity,
      GetTeacherRetirementPlanningWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetTeacherRetirementPlanningWithRelationsQueryResult,
    ): TeacherRetirementPlanningTypeormEntity => {
      const inssBenefits = this.mapper.mapArray(
        source.inssBenefits,
        GetTeacherRetirementPlanningInssBenefitQueryResult,
        TeacherRetirementPlanningInssBenefitTypeormEntity,
      );

      const legalProceedings = this.mapper.mapArray(
        source.legalProceedings,
        GetTeacherRetirementPlanningLegalProceedingQueryResult,
        TeacherRetirementPlanningLegalProceedingTypeormEntity,
      );

      const documents = this.mapper.mapArray(
        source.documents,
        GetTeacherRetirementPlanningDocumentQueryResult,
        TeacherRetirementPlanningDocumentTypeormEntity,
      );

      const periods = this.mapper.mapArray(
        source.periods,
        GetTeacherRetirementPlanningPeriodQueryResult,
        TeacherRetirementPlanningPeriodTypeormEntity,
      );

      const remunerations = this.mapper.mapArray(
        source.remunerations,
        GetTeacherRetirementPlanningRemunerationQueryResult,
        TeacherRetirementPlanningRemunerationTypeormEntity,
      );

      const result = source.result
        ? this.mapper.map(
            source.result,
            GetTeacherRetirementPlanningResultQueryResult,
            TeacherRetirementPlanningResultTypeormEntity,
          )
        : undefined;

      return TeacherRetirementPlanningTypeormEntity.build({
        id: source.id.toString(),
        federativeEntity: source.federativeEntity,
        state: source.state,
        municipality: source.municipality,
        analysisName: source.analysisName,
        currentPosition: source.currentPosition,
        activityType: source.activityType,
        publicServiceStartDate: source.publicServiceStartDate,
        careerStartDate: source.careerStartDate,
        inssBenefits,
        legalProceedings,
        documents,
        periods,
        remunerations,
        teacherRetirementPlanningResult: result,
        administrativeProcessAnalysis: source.administrativeProcessAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        analysisToolRecord: undefined,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetTeacherRetirementPlanningWithRelationsQueryResult,
      TeacherRetirementPlanningTypeormEntity,
      mappingFunction,
    );
  }
}
