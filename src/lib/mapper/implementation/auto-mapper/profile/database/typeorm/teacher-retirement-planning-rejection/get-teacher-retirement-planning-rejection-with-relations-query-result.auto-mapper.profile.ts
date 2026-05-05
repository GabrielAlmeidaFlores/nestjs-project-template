import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TeacherRetirementPlanningRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-inss-benefit.typeorm.entity';
import { TeacherRetirementPlanningRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-result.typeorm.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-teaching-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-document.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history.typeorm.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection-work-period.typeorm.entity';
import { TeacherRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/teacher-retirement-planning-rejection.typeorm.entity';
import { GetTeacherRetirementPlanningRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/result/get-teacher-retirement-planning-rejection-with-relations.query.result';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';

@Injectable()
export class GetTeacherRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetTeacherRetirementPlanningRejectionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      TeacherRetirementPlanningRejectionTypeormEntity,
      GetTeacherRetirementPlanningRejectionWithRelationsQueryResult,
      constructUsing((source) => {
        const id = new TeacherRetirementPlanningRejectionId(source.id);

        const result = source.teacherRetirementPlanningRejectionResult
          ? this.mapResult(source.teacherRetirementPlanningRejectionResult)
          : null;

        const documents = (
          source.teacherRetirementPlanningRejectionDocument ?? []
        ).map((doc) => this.mapDocument(doc));

        const inssBenefits = (
          source.teacherRetirementPlanningRejectionInssBenefit ?? []
        ).map((b) => this.mapInssBenefit(b));

        const teachingPeriods = (
          source.teacherRetirementPlanningRejectionTeachingPeriod ?? []
        ).map((tp) => this.mapTeachingPeriod(tp));

        const workPeriods = (
          source.teacherRetirementPlanningRejectionWorkPeriod ?? []
        ).map((wp) => this.mapWorkPeriod(wp));

        const timeAccelerators = (
          source.teacherRetirementPlanningRejectionTimeAccelerator ?? []
        ).map((ta) => this.mapTimeAccelerator(ta));

        const analysisToolClient = source.analysisToolRecord?.analysisToolClient
          ? {
              analysisToolClientId:
                source.analysisToolRecord.analysisToolClient.id,
              name: source.analysisToolRecord.analysisToolClient.name,
              federalDocument:
                source.analysisToolRecord.analysisToolClient.federalDocument,
              birthDate: source.analysisToolRecord.analysisToolClient.birthDate,
              email: source.analysisToolRecord.analysisToolClient.email,
              sex: source.analysisToolRecord.analysisToolClient.gender as
                | string
                | null,
              phone: source.analysisToolRecord.analysisToolClient.phoneNumber,
            }
          : null;

        return new GetTeacherRetirementPlanningRejectionWithRelationsQueryResult(
          {
            id,
            analysisName: source.analysisName,
            requestEntryDate: source.requestEntryDate,
            denialDate: source.denialDate,
            category: source.category,
            activityType: source.activityType,
            activityTypeDescription: source.activityTypeDescription,
            denialReason: source.denialReason,
            denialReasonDescription: source.denialReasonDescription,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            result,
            documents,
            inssBenefits,
            teachingPeriods,
            workPeriods,
            timeAccelerators,
            analysisToolClient,
          } as GetTeacherRetirementPlanningRejectionWithRelationsQueryResult,
        );
      }),
    );
  }

  private mapResult(
    source: TeacherRetirementPlanningRejectionResultTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['result'] {
    return {
      id: source.id,
      inssDecisionAnalysis: source.inssDecisionAnalysis,
      firstAnalysis: source.firstAnalysis,
      completeAnalysis: source.completeAnalysis,
      completeAnalysisDownload: source.completeAnalysisDownload,
      simplifiedAnalysis: source.simplifiedAnalysis,
    };
  }

  private mapDocument(
    source: TeacherRetirementPlanningRejectionDocumentTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
      name: source.name,
      type: source.type,
    };
  }

  private mapInssBenefit(
    source: TeacherRetirementPlanningRejectionInssBenefitTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['inssBenefits'][number] {
    return {
      id: source.id,
      inssBenefit: source.inssBenefit,
    };
  }

  private mapTeachingPeriod(
    source: TeacherRetirementPlanningRejectionTeachingPeriodTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['teachingPeriods'][number] {
    const documents = (
      source.teacherRetirementPlanningRejectionTeachingPeriodDocument ?? []
    ).map((doc) => this.mapTeachingPeriodDocument(doc));

    return {
      id: source.id,
      startDate: source.startDate,
      endDate: source.endDate,
      institutionName: source.institutionName,
      establishmentType: source.establishmentType,
      educationLevel: source.educationLevel,
      functionPerformed: source.functionPerformed,
      rejectionReason: source.rejectionReason,
      legalBasisForRecognition: source.legalBasisForRecognition,
      favorableJurisprudence: source.favorableJurisprudence,
      proofStrategy: source.proofStrategy,
      documents,
    };
  }

  private mapTeachingPeriodDocument(
    source: TeacherRetirementPlanningRejectionTeachingPeriodDocumentTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['teachingPeriods'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
    };
  }

  private mapWorkPeriod(
    source: TeacherRetirementPlanningRejectionWorkPeriodTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['workPeriods'][number] {
    const earningsHistory = (
      source.teacherRetirementPlanningRejectionWorkPeriodEarningsHistory ?? []
    ).map((eh) => this.mapEarningsHistory(eh));

    const documents = (
      source.teacherRetirementPlanningRejectionWorkPeriodDocument ?? []
    ).map((doc) => this.mapWorkPeriodDocument(doc));

    return {
      id: source.id,
      bondOrigin: source.bondOrigin,
      startDate: source.startDate,
      endDate: source.endDate,
      category: source.category,
      activityDescription: source.activityDescription,
      competenceBelowTheMinimum: source.competenceBelowTheMinimum,
      pendencyReason: source.pendencyReason,
      periodConsideration: source.periodConsideration,
      contributionAverage: source.contributionAverage,
      status: source.status,
      gracePeriod: source.gracePeriod,
      impactMonths: source.impactMonths,
      isPendency: source.isPendency,
      wantsToComplementViaMeuINSS: source.wantsToComplementViaMeuINSS,
      hasSpecialPeriod: source.hasSpecialPeriod,
      timelineClassification: source.timelineClassification,
      earningsHistory,
      documents,
    };
  }

  private mapEarningsHistory(
    source: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['workPeriods'][number]['earningsHistory'][number] {
    return {
      id: source.id,
      competence: source.competence,
      remuneration: source.remuneration,
      indicators: source.indicators,
      paymentDate: source.paymentDate,
      contribution: source.contribution,
      contributionSalary: source.contributionSalary,
      competenceBelowMinimum: source.competenceBelowMinimum,
    };
  }

  private mapWorkPeriodDocument(
    source: TeacherRetirementPlanningRejectionWorkPeriodDocumentTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['workPeriods'][number]['documents'][number] {
    return {
      id: source.id,
      fileName: source.fileName,
    };
  }

  private mapTimeAccelerator(
    source: TeacherRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
  ): GetTeacherRetirementPlanningRejectionWithRelationsQueryResult['timeAccelerators'][number] {
    return {
      id: source.id,
      timeType: source.timeType,
      institution: source.institution,
      recognitionInss: source.recognitionInss,
      affectsQualifyingPeriod: source.affectsQualifyingPeriod,
      technicalNote: source.technicalNote,
      startDate: source.startDate,
      endDate: source.endDate,
      gracePeriod: source.gracePeriod,
      viability: source.viability,
    };
  }
}
