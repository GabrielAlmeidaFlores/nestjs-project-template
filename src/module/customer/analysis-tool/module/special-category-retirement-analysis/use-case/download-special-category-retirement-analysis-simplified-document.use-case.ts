import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-result-not-found.error';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { GenerateSpecialCategoryRetirementAnalysisFullTextUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/generate-special-category-retirement-analysis-full-text.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase {
  protected readonly _type = DownloadSpecialCategoryRetirementAnalysisSimplifiedDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(GenerateSpecialCategoryRetirementAnalysisFullTextUseCase)
    private readonly generateFullTextUseCase: GenerateSpecialCategoryRetirementAnalysisFullTextUseCase,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        analysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    if (
      queryResult.analysisResult === null ||
      queryResult.analysisResult.simplifiedAnalysisSummaryText === null
    ) {
      await this.generateFullTextUseCase.execute(sessionData, organizationSessionData, analysisId);

      const updatedQueryResult =
        await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
          analysisId,
          organizationSessionData.organizationId,
          SpecialCategoryRetirementAnalysisNotFoundError,
        );

      const summaryText =
        updatedQueryResult.analysisResult?.simplifiedAnalysisSummaryText ??
        updatedQueryResult.analysisResult?.fullAnalysisConclusionText ??
        null;

      if (summaryText === null) {
        throw new SpecialCategoryRetirementAnalysisResultNotFoundError();
      }

      return this.exportDocumentGateway.downloadFileAsStreamable(
        summaryText,
        format,
        'analise_simplificada_aposentadoria_categoria_especial',
      );
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      queryResult.analysisResult.simplifiedAnalysisSummaryText,
      format,
      'analise_simplificada_aposentadoria_categoria_especial',
    );
  }
}
