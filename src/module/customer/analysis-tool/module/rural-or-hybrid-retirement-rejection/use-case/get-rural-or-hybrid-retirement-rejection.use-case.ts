import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import {
  GetRuralOrHybridRetirementRejectionResponseDto,
  GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto,
  GetRuralOrHybridRetirementRejectionInssBenefitResponseDto,
  GetRuralOrHybridRetirementRejectionLegalProceedingResponseDto,
  GetRuralOrHybridRetirementRejectionResultResponseDto,
  GetRuralOrHybridRetirementRejectionPeriodResponseDto,
  GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto,
  GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto,
  GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto,
  GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto,
  GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto,
  GetRuralOrHybridRetirementRejectionWorkPeriodResponseDto,
  GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto,
  GetRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto,
  GetRuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryResponseDto,
  GetRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto,
} from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/get-rural-or-hybrid-retirement-rejection.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import type { RuralOrHybridRetirementRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-first-analysis.interface';
import type { RuralOrHybridRetirementRejectionResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-result.interface';

@Injectable()
export class GetRuralOrHybridRetirementRejectionUseCase {
  protected readonly _type = GetRuralOrHybridRetirementRejectionUseCase.name;

  public constructor(
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionResponseDto> {
    const result =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const cnisDocumentEntity =
      result.ruralOrHybridRetirementRejectionDocument?.[0] ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null && cnisDocumentEntity.document !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    return GetRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId:
        result.ruralOrHybridRetirementRejectionId,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.activityType !== null && {
        activityType: result.activityType,
      }),
      ...(result.requestedBenefit !== null && {
        requestedBenefit: result.requestedBenefit,
      }),
      ...(result.applicationSubmissionDate !== null && {
        applicationSubmissionDate: result.applicationSubmissionDate,
      }),
      ...(result.dateOfRejection !== null && {
        dateOfRejection: result.dateOfRejection,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      ...(result.ruralOrHybridRetirementRejectionResult !== null && {
        ruralOrHybridRetirementRejectionResult:
          GetRuralOrHybridRetirementRejectionResultResponseDto.build({
            ...(result.ruralOrHybridRetirementRejectionResult
              .completeAnalysis !== null && {
              ruralOrHybridRetirementRejectionCompleteAnalysis: JSON.parse(
                result.ruralOrHybridRetirementRejectionResult.completeAnalysis,
              ) as RuralOrHybridRetirementRejectionResultInterface,
            }),
            ...(result.ruralOrHybridRetirementRejectionResult
              .simplifiedAnalysis !== null && {
              ruralOrHybridRetirementRejectionSimplifiedAnalysis:
                result.ruralOrHybridRetirementRejectionResult
                  .simplifiedAnalysis,
            }),
            ...(result.ruralOrHybridRetirementRejectionResult.firstAnalysis !==
              null && {
              ruralOrHybridRetirementRejectionFirstAnalysis: JSON.parse(
                result.ruralOrHybridRetirementRejectionResult.firstAnalysis,
              ) as RuralOrHybridRetirementRejectionFirstAnalysisInterface,
            }),
            ...(result.ruralOrHybridRetirementRejectionResult
              .completeAnalysisDownload !== null && {
              ruralOrHybridRetirementRejectionCompleteAnalysisDownload:
                result.ruralOrHybridRetirementRejectionResult
                  .completeAnalysisDownload,
            }),
          }),
      }),
      ...(result.ruralOrHybridRetirementRejectionInssBenefit !== null && {
        ruralOrHybridRetirementRejectionInssBenefit:
          result.ruralOrHybridRetirementRejectionInssBenefit
            .filter(
              (
                b,
              ): b is typeof b & { inssBenefit: string } =>
                b.inssBenefit !== null,
            )
            .map((b) =>
              GetRuralOrHybridRetirementRejectionInssBenefitResponseDto.build({
                inssBenefit: b.inssBenefit,
              }),
            ),
      }),
      ...(result.ruralOrHybridRetirementRejectionLegalProceeding !== null && {
        ruralOrHybridRetirementRejectionLegalProceeding:
          result.ruralOrHybridRetirementRejectionLegalProceeding
            .filter(
              (
                p,
              ): p is typeof p & { legalProceedingNumber: string } =>
                p.legalProceedingNumber !== null,
            )
            .map((p) =>
              GetRuralOrHybridRetirementRejectionLegalProceedingResponseDto.build(
                {
                  legalProceedingNumber: p.legalProceedingNumber,
                },
              ),
            ),
      }),
      ...(result.ruralOrHybridRetirementRejectionPeriod !== null && {
        ruralOrHybridRetirementRejectionPeriod:
          result.ruralOrHybridRetirementRejectionPeriod.map((p) => {
            const periodMembers = (
              result.ruralOrHybridRetirementRejectionPeriodMember ?? []
            ).filter(
              (m) =>
                m.ruralOrHybridRetirementRejectionPeriodId.toString() ===
                p.id.toString(),
            );

            const periodDocuments = (
              result.ruralOrHybridRetirementRejectionPeriodDocument ?? []
            ).filter(
              (d) =>
                d.ruralOrHybridRetirementRejectionPeriodId.toString() ===
                p.id.toString(),
            );

            return GetRuralOrHybridRetirementRejectionPeriodResponseDto.build({
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
              ...(periodDocuments.length > 0 && {
                documents: periodDocuments.map((d) =>
                  GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto.build(
                    {
                      ...(d.type !== null && { type: d.type }),
                    },
                  ),
                ),
              }),
              ...(periodMembers.length > 0 && {
                members: periodMembers.map((m) => {
                  const memberDocuments = (
                    result.ruralOrHybridRetirementRejectionPeriodMemberDocument ??
                    []
                  ).filter(
                    (md) =>
                      md.ruralOrHybridRetirementRejectionPeriodMemberId.toString() ===
                      m.id.toString(),
                  );

                  return GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto.build(
                    {
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
                      ...(memberDocuments.length > 0 && {
                        documents: memberDocuments.map((md) =>
                          GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto.build(
                            {
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
      ...(result.ruralOrHybridRetirementRejectionTestimonialWitness !==
        null && {
        ruralOrHybridRetirementRejectionTestimonialWitness:
          result.ruralOrHybridRetirementRejectionTestimonialWitness.map((w) => {
            const witnessDocuments = (
              result.ruralOrHybridRetirementRejectionTestimonialWitnessDocument ??
              []
            ).filter(
              (wd) =>
                wd.ruralOrHybridRetirementRejectionTestimonialWitnessId.toString() ===
                w.id.toString(),
            );

            return GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto.build(
              {
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
                ...(witnessDocuments.length > 0 && {
                  documents: witnessDocuments.map((_wd) =>
                    GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto.build(
                      {},
                    ),
                  ),
                }),
              },
            );
          }),
      }),
      ...(result.ruralOrHybridRetirementRejectionWorkPeriod !== null && {
        ruralOrHybridRetirementRejectionWorkPeriod:
          result.ruralOrHybridRetirementRejectionWorkPeriod.map((wp) => {
            const workPeriodDocuments = (
              result.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? []
            ).filter(
              (d) =>
                d.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
                wp.id.toString(),
            );

            const workPeriodDocumentAnalyses = (
              result.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis ??
              []
            ).filter(
              (da) =>
                da.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
                wp.id.toString(),
            );

            const workPeriodEarningsHistory = (
              result.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory ??
              []
            ).filter(
              (eh) =>
                eh.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
                wp.id.toString(),
            );

            return GetRuralOrHybridRetirementRejectionWorkPeriodResponseDto.build(
              {
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
                ...(workPeriodDocuments.length > 0 && {
                  documents: workPeriodDocuments.map((d) =>
                    GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto.build(
                      {
                        ...(d.type !== null && { type: d.type }),
                      },
                    ),
                  ),
                }),
                ...(workPeriodDocumentAnalyses.length > 0 && {
                  documentAnalyses: workPeriodDocumentAnalyses.map((da) =>
                    GetRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisResponseDto.build(
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
                    GetRuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryResponseDto.build(
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
      ...(result.ruralOrHybridRetirementRejectionTimeAccelerator !== null && {
        ruralOrHybridRetirementRejectionTimeAccelerator:
          result.ruralOrHybridRetirementRejectionTimeAccelerator.map((ta) =>
            GetRuralOrHybridRetirementRejectionTimeAcceleratorResponseDto.build(
              {
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
              },
            ),
          ),
      }),
    });
  }

  private async buildCnisDocumentResponse(
    documentKey: string,
  ): Promise<GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto> {
    const fileBuffer =
      await this.fileProcessorGateway.getFileBuffer(documentKey);
    const originalFileName =
      await this.fileProcessorGateway.getOriginalFileName(documentKey);
    return GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto.build({
      document: Base64.encodeBuffer(fileBuffer),
      originalFileName,
    });
  }
}
