import { Inject, Injectable } from '@nestjs/common';

import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { MaternityPayGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/query/maternity-pay-grant.query.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import {
  GetMaternityPayGrantCnisDocumentResponseDto,
  GetMaternityPayGrantInssBenefitResponseDto,
  GetMaternityPayGrantLegalProceedingResponseDto,
  GetMaternityPayGrantPeriodEarningsHistoryResponseDto,
  GetMaternityPayGrantPeriodResponseDto,
  GetMaternityPayGrantResponseDto,
  GetMaternityPayGrantResultResponseDto,
} from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/get-maternity-pay-grant.response.dto';
import { MaternityPayGrantNotFoundError } from '@module/customer/analysis-tool/module/maternity-pay-grant/error/maternity-pay-grant-not-found.error';

@Injectable()
export class GetMaternityPayGrantUseCase {
  protected readonly _type = GetMaternityPayGrantUseCase.name;

  public constructor(
    @Inject(MaternityPayGrantQueryRepositoryGateway)
    private readonly maternityPayGrantQueryRepositoryGateway: MaternityPayGrantQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    maternityPayGrantId: MaternityPayGrantId,
  ): Promise<GetMaternityPayGrantResponseDto> {
    const result =
      await this.maternityPayGrantQueryRepositoryGateway.findOneByMaternityPayGrantIdOrFailWithRelations(
        maternityPayGrantId,
        MaternityPayGrantNotFoundError,
      );

    const cnisDocument =
      result.cnisDocument !== null
        ? await this.buildCnisDocumentResponse(result.cnisDocument)
        : null;

    return GetMaternityPayGrantResponseDto.build({
      id: result.id,
      ...(result.analysisName !== null && {
        analysisName: result.analysisName,
      }),
      ...(result.category !== null && { category: result.category }),
      ...(result.triggeringEvent !== null && {
        triggeringEvent: result.triggeringEvent,
      }),
      ...(result.triggeringEventDate !== null && {
        triggeringEventDate: result.triggeringEventDate,
      }),
      ...(result.isCurrentlyUnemployed !== null && {
        isCurrentlyUnemployed: result.isCurrentlyUnemployed,
      }),
      ...(result.isUnemployedAtTriggeringEventDate !== null && {
        isUnemployedAtTriggeringEventDate:
          result.isUnemployedAtTriggeringEventDate,
      }),
      ...(result.isRuralInsured !== null && {
        isRuralInsured: result.isRuralInsured,
      }),
      ...(result.ruralPeriodStartDate !== null && {
        ruralPeriodStartDate: result.ruralPeriodStartDate,
      }),
      ...(result.ruralPeriodEndDate !== null && {
        ruralPeriodEndDate: result.ruralPeriodEndDate,
      }),
      ...(result.ruralPeriodDocumentDescription !== null && {
        ruralPeriodDocumentDescription: result.ruralPeriodDocumentDescription,
      }),
      ...(cnisDocument !== null && { cnisDocument }),
      ...(result.maternityPayGrantResult !== null && {
        maternityPayGrantResult: GetMaternityPayGrantResultResponseDto.build({
          ...(result.maternityPayGrantResult.firstAnalysis !== null && {
            firstAnalysis: result.maternityPayGrantResult.firstAnalysis,
          }),
          ...(result.maternityPayGrantResult.completeAnalysis !== null && {
            completeAnalysis: result.maternityPayGrantResult.completeAnalysis,
          }),
          ...(result.maternityPayGrantResult.simplifiedAnalysis !== null && {
            simplifiedAnalysis:
              result.maternityPayGrantResult.simplifiedAnalysis,
          }),
          ...(result.maternityPayGrantResult.completeAnalysisDownload !==
            null && {
            completeAnalysisDownload:
              result.maternityPayGrantResult.completeAnalysisDownload,
          }),
        }),
      }),
      ...(result.maternityPayGrantInssBenefit !== null && {
        maternityPayGrantInssBenefit: result.maternityPayGrantInssBenefit.map(
          (b) =>
            GetMaternityPayGrantInssBenefitResponseDto.build({
              inssBenefitNumber: b.inssBenefitNumber,
            }),
        ),
      }),
      ...(result.maternityPayGrantLegalProceeding !== null && {
        maternityPayGrantLegalProceeding:
          result.maternityPayGrantLegalProceeding.map((p) =>
            GetMaternityPayGrantLegalProceedingResponseDto.build({
              legalProceedingNumber: p.legalProceedingNumber,
            }),
          ),
      }),
      ...(result.maternityPayGrantPeriod !== null && {
        maternityPayGrantPeriod: result.maternityPayGrantPeriod.map((p) => {
          const periodEarningsHistory = (
            result.maternityPayGrantEarningsHistory ?? []
          ).filter(
            (eh) =>
              eh.maternityPayGrantPeriodId?.toString() === p.id.toString(),
          );

          return GetMaternityPayGrantPeriodResponseDto.build({
            startDate: p.startDate,
            ...(p.endDate !== null && { endDate: p.endDate }),
            category: p.category,
            isPendency: p.isPendency,
            competenceBelowTheMinimum: p.competenceBelowTheMinimum,
            ...(p.pendencyReason !== null && {
              pendencyReason: p.pendencyReason,
            }),
            ...(p.typeOfContribution !== null && {
              typeOfContribution: p.typeOfContribution,
            }),
            status: p.status,
            ...(p.periodConsideration !== null && {
              periodConsideration: p.periodConsideration,
            }),
            ...(p.contributionAverage !== null && {
              contributionAverage: p.contributionAverage,
            }),
            ...(p.bondOrigin !== null && { bondOrigin: p.bondOrigin }),
            ...(p.complementViaMyInss !== null && {
              complementViaMyInss: p.complementViaMyInss,
            }),
            ...(periodEarningsHistory.length > 0 && {
              earningsHistory: periodEarningsHistory.map((eh) =>
                GetMaternityPayGrantPeriodEarningsHistoryResponseDto.build({
                  ...(eh.competence !== null && { competence: eh.competence }),
                  ...(eh.remuneration !== null && {
                    remuneration: eh.remuneration,
                  }),
                  ...(eh.indicators !== null && { indicators: eh.indicators }),
                  ...(eh.paymentDate !== null && {
                    paymentDate: eh.paymentDate,
                  }),
                  ...(eh.contribution !== null && {
                    contribution: eh.contribution,
                  }),
                  ...(eh.contributionSalary !== null && {
                    contributionSalary: eh.contributionSalary,
                  }),
                  ...(eh.analysis !== null && { analysis: eh.analysis }),
                  ...(eh.competenceBelowTheMinimum !== null && {
                    competenceBelowTheMinimum: eh.competenceBelowTheMinimum,
                  }),
                }),
              ),
            }),
          });
        }),
      }),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }

  private async buildCnisDocumentResponse(
    document: string,
  ): Promise<GetMaternityPayGrantCnisDocumentResponseDto> {
    const [documentUrl, originalFileName] = await Promise.all([
      this.fileProcessorGateway.getFileSignedUrl(document),
      this.fileProcessorGateway.getOriginalFileName(document),
    ]);

    return GetMaternityPayGrantCnisDocumentResponseDto.build({
      document: documentUrl.toString(),
      originalFileName,
    });
  }
}
