import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RuralOrHybridRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/rural-or-hybrid-retirement-analysis.query.repository.gateway';
import { RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-result/command/rural-or-hybrid-retirement-analysis-result.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import { RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-complete-analysis-download-not-found.error';
import { RuralOrHybridRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-not-found.error';
import { RuralOrHybridRetirementAnalysisResultNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/error/rural-or-hybrid-retirement-analysis-result-not-found.error';
import { RuralOrHybridRetirementAnalysisResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/interface/rural-or-hybrid-retirement-analysis-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadRuralOrHybridRetirementAnalysisCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisQueryRepositoryGateway: RuralOrHybridRetirementAnalysisQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway: RuralOrHybridRetirementAnalysisResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralOrHybridRetirementAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralOrHybridRetirementAnalysisNotFoundError,
    );

    const analysis =
      await this.ruralOrHybridRetirementAnalysisQueryRepositoryGateway.findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
        ruralOrHybridRetirementAnalysisId,
        RuralOrHybridRetirementAnalysisNotFoundError,
      );

    const currentResult = analysis.ruralOrHybridRetirementAnalysisResult;

    if (currentResult === null) {
      throw new RuralOrHybridRetirementAnalysisResultNotFoundError();
    }

    let downloadContent = currentResult.completeAnalysisDownload;

    if (downloadContent === null) {
      if (currentResult.completeAnalysis === null) {
        throw new RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError();
      }

      const parsedResult = this.parseCompleteAnalysis(
        currentResult.completeAnalysis,
      );

      downloadContent = this.buildCompleteAnalysisDownload(parsedResult);

      if (downloadContent === null) {
        throw new RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError();
      }

      const updatedResult = this.buildUpdatedResultEntity(
        currentResult,
        {
          completeAnalysisDownload: downloadContent,
        },
        ruralOrHybridRetirementAnalysisId,
      );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        this.ruralOrHybridRetirementAnalysisResultCommandRepositoryGateway.updateRuralOrHybridRetirementAnalysisResult(
          updatedResult,
        ),
      ]);

      await transaction.commit();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(downloadContent);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_analise_aposentadoria_rural_hibrida',
    );
  }

  private parseCompleteAnalysis(
    raw: string,
  ): RuralOrHybridRetirementAnalysisResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed = JSON.parse(
      cleanedJson,
    ) as RuralOrHybridRetirementAnalysisResultInterface;

    return parsed;
  }

  private buildCompleteAnalysisDownload(
    parsedResult: RuralOrHybridRetirementAnalysisResultInterface,
  ): string | null {
    if (parsedResult.analysisResult.trim() === '') {
      return null;
    }

    return parsedResult.analysisResult;
  }

  private buildUpdatedResultEntity(
    currentResult: RuralOrHybridRetirementAnalysisResultEntity,
    overrides: {
      completeAnalysisDownload?: string | null;
      simplifiedAnalysis?: string | null;
      simplifiedAnalysisDownload?: string | null;
    },
    ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId,
  ): RuralOrHybridRetirementAnalysisResultEntity {
    return new RuralOrHybridRetirementAnalysisResultEntity({
      id: currentResult.id,
      firstAnalysis: currentResult.firstAnalysis,
      secondAnalysis: currentResult.secondAnalysis,
      completeAnalysis: currentResult.completeAnalysis,
      simplifiedAnalysis:
        overrides.simplifiedAnalysis ?? currentResult.simplifiedAnalysis,
      completeAnalysisDownload:
        overrides.completeAnalysisDownload ??
        currentResult.completeAnalysisDownload,
      simplifiedAnalysisDownload:
        overrides.simplifiedAnalysisDownload ??
        currentResult.simplifiedAnalysisDownload,
      ruralOrHybridRetirementAnalysisId,
      createdAt: currentResult.createdAt,
      updatedAt: currentResult.updatedAt,
      deletedAt: currentResult.deletedAt,
    });
  }
}
