import { Inject, Injectable } from '@nestjs/common';

import { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/enum/rural-or-hybrid-retirement-rejection-document-type.enum';
import {
  GetRuralOrHybridRetirementRejectionResponseDto,
  GetRuralOrHybridRetirementRejectionAnalysisToolClientResponseDto,
  GetRuralOrHybridRetirementRejectionCnisDocumentResponseDto,
  GetRuralOrHybridRetirementRejectionDocumentResponseDto,
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
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionResponseDto> {
    const [result, analysisToolRecord] = await Promise.all([
      this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      ),
      this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementRejectionIdOrFail(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      ),
    ]);

    const cnisDocumentEntity =
      (result.ruralOrHybridRetirementRejectionDocument ?? []).find(
        (doc) =>
          doc.type === RuralOrHybridRetirementRejectionDocumentTypeEnum.CNIS,
      ) ?? null;

    const cnisDocument =
      cnisDocumentEntity !== null && cnisDocumentEntity.document !== null
        ? await this.buildCnisDocumentResponse(cnisDocumentEntity.document)
        : null;

    const topLevelDocuments = await Promise.all(
      (result.ruralOrHybridRetirementRejectionDocument ?? [])
        .filter((doc) => doc.document !== null)
        .map(async (doc) => ({
          type: doc.type,
          ...(await this.buildSubEntityDocumentData(doc.document as string)),
        })),
    );

    const [
      allPeriodDocuments,
      allPeriodMemberDocuments,
      allTestimonialWitnessDocuments,
      allWorkPeriodDocuments,
    ] = await Promise.all([
      Promise.all(
        (result.ruralOrHybridRetirementRejectionPeriodDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            periodId: doc.ruralOrHybridRetirementRejectionPeriodId.toString(),
            type: doc.type,
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
      Promise.all(
        (result.ruralOrHybridRetirementRejectionPeriodMemberDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            memberId:
              doc.ruralOrHybridRetirementRejectionPeriodMemberId.toString(),
            type: doc.type,
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
      Promise.all(
        (
          result.ruralOrHybridRetirementRejectionTestimonialWitnessDocument ??
          []
        )
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            witnessId:
              doc.ruralOrHybridRetirementRejectionTestimonialWitnessId.toString(),
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
      Promise.all(
        (result.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? [])
          .filter((doc) => doc.document !== null)
          .map(async (doc) => ({
            workPeriodId:
              doc.ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
            type: doc.type,
            ...(await this.buildSubEntityDocumentData(doc.document as string)),
          })),
      ),
    ]);

    return GetRuralOrHybridRetirementRejectionResponseDto.build({
      ruralOrHybridRetirementRejectionId:
        result.ruralOrHybridRetirementRejectionId,
      analysisToolClient:
        GetRuralOrHybridRetirementRejectionAnalysisToolClientResponseDto.build({
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
      ...(result.applicationSubmissionDate !== null && {
        applicationSubmissionDate: result.applicationSubmissionDate,
      }),
      ...(result.dateOfRejection !== null && {
        dateOfRejection: result.dateOfRejection,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      ...(topLevelDocuments.length > 0 && {
        ruralOrHybridRetirementRejectionDocument: topLevelDocuments.map((d) =>
          GetRuralOrHybridRetirementRejectionDocumentResponseDto.build({
            document: d.document,
            originalFileName: d.originalFileName,
            ...(d.type !== null && { type: d.type }),
          }),
        ),
      }),
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
              (b): b is typeof b & { inssBenefit: string } =>
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
              (p): p is typeof p & { legalProceedingNumber: string } =>
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

            const periodDocumentsForPeriod = allPeriodDocuments.filter(
              (d) => d.periodId === p.id.toString(),
            );

            return GetRuralOrHybridRetirementRejectionPeriodResponseDto.build({
              ruralOrHybridRetirementRejectionPeriodId: p.id,
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
                  GetRuralOrHybridRetirementRejectionPeriodDocumentResponseDto.build(
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

                  return GetRuralOrHybridRetirementRejectionPeriodMemberResponseDto.build(
                    {
                      ruralOrHybridRetirementRejectionPeriodMemberId: m.id,
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
                          GetRuralOrHybridRetirementRejectionPeriodMemberDocumentResponseDto.build(
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
      ...(result.ruralOrHybridRetirementRejectionTestimonialWitness !==
        null && {
        ruralOrHybridRetirementRejectionTestimonialWitness:
          result.ruralOrHybridRetirementRejectionTestimonialWitness.map((w) => {
            const witnessDocumentsForWitness =
              allTestimonialWitnessDocuments.filter(
                (wd) => wd.witnessId === w.id.toString(),
              );

            return GetRuralOrHybridRetirementRejectionTestimonialWitnessResponseDto.build(
              {
                ruralOrHybridRetirementRejectionTestimonialWitnessId: w.id,
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
                    GetRuralOrHybridRetirementRejectionTestimonialWitnessDocumentResponseDto.build(
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
      ...(result.ruralOrHybridRetirementRejectionWorkPeriod !== null && {
        ruralOrHybridRetirementRejectionWorkPeriod:
          result.ruralOrHybridRetirementRejectionWorkPeriod.map((wp) => {
            const workPeriodDocumentsForWorkPeriod =
              allWorkPeriodDocuments.filter(
                (d) => d.workPeriodId === wp.id.toString(),
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
                ruralOrHybridRetirementRejectionWorkPeriodId: wp.id,
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
                    GetRuralOrHybridRetirementRejectionWorkPeriodDocumentResponseDto.build(
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
                ruralOrHybridRetirementRejectionTimeAcceleratorId: ta.id,
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
