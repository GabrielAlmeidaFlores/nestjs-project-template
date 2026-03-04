import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/command/special-category-retirement-analysis.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/command/special-category-retirement-analysis-work-period.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/command/special-category-retirement-analysis-remuneration.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-conversion-item/command/special-category-retirement-analysis-result-conversion-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-result-rule-item/command/special-category-retirement-analysis-result-rule-item.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/special-category-retirement-analysis-remuneration.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { DeleteSpecialCategoryRetirementAnalysisResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/delete-special-category-retirement-analysis.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DeleteSpecialCategoryRetirementAnalysisUseCase {
  protected readonly _type = DeleteSpecialCategoryRetirementAnalysisUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisCommandRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisCommandRepositoryGateway: SpecialCategoryRetirementAnalysisCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway)
    private readonly periodDocumentCommandRepositoryGateway: SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway)
    private readonly workPeriodCommandRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway)
    private readonly remunerationQueryRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway)
    private readonly remunerationCommandRepositoryGateway: SpecialCategoryRetirementAnalysisRemunerationCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway)
    private readonly conversionItemCommandRepositoryGateway: SpecialCategoryRetirementAnalysisResultConversionItemCommandRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway)
    private readonly ruleItemCommandRepositoryGateway: SpecialCategoryRetirementAnalysisResultRuleItemCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    id: SpecialCategoryRetirementAnalysisId,
  ): Promise<DeleteSpecialCategoryRetirementAnalysisResponseDto> {
    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        id,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    const transactions: TransactionType[] = [];

    for (const wp of queryResult.workPeriods) {
      transactions.push(
        this.periodDocumentCommandRepositoryGateway.deleteAllByWorkPeriodId(
          wp.specialCategoryRetirementAnalysisWorkPeriodId,
        ),
      );
      transactions.push(
        this.workPeriodCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisWorkPeriod(
          wp.specialCategoryRetirementAnalysisWorkPeriodId,
        ),
      );
    }

    const remunerations = await this.remunerationQueryRepositoryGateway.listByAnalysisId(id);

    for (const rem of remunerations) {
      transactions.push(
        this.remunerationCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysisRemuneration(
          rem.specialCategoryRetirementAnalysisRemunerationId,
        ),
      );
    }

    if (queryResult.analysisResult !== null) {
      transactions.push(
        this.conversionItemCommandRepositoryGateway.deleteAllByResultId(
          queryResult.analysisResult.specialCategoryRetirementAnalysisResultId,
        ),
      );
      transactions.push(
        this.ruleItemCommandRepositoryGateway.deleteAllByResultId(
          queryResult.analysisResult.specialCategoryRetirementAnalysisResultId,
        ),
      );
    }

    transactions.push(
      this.specialCategoryRetirementAnalysisCommandRepositoryGateway.deleteSpecialCategoryRetirementAnalysis(id),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute(transactions);

    await transaction.commit();

    return DeleteSpecialCategoryRetirementAnalysisResponseDto.build({
      specialCategoryRetirementAnalysisId: id,
    });
  }
}
