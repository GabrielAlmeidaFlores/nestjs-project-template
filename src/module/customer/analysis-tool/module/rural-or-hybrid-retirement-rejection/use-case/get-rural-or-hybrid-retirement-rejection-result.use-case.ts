import { Inject, Injectable } from '@nestjs/common';

import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { GetRuralOrHybridRetirementRejectionResultResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/get-rural-or-hybrid-retirement-rejection.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';

import type { RuralOrHybridRetirementRejectionFirstAnalysisInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-first-analysis.interface';
import type { RuralOrHybridRetirementRejectionResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-result.interface';

@Injectable()
export class GetRuralOrHybridRetirementRejectionResultUseCase {
  protected readonly _type =
    GetRuralOrHybridRetirementRejectionResultUseCase.name;

  public constructor(
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
  ) {}

  public async execute(
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionResultResponseDto> {
    const result =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const rejectionResult = result.ruralOrHybridRetirementRejectionResult;

    if (!rejectionResult) {
      return GetRuralOrHybridRetirementRejectionResultResponseDto.build({});
    }

    return GetRuralOrHybridRetirementRejectionResultResponseDto.build({
      ...(rejectionResult.completeAnalysis !== null && {
        ruralOrHybridRetirementRejectionCompleteAnalysis: JSON.parse(
          rejectionResult.completeAnalysis,
        ) as RuralOrHybridRetirementRejectionResultInterface,
      }),
      ...(rejectionResult.simplifiedAnalysis !== null && {
        ruralOrHybridRetirementRejectionSimplifiedAnalysis:
          rejectionResult.simplifiedAnalysis,
      }),
      ...(rejectionResult.firstAnalysis !== null && {
        ruralOrHybridRetirementRejectionFirstAnalysis: JSON.parse(
          rejectionResult.firstAnalysis,
        ) as RuralOrHybridRetirementRejectionFirstAnalysisInterface,
      }),
      ...(rejectionResult.completeAnalysisDownload !== null && {
        ruralOrHybridRetirementRejectionCompleteAnalysisDownload:
          rejectionResult.completeAnalysisDownload,
      }),
    });
  }
}
