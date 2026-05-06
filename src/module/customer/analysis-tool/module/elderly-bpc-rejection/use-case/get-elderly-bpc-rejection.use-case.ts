import { Inject, Injectable } from '@nestjs/common';

import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import {
  GetElderlyBpcRejectionResponseDto,
  GetElderlyBpcRejectionDocumentResponseDto,
  GetElderlyBpcRejectionFamiliarGroupResponseDto,
  GetElderlyBpcRejectionFamiliarGroupDocumentResponseDto,
  GetElderlyBpcRejectionInssBenefitResponseDto,
  GetElderlyBpcRejectionLegalProceedingResponseDto,
  GetElderlyBpcRejectionResultResponseDto,
} from '@module/customer/analysis-tool/module/elderly-bpc-rejection/dto/response/get-elderly-bpc-rejection.response.dto';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';

import type { ElderlyBpcRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/interface/elderly-bpc-rejection-complete-analysis.interface';

@Injectable()
export class GetElderlyBpcRejectionUseCase {
  protected readonly _type = GetElderlyBpcRejectionUseCase.name;

  public constructor(
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
  ) {}

  public async execute(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): Promise<GetElderlyBpcRejectionResponseDto> {
    const result =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const documentDtos = (result.elderlyBpcRejectionDocument ?? []).map(
      (doc) => {
        return GetElderlyBpcRejectionDocumentResponseDto.build({
          elderlyBpcRejectionDocumentId: doc.id,
          ...(doc.type !== null && { type: doc.type }),
        });
      },
    );

    const inssBenefitDtos = (result.elderlyBpcRejectionInssBenefit ?? []).map(
      (inssBenefit) =>
        GetElderlyBpcRejectionInssBenefitResponseDto.build({
          ...(inssBenefit.inssBenefit !== null && {
            inssBenefit: inssBenefit.inssBenefit,
          }),
        }),
    );

    const legalProceedingDtos = (
      result.elderlyBpcRejectionLegalProceeding ?? []
    ).map((legalProceeding) =>
      GetElderlyBpcRejectionLegalProceedingResponseDto.build({
        ...(legalProceeding.legalProceedingNumber !== null && {
          legalProceedingNumber: legalProceeding.legalProceedingNumber,
        }),
      }),
    );

    const allFamiliarGroupDocuments =
      result.elderlyBpcRejectionFamiliarGroupDocument ?? [];

    const familiarGroupDtos = (
      result.elderlyBpcRejectionFamiliarGroup ?? []
    ).map((group) => {
      const groupDocuments = allFamiliarGroupDocuments
        .filter(
          (doc) =>
            doc.elderlyBpcRejectionFamiliarGroupId.toString() ===
            group.id.toString(),
        )
        .map((doc) =>
          GetElderlyBpcRejectionFamiliarGroupDocumentResponseDto.build({
            elderlyBpcRejectionFamiliarGroupDocumentId: doc.id,
            ...(doc.type !== null && { type: doc.type }),
          }),
        );

      return GetElderlyBpcRejectionFamiliarGroupResponseDto.build({
        elderlyBpcRejectionFamiliarGroupId: group.id,
        ...(group.fullName !== null && { fullName: group.fullName }),
        ...(group.birthDate !== null && { birthDate: group.birthDate }),
        ...(group.kinship !== null && { kinship: group.kinship }),
        ...(group.livesInSameResidence !== null && {
          livesInSameResidence: group.livesInSameResidence,
        }),
        ...(group.hasIncome !== null && { hasIncome: group.hasIncome }),
        ...(group.monthlyIncome !== null && {
          monthlyIncome: group.monthlyIncome,
        }),
        ...(group.incomeType !== null && { incomeType: group.incomeType }),
        ...(group.hasSupportingDocuments !== null && {
          hasSupportingDocuments: group.hasSupportingDocuments,
        }),
        ...(groupDocuments.length > 0 && { documents: groupDocuments }),
      });
    });

    const currentResult = result.elderlyBpcRejectionResult;

    const resultDto =
      currentResult !== null
        ? GetElderlyBpcRejectionResultResponseDto.build({
            ...(currentResult.completeAnalysis !== null && {
              elderlyBpcRejectionCompleteAnalysis: this.parseCompleteAnalysis(
                currentResult.completeAnalysis,
              ),
            }),
            ...(currentResult.simplifiedAnalysis !== null && {
              elderlyBpcRejectionSimplifiedAnalysis:
                currentResult.simplifiedAnalysis,
            }),
          })
        : undefined;

    return GetElderlyBpcRejectionResponseDto.build({
      elderlyBpcRejectionId: result.elderlyBpcRejectionId,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.category !== null && { category: result.category }),
      ...(result.maritalStatus !== null && {
        maritalStatus: result.maritalStatus,
      }),
      ...(result.applicantLivesAlone !== null && {
        applicantLivesAlone: result.applicantLivesAlone,
      }),
      createdAt: result.createdAt,
      ...(inssBenefitDtos.length > 0 && {
        elderlyBpcRejectionInssBenefit: inssBenefitDtos,
      }),
      ...(legalProceedingDtos.length > 0 && {
        elderlyBpcRejectionLegalProceeding: legalProceedingDtos,
      }),
      ...(documentDtos.length > 0 && {
        elderlyBpcRejectionDocument: documentDtos,
      }),
      ...(familiarGroupDtos.length > 0 && {
        elderlyBpcRejectionFamiliarGroup: familiarGroupDtos,
      }),
      ...(resultDto !== undefined && {
        elderlyBpcRejectionResult: resultDto,
      }),
    });
  }

  private parseCompleteAnalysis(
    raw: string,
  ): ElderlyBpcRejectionCompleteAnalysisInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as ElderlyBpcRejectionCompleteAnalysisInterface;
  }
}
