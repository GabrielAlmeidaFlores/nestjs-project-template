import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-result/command/rural-or-hybrid-retirement-rejection-result.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';
import { RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-complete-analysis-download-not-found.error';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-result-not-found.error';
import { RuralOrHybridRetirementRejectionResultInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/model/interface/rural-or-hybrid-retirement-rejection-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadRuralOrHybridRetirementRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionResultCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionResultCommandRepositoryGateway: RuralOrHybridRetirementRejectionResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralOrHybridRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralOrHybridRetirementRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralOrHybridRetirementRejectionNotFoundError,
    );

    const rejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const currentResult = rejection.ruralOrHybridRetirementRejectionResult;

    if (currentResult === null) {
      throw new RuralOrHybridRetirementRejectionResultNotFoundError();
    }

    let downloadContent = currentResult.completeAnalysisDownload;

    if (downloadContent === null) {
      if (currentResult.completeAnalysis === null) {
        throw new RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError();
      }

      const parsedResult = this.parseCompleteAnalysis(
        currentResult.completeAnalysis,
      );

      downloadContent = this.buildCompleteAnalysisDownload(parsedResult);

      if (downloadContent === null) {
        throw new RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError();
      }

      const updatedResult = this.buildUpdatedResultEntity(
        currentResult,
        {
          completeAnalysisDownload: downloadContent,
        },
        ruralOrHybridRetirementRejectionId,
      );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        this.ruralOrHybridRetirementRejectionResultCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionResult(
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
      'analise_completa_indeferimento_aposentadoria_rural_hibrida',
    );
  }

  private parseCompleteAnalysis(
    raw: string,
  ): RuralOrHybridRetirementRejectionResultInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    const parsed = JSON.parse(
      cleanedJson,
    ) as RuralOrHybridRetirementRejectionResultInterface;

    return parsed;
  }

  private buildCompleteAnalysisDownload(
    parsedResult: RuralOrHybridRetirementRejectionResultInterface,
  ): string | null {
    if (parsedResult.analysisResult.trim() === '') {
      return null;
    }

    return parsedResult.analysisResult;
  }

  private buildUpdatedResultEntity(
    currentResult: RuralOrHybridRetirementRejectionResultEntity,
    overrides: {
      completeAnalysisDownload?: string | null;
      simplifiedAnalysis?: string | null;
      simplifiedAnalysisDownload?: string | null;
    },
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
  ): RuralOrHybridRetirementRejectionResultEntity {
    return new RuralOrHybridRetirementRejectionResultEntity({
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
      ruralOrHybridRetirementRejectionId,
      createdAt: currentResult.createdAt,
      updatedAt: currentResult.updatedAt,
      deletedAt: currentResult.deletedAt,
    });
  }
}
