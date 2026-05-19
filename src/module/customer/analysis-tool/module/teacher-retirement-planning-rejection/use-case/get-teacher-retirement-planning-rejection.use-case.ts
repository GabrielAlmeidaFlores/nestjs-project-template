import { Inject, Injectable } from '@nestjs/common';

import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { TeacherRetirementPlanningRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/repository/teacher-retirement-planning-rejection/query/teacher-retirement-planning-rejection.query.repository.gateway';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import {
  GetTeacherRetirementPlanningRejectionResponseDto,
  GetTeacherRetirementPlanningRejectionAnalysisToolClientResponseDto,
  GetTeacherRetirementPlanningRejectionResultResponseDto,
  GetTeacherRetirementPlanningRejectionDocumentResponseDto,
  GetTeacherRetirementPlanningRejectionInssBenefitResponseDto,
  GetTeacherRetirementPlanningRejectionTeachingPeriodResponseDto,
  GetTeacherRetirementPlanningRejectionTeachingPeriodDocumentResponseDto,
  GetTeacherRetirementPlanningRejectionWorkPeriodResponseDto,
  GetTeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryResponseDto,
  GetTeacherRetirementPlanningRejectionWorkPeriodDocumentResponseDto,
  GetTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/dto/response/get-teacher-retirement-planning-rejection.response.dto';
import { TeacherRetirementPlanningRejectionNotFoundError } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/error/teacher-retirement-planning-rejection-not-found.error';

@Injectable()
export class GetTeacherRetirementPlanningRejectionUseCase {
  protected readonly _type = GetTeacherRetirementPlanningRejectionUseCase.name;

  public constructor(
    @Inject(TeacherRetirementPlanningRejectionQueryRepositoryGateway)
    private readonly teacherRetirementPlanningRejectionQueryRepositoryGateway: TeacherRetirementPlanningRejectionQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId,
  ): Promise<GetTeacherRetirementPlanningRejectionResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.teacherRetirementPlanningRejectionQueryRepositoryGateway.findOneByTeacherRetirementPlanningRejectionIdOrFailWithRelations(
        teacherRetirementPlanningRejectionId,
        TeacherRetirementPlanningRejectionNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByTeacherRetirementPlanningRejectionIdOrFail(
        teacherRetirementPlanningRejectionId,
        TeacherRetirementPlanningRejectionNotFoundError,
      ),
    ]);

    const [allTeachingPeriodDocuments, allWorkPeriodDocuments] =
      await Promise.all([
        Promise.all(
          result.teachingPeriods.flatMap((period) =>
            period.documents.map(async (doc) => ({
              teachingPeriodId: period.id.toString(),
              ...(await this.buildSubEntityDocumentData(doc.fileName)),
            })),
          ),
        ),
        Promise.all(
          result.workPeriods.flatMap((wp) =>
            wp.documents.map(async (doc) => ({
              workPeriodId: wp.id.toString(),
              ...(await this.buildSubEntityDocumentData(doc.fileName)),
            })),
          ),
        ),
      ]);

    return GetTeacherRetirementPlanningRejectionResponseDto.build({
      id: result.id.toString(),
      analysisToolClient:
        GetTeacherRetirementPlanningRejectionAnalysisToolClientResponseDto.build(
          {
            analysisToolClientId:
              analysisToolRecord.analysisToolClient.id.toString(),
            ...(analysisToolRecord.analysisToolClient.name !== null && {
              name: analysisToolRecord.analysisToolClient.name,
            }),
            ...(analysisToolRecord.analysisToolClient.federalDocument !==
              null && {
              federalDocument:
                analysisToolRecord.analysisToolClient.federalDocument.toString(),
            }),
            ...(analysisToolRecord.analysisToolClient.email !== null && {
              email: analysisToolRecord.analysisToolClient.email.toString(),
            }),
            ...(analysisToolRecord.analysisToolClient.birthDate !== null && {
              birthDate: analysisToolRecord.analysisToolClient.birthDate,
            }),
            ...(analysisToolRecord.analysisToolClient.gender !== null && {
              sex: analysisToolRecord.analysisToolClient.gender.toString(),
            }),
            ...(analysisToolRecord.analysisToolClient.phoneNumber !== null && {
              phone:
                analysisToolRecord.analysisToolClient.phoneNumber.toString(),
            }),
          },
        ),
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.requestEntryDate !== null && {
        requestEntryDate: result.requestEntryDate,
      }),
      ...(result.denialDate !== null && { denialDate: result.denialDate }),
      ...(result.category !== null && { category: result.category }),
      ...(result.activityType !== null && {
        activityType: result.activityType,
      }),
      ...(result.activityTypeDescription !== null && {
        activityTypeDescription: result.activityTypeDescription,
      }),
      ...(result.denialReason !== null && {
        denialReason: result.denialReason,
      }),
      ...(result.denialReasonDescription !== null && {
        denialReasonDescription: result.denialReasonDescription,
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.result !== null && {
        result: GetTeacherRetirementPlanningRejectionResultResponseDto.build({
          id: result.result.id.toString(),
          ...(result.result.inssDecisionAnalysis !== null && {
            inssDecisionAnalysis: result.result.inssDecisionAnalysis,
          }),
          ...(result.result.firstAnalysis !== null && {
            firstAnalysis: result.result.firstAnalysis,
          }),
          ...(result.result.completeAnalysis !== null && {
            completeAnalysis: result.result.completeAnalysis,
          }),
          ...(result.result.completeAnalysisDownload !== null && {
            completeAnalysisDownload: result.result.completeAnalysisDownload,
          }),
          ...(result.result.simplifiedAnalysis !== null && {
            simplifiedAnalysis: result.result.simplifiedAnalysis,
          }),
        }),
      }),
      documents: result.documents.map((doc) =>
        GetTeacherRetirementPlanningRejectionDocumentResponseDto.build({
          id: doc.id.toString(),
          fileName: doc.fileName,
          name: doc.name,
          type: doc.type,
        }),
      ),
      inssBenefits: result.inssBenefits.map((benefit) =>
        GetTeacherRetirementPlanningRejectionInssBenefitResponseDto.build({
          id: benefit.id.toString(),
          inssBenefit: benefit.inssBenefit,
        }),
      ),
      teachingPeriods: result.teachingPeriods.map((period) =>
        GetTeacherRetirementPlanningRejectionTeachingPeriodResponseDto.build({
          id: period.id.toString(),
          ...(period.startDate !== null && { startDate: period.startDate }),
          ...(period.endDate !== null && { endDate: period.endDate }),
          ...(period.institutionName !== null && {
            institutionName: period.institutionName,
          }),
          ...(period.establishmentType !== null && {
            establishmentType: period.establishmentType,
          }),
          ...(period.educationLevel !== null && {
            educationLevel: period.educationLevel,
          }),
          ...(period.functionPerformed !== null && {
            functionPerformed: period.functionPerformed,
          }),
          ...(period.rejectionReason !== null && {
            rejectionReason: period.rejectionReason,
          }),
          ...(period.legalBasisForRecognition !== null && {
            legalBasisForRecognition: period.legalBasisForRecognition,
          }),
          ...(period.favorableJurisprudence !== null && {
            favorableJurisprudence: period.favorableJurisprudence,
          }),
          ...(period.proofStrategy !== null && {
            proofStrategy: period.proofStrategy,
          }),
          documents: allTeachingPeriodDocuments
            .filter((doc) => doc.teachingPeriodId === period.id.toString())
            .map((doc) =>
              GetTeacherRetirementPlanningRejectionTeachingPeriodDocumentResponseDto.build(
                {
                  id: doc.id,
                  fileName: doc.signedUrl,
                },
              ),
            ),
        }),
      ),
      workPeriods: result.workPeriods.map((wp) =>
        GetTeacherRetirementPlanningRejectionWorkPeriodResponseDto.build({
          id: wp.id.toString(),
          ...(wp.bondOrigin !== null && { bondOrigin: wp.bondOrigin }),
          ...(wp.startDate !== null && { startDate: wp.startDate }),
          ...(wp.endDate !== null && { endDate: wp.endDate }),
          ...(wp.category !== null && { category: wp.category }),
          ...(wp.activityDescription !== null && {
            activityDescription: wp.activityDescription,
          }),
          ...(wp.competenceBelowTheMinimum !== null && {
            competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
          }),
          ...(wp.pendencyReason !== null && {
            pendencyReason: wp.pendencyReason,
          }),
          ...(wp.periodConsideration !== null && {
            periodConsideration: wp.periodConsideration,
          }),
          ...(wp.contributionAverage !== null && {
            contributionAverage: wp.contributionAverage,
          }),
          ...(wp.status !== null && { status: wp.status }),
          ...(wp.gracePeriod !== null && { gracePeriod: wp.gracePeriod }),
          ...(wp.impactMonths !== null && { impactMonths: wp.impactMonths }),
          ...(wp.isPendency !== null && { isPendency: wp.isPendency }),
          ...(wp.wantsToComplementViaMeuINSS !== null && {
            wantsToComplementViaMeuINSS: wp.wantsToComplementViaMeuINSS,
          }),
          ...(wp.hasSpecialPeriod !== null && {
            hasSpecialPeriod: wp.hasSpecialPeriod,
          }),
          ...(wp.timelineClassification !== null && {
            timelineClassification: wp.timelineClassification,
          }),
          earningsHistory: wp.earningsHistory.map((eh) =>
            GetTeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryResponseDto.build(
              {
                id: eh.id.toString(),
                ...(eh.competence !== null && {
                  competence: eh.competence,
                }),
                ...(eh.remuneration !== null && {
                  remuneration: eh.remuneration,
                }),
                ...(eh.indicators !== null && {
                  indicators: eh.indicators,
                }),
                ...(eh.paymentDate !== null && {
                  paymentDate: eh.paymentDate,
                }),
                ...(eh.contribution !== null && {
                  contribution: eh.contribution,
                }),
                ...(eh.contributionSalary !== null && {
                  contributionSalary: eh.contributionSalary,
                }),
                ...(eh.competenceBelowMinimum !== null && {
                  competenceBelowMinimum: eh.competenceBelowMinimum,
                }),
              },
            ),
          ),
          documents: allWorkPeriodDocuments
            .filter((doc) => doc.workPeriodId === wp.id.toString())
            .map((doc) =>
              GetTeacherRetirementPlanningRejectionWorkPeriodDocumentResponseDto.build(
                {
                  id: doc.id,
                  fileName: doc.signedUrl,
                },
              ),
            ),
        }),
      ),
      timeAccelerators: result.timeAccelerators.map((ta) =>
        GetTeacherRetirementPlanningRejectionTimeAcceleratorResponseDto.build({
          id: ta.id.toString(),
          ...(ta.timeType !== null && { timeType: ta.timeType }),
          ...(ta.institution !== null && { institution: ta.institution }),
          ...(ta.recognitionInss !== null && {
            recognitionInss: ta.recognitionInss,
          }),
          ...(ta.affectsQualifyingPeriod !== null && {
            affectsQualifyingPeriod: ta.affectsQualifyingPeriod,
          }),
          ...(ta.technicalNote !== null && {
            technicalNote: ta.technicalNote,
          }),
          ...(ta.startDate !== null && { startDate: ta.startDate }),
          ...(ta.endDate !== null && { endDate: ta.endDate }),
          ...(ta.gracePeriod !== null && { gracePeriod: ta.gracePeriod }),
          ...(ta.viability !== null && { viability: ta.viability }),
        }),
      ),
    });
  }

  private async buildSubEntityDocumentData(
    fileName: string,
  ): Promise<{ id: string; signedUrl: string }> {
    const signedUrl =
      await this.fileProcessorGateway.getFileSignedUrl(fileName);

    return { id: fileName, signedUrl: signedUrl.toString() };
  }
}
