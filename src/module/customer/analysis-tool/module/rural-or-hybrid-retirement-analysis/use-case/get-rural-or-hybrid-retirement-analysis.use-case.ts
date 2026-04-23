import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import {
  GetRuralOrHybridRetirementAnalysisResponseDto,
  GetRuralOrHybridRetirementAnalysisAnalysisToolClientResponseDto,
  GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto,
  GetRuralOrHybridRetirementAnalysisResultResponseDto,
  GetRuralOrHybridRetirementAnalysisPeriodResponseDto,
  GetRuralOrHybridRetirementAnalysisPeriodMemberResponseDto,
  GetRuralOrHybridRetirementAnalysisPeriodMemberDocumentResponseDto,
  GetRuralOrHybridRetirementAnalysisPeriodDocumentResponseDto,
  GetRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto,
  GetRuralOrHybridRetirementAnalysisTestimonialWitnessDocumentResponseDto,
  GetRuralOrHybridRetirementAnalysisWorkPeriodResponseDto,
  GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentResponseDto,
  GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResponseDto,
  GetRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryResponseDto,
  GetRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/get-rural-or-hybrid-retirement-analysis.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';

import type { RuralOrHybridRetirementAnalysisFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-first-analysis.interface';
import type { RuralOrHybridRetirementAnalysisResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-result.interface';

@Injectable()
export class GetRuralOrHybridRetirementAnalysisUseCase {
  protected readonly _type = GetRuralOrHybridRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<GetRuralOrHybridRetirementAnalysisResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementAnalysisIdOrFail(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      ),
    ]);

    const cnisDocumentEntity =
      result.ruralOrHybridRetirementAnalysisDocument?.[0] ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null && cnisDocumentEntity.document !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    const [
      allPeriodDocuments,
      allPeriodMemberDocuments,
      allTestimonialWitnessDocuments,
      allWorkPeriodDocuments,
    ] = await Promise.all([
      Promise.all(
        (result.ruralOrHybridRetirementAnalysisPeriodDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            periodId: doc.ruralOrHybridRetirementAnalysisPeriodId.toString(),
            type: doc.type,
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
      Promise.all(
        (result.ruralOrHybridRetirementAnalysisPeriodMemberDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            memberId:
              doc.ruralOrHybridRetirementAnalysisPeriodMemberId.toString(),
            type: doc.type,
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
      Promise.all(
        (result.ruralOrHybridRetirementAnalysisTestimonialWitnessDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            witnessId:
              doc.ruralOrHybridRetirementAnalysisTestimonialWitnessId.toString(),
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
      Promise.all(
        (result.ruralOrHybridRetirementAnalysisWorkPeriodDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            workPeriodId:
              doc.ruralOrHybridRetirementAnalysisWorkPeriodId.toString(),
            type: doc.type,
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
    ]);

    return GetRuralOrHybridRetirementAnalysisResponseDto.build({
      ruralOrHybridRetirementAnalysisId:
        result.ruralOrHybridRetirementAnalysisId,
      analysisToolClient:
        GetRuralOrHybridRetirementAnalysisAnalysisToolClientResponseDto.build({
          analysisToolClientId: analysisToolRecord.analysisToolClient.id,
          ...(analysisToolRecord.analysisToolClient.name !== null && {
            name: analysisToolRecord.analysisToolClient.name,
          }),
          ...(analysisToolRecord.analysisToolClient.federalDocument !==
            null && {
            federalDocument:
              analysisToolRecord.analysisToolClient.federalDocument,
          }),
          ...(analysisToolRecord.analysisToolClient.email !== null && {
            email: analysisToolRecord.analysisToolClient.email,
          }),
          ...(analysisToolRecord.analysisToolClient.corporateEmail !== null && {
            corporateEmail:
              analysisToolRecord.analysisToolClient.corporateEmail,
          }),
          ...(analysisToolRecord.analysisToolClient.phoneNumber !== null && {
            phoneNumber: analysisToolRecord.analysisToolClient.phoneNumber,
          }),
          ...(analysisToolRecord.analysisToolClient.birthDate !== null && {
            birthDate: analysisToolRecord.analysisToolClient.birthDate,
          }),
          ...(analysisToolRecord.analysisToolClient.gender !== null && {
            gender: analysisToolRecord.analysisToolClient.gender,
          }),
          ...(analysisToolRecord.analysisToolClient.clientType !== null && {
            clientType: analysisToolRecord.analysisToolClient.clientType,
          }),
        }),
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.activityType !== null && {
        activityType: result.activityType,
      }),
      ...(result.requestedBenefit !== null && {
        requestedBenefit: result.requestedBenefit,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.ruralOrHybridRetirementAnalysisResult !== null && {
        ruralOrHybridRetirementAnalysisResult:
          GetRuralOrHybridRetirementAnalysisResultResponseDto.build({
            ...(result.ruralOrHybridRetirementAnalysisResult
              .completeAnalysis !== null && {
              ruralOrHybridRetirementAnalysisCompleteAnalysis: JSON.parse(
                result.ruralOrHybridRetirementAnalysisResult.completeAnalysis,
              ) as RuralOrHybridRetirementAnalysisResultInterface,
            }),
            ...(result.ruralOrHybridRetirementAnalysisResult
              .simplifiedAnalysis !== null && {
              ruralOrHybridRetirementAnalysisSimplifiedAnalysis:
                result.ruralOrHybridRetirementAnalysisResult.simplifiedAnalysis,
            }),
            ...(result.ruralOrHybridRetirementAnalysisResult.firstAnalysis !==
              null && {
              ruralOrHybridRetirementAnalysisFirstAnalysis: JSON.parse(
                result.ruralOrHybridRetirementAnalysisResult.firstAnalysis,
              ) as RuralOrHybridRetirementAnalysisFirstAnalysisInterface,
            }),
            ...(result.ruralOrHybridRetirementAnalysisResult
              .completeAnalysisDownload !== null && {
              ruralOrHybridRetirementAnalysisCompleteAnalysisDownload:
                result.ruralOrHybridRetirementAnalysisResult
                  .completeAnalysisDownload,
            }),
          }),
      }),
      ...(result.ruralOrHybridRetirementAnalysisPeriod !== null && {
        ruralOrHybridRetirementAnalysisPeriod:
          result.ruralOrHybridRetirementAnalysisPeriod.map((p) => {
            const periodMembers = (
              result.ruralOrHybridRetirementAnalysisPeriodMember ?? []
            ).filter(
              (m) =>
                m.ruralOrHybridRetirementAnalysisPeriodId.toString() ===
                p.id.toString(),
            );

            const periodDocumentsForPeriod = allPeriodDocuments.filter(
              (d) => d.periodId === p.id.toString(),
            );

            return GetRuralOrHybridRetirementAnalysisPeriodResponseDto.build({
              ruralOrHybridRetirementAnalysisPeriodId: p.id,
              ...(p.startDate !== null && { startDate: p.startDate }),
              ...(p.endDate !== null && { endDate: p.endDate }),
              ...(p.workerType !== null && { workerType: p.workerType }),
              ...(p.workSchedule !== null && { workSchedule: p.workSchedule }),
              ...(p.propertyName !== null && { propertyName: p.propertyName }),
              ...(p.propertyCategory !== null && {
                propertyCategory: p.propertyCategory,
              }),
              ...(p.propertyOwner !== null && {
                propertyOwner: p.propertyOwner,
              }),
              ...(p.propertyCep !== null && { propertyCep: p.propertyCep }),
              ...(p.propertyState !== null && {
                propertyState: p.propertyState,
              }),
              ...(p.propertyCity !== null && { propertyCity: p.propertyCity }),
              ...(p.propertyNeighbourhood !== null && {
                propertyNeighbourhood: p.propertyNeighbourhood,
              }),
              ...(p.propertyStreet !== null && {
                propertyStreet: p.propertyStreet,
              }),
              ...(p.propertyNumber !== null && {
                propertyNumber: p.propertyNumber,
              }),
              ...(p.productionDestination !== null && {
                productionDestination: p.productionDestination,
              }),
              ...(p.employee !== null && { employee: p.employee }),
              ...(p.employeeAmount !== null && {
                employeeAmount: p.employeeAmount,
              }),
              ...(p.agriculturalMachinery !== null && {
                agriculturalMachinery: p.agriculturalMachinery,
              }),
              ...(p.agriculturalMachineryDescription !== null && {
                agriculturalMachineryDescription:
                  p.agriculturalMachineryDescription,
              }),
              ...(p.farmVehicles !== null && { farmVehicles: p.farmVehicles }),
              ...(p.farmVehiclesDescription !== null && {
                farmVehiclesDescription: p.farmVehiclesDescription,
              }),
              ...(p.incomeBesidesRuralProduction !== null && {
                incomeBesidesRuralProduction: p.incomeBesidesRuralProduction,
              }),
              ...(p.incomeBesidesRuralProductionDescription !== null && {
                incomeBesidesRuralProductionDescription:
                  p.incomeBesidesRuralProductionDescription,
              }),
              ...(p.clientHasOrHadCnpj !== null && {
                clientHasOrHadCnpj: p.clientHasOrHadCnpj,
              }),
              ...(p.clientHasOrHadCnpjDescription !== null && {
                clientHasOrHadCnpjDescription: p.clientHasOrHadCnpjDescription,
              }),
              ...(p.clientLivesInUrbanArea !== null && {
                clientLivesInUrbanArea: p.clientLivesInUrbanArea,
              }),
              ...(p.clientMunicipality !== null && {
                clientMunicipality: p.clientMunicipality,
              }),
              ...(p.clientState !== null && { clientState: p.clientState }),
              ...(p.distance !== null && { distance: p.distance }),
              ...(periodDocumentsForPeriod.length > 0 && {
                documents: periodDocumentsForPeriod.map((d) =>
                  GetRuralOrHybridRetirementAnalysisPeriodDocumentResponseDto.build(
                    {
                      document: d.document,
                      originalFileName: d.originalFileName,
                      ...(d.type !== null && { type: d.type }),
                    },
                  ),
                ),
              }),
              ...(periodMembers.length > 0 && {
                members: periodMembers.map((m) => {
                  const memberDocumentsForMember =
                    allPeriodMemberDocuments.filter(
                      (md) => md.memberId === m.id.toString(),
                    );

                  return GetRuralOrHybridRetirementAnalysisPeriodMemberResponseDto.build(
                    {
                      ruralOrHybridRetirementAnalysisPeriodMemberId: m.id,
                      ...(m.name !== null && { name: m.name }),
                      ...(m.federalDocument !== null && {
                        federalDocument: m.federalDocument,
                      }),
                      ...(m.kinship !== null && { kinship: m.kinship }),
                      ...(m.hasReceivedRuralBenefit !== null && {
                        hasReceivedRuralBenefit: m.hasReceivedRuralBenefit,
                      }),
                      ...(m.benefitNumber !== null && {
                        benefitNumber: m.benefitNumber,
                      }),
                      ...(memberDocumentsForMember.length > 0 && {
                        documents: memberDocumentsForMember.map((md) =>
                          GetRuralOrHybridRetirementAnalysisPeriodMemberDocumentResponseDto.build(
                            {
                              document: md.document,
                              originalFileName: md.originalFileName,
                              ...(md.type !== null && { type: md.type }),
                            },
                          ),
                        ),
                      }),
                    },
                  );
                }),
              }),
            });
          }),
      }),
      ...(result.ruralOrHybridRetirementAnalysisTestimonialWitness !== null && {
        ruralOrHybridRetirementAnalysisTestimonialWitness:
          result.ruralOrHybridRetirementAnalysisTestimonialWitness.map((w) => {
            const witnessDocumentsForWitness =
              allTestimonialWitnessDocuments.filter(
                (wd) => wd.witnessId === w.id.toString(),
              );

            return GetRuralOrHybridRetirementAnalysisTestimonialWitnessResponseDto.build(
              {
                ruralOrHybridRetirementAnalysisTestimonialWitnessId: w.id,
                ...(w.fullName !== null && { fullName: w.fullName }),
                ...(w.federalDocument !== null && {
                  federalDocument: w.federalDocument,
                }),
                ...(w.insuredRelationship !== null && {
                  insuredRelationship: w.insuredRelationship,
                }),
                ...(w.canTestifyStartDate !== null && {
                  canTestifyStartDate: w.canTestifyStartDate,
                }),
                ...(w.canTestifyEndDate !== null && {
                  canTestifyEndDate: w.canTestifyEndDate,
                }),
                ...(witnessDocumentsForWitness.length > 0 && {
                  documents: witnessDocumentsForWitness.map((wd) =>
                    GetRuralOrHybridRetirementAnalysisTestimonialWitnessDocumentResponseDto.build(
                      {
                        document: wd.document,
                        originalFileName: wd.originalFileName,
                      },
                    ),
                  ),
                }),
              },
            );
          }),
      }),
      ...(result.ruralOrHybridRetirementAnalysisWorkPeriod !== null && {
        ruralOrHybridRetirementAnalysisWorkPeriod:
          result.ruralOrHybridRetirementAnalysisWorkPeriod.map((wp) => {
            const workPeriodDocumentsForWorkPeriod =
              allWorkPeriodDocuments.filter(
                (d) => d.workPeriodId === wp.id.toString(),
              );

            const workPeriodDocumentAnalyses = (
              result.ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis ??
              []
            ).filter(
              (da) =>
                da.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
                wp.id.toString(),
            );

            const workPeriodEarningsHistory = (
              result.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory ??
              []
            ).filter(
              (eh) =>
                eh.ruralOrHybridRetirementAnalysisWorkPeriodId.toString() ===
                wp.id.toString(),
            );

            return GetRuralOrHybridRetirementAnalysisWorkPeriodResponseDto.build(
              {
                ruralOrHybridRetirementAnalysisWorkPeriodId: wp.id,
                ...(wp.bondOrigin !== null && { bondOrigin: wp.bondOrigin }),
                ...(wp.startDate !== null && { startDate: wp.startDate }),
                ...(wp.endDate !== null && { endDate: wp.endDate }),
                ...(wp.category !== null && { category: wp.category }),
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
                ...(wp.jobType !== null && { jobType: wp.jobType }),
                ...(wp.activityDescription !== null && {
                  activityDescription: wp.activityDescription,
                }),
                ...(workPeriodDocumentsForWorkPeriod.length > 0 && {
                  documents: workPeriodDocumentsForWorkPeriod.map((d) =>
                    GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentResponseDto.build(
                      {
                        document: d.document,
                        originalFileName: d.originalFileName,
                        ...(d.type !== null && { type: d.type }),
                      },
                    ),
                  ),
                }),
                ...(workPeriodDocumentAnalyses.length > 0 && {
                  documentAnalyses: workPeriodDocumentAnalyses.map((da) =>
                    GetRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisResponseDto.build(
                      {
                        ...(da.documentType !== null && {
                          documentType: da.documentType,
                        }),
                        ...(da.ownName !== null && { ownName: da.ownName }),
                        ...(da.documentYear !== null && {
                          documentYear: da.documentYear,
                        }),
                        ...(da.technicalNote !== null && {
                          technicalNote: da.technicalNote,
                        }),
                      },
                    ),
                  ),
                }),
                ...(workPeriodEarningsHistory.length > 0 && {
                  earningsHistory: workPeriodEarningsHistory.map((eh) =>
                    GetRuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryResponseDto.build(
                      {
                        ...(eh.competence !== null && {
                          competence: new Date(eh.competence),
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
                }),
              },
            );
          }),
      }),
      ...(result.ruralOrHybridRetirementAnalysisTimeAccelerator !== null && {
        ruralOrHybridRetirementAnalysisTimeAccelerator:
          result.ruralOrHybridRetirementAnalysisTimeAccelerator.map((ta) =>
            GetRuralOrHybridRetirementAnalysisTimeAcceleratorResponseDto.build({
              ruralOrHybridRetirementAnalysisTimeAcceleratorId: ta.id,
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
      }),
    });
  }

  private async buildCnisDocumentResponse(
    documentKey: string,
  ): Promise<GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto> {
    const fileBuffer =
      await this.fileProcessorGateway.getFileBuffer(documentKey);
    const originalFileName =
      await this.fileProcessorGateway.getOriginalFileName(documentKey);
    return GetRuralOrHybridRetirementAnalysisCnisDocumentResponseDto.build({
      document: Base64.encodeBuffer(fileBuffer),
      originalFileName,
    });
  }

  private async buildSubEntityDocumentData(
    documentKey: string,
  ): Promise<{ document: Base64; originalFileName: string }> {
    const [fileBuffer, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileBuffer(documentKey),
      this.fileProcessorGateway.getOriginalFileName(documentKey),
    ]);
    return {
      document: Base64.encodeBuffer(fileBuffer),
      originalFileName,
    };
  }
}
