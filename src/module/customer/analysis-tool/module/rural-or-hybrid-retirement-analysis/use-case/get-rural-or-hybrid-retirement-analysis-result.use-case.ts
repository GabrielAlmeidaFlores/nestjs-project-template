import { Inject, Injectable } from '@nestjs/common';

import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { GetRuralOrHybridRetirementAnalysisResultResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/dto/response/get-rural-or-hybrid-retirement-analysis.response.dto';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';

import type { RuralOrHybridRetirementAnalysisFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-first-analysis.interface';
import type { RuralOrHybridRetirementAnalysisResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-result.interface';

@Injectable()
export class GetRuralOrHybridRetirementAnalysisResultUseCase {
  protected readonly _type =
    GetRuralOrHybridRetirementAnalysisResultUseCase.name;

  public constructor(
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): Promise<GetRuralOrHybridRetirementAnalysisResultResponseDto> {
    const result =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const analysisResult = result.ruralOrHybridRetirementAnalysisResult;

    if (!analysisResult) {
      return GetRuralOrHybridRetirementAnalysisResultResponseDto.build({});
    }

    return GetRuralOrHybridRetirementAnalysisResultResponseDto.build({
      ...(analysisResult.completeAnalysis !== null && {
        ruralOrHybridRetirementAnalysisCompleteAnalysis: JSON.parse(
          analysisResult.completeAnalysis,
        ) as RuralOrHybridRetirementAnalysisResultInterface,
      }),
      ...(analysisResult.simplifiedAnalysis !== null && {
        ruralOrHybridRetirementAnalysisSimplifiedAnalysis:
          analysisResult.simplifiedAnalysis,
      }),
      ...(analysisResult.firstAnalysis !== null && {
        ruralOrHybridRetirementAnalysisFirstAnalysis: JSON.parse(
          analysisResult.firstAnalysis,
        ) as RuralOrHybridRetirementAnalysisFirstAnalysisInterface,
      }),
      ...(analysisResult.completeAnalysisDownload !== null && {
        ruralOrHybridRetirementAnalysisCompleteAnalysisDownload:
          analysisResult.completeAnalysisDownload,
      }),
    });
  }
}
