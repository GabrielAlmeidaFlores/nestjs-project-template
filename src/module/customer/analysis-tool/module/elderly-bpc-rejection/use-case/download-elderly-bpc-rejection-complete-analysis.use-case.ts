import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { ElderlyBpcRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection/query/elderly-bpc-rejection.query.repository.gateway';
import { ElderlyBpcRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-result/command/elderly-bpc-rejection-result.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';
import { ElderlyBpcRejectionCompleteAnalysisNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-complete-analysis-not-found.error';
import { ElderlyBpcRejectionNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-not-found.error';
import { ElderlyBpcRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/error/elderly-bpc-rejection-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { ElderlyBpcRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/interface/elderly-bpc-rejection-complete-analysis.interface';

@Injectable()
export class DownloadElderlyBpcRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadElderlyBpcRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionQueryRepositoryGateway)
    private readonly elderlyBpcRejectionQueryRepositoryGateway: ElderlyBpcRejectionQueryRepositoryGateway,
    @Inject(ElderlyBpcRejectionResultCommandRepositoryGateway)
    private readonly elderlyBpcRejectionResultCommandRepositoryGateway: ElderlyBpcRejectionResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByElderlyBpcRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      elderlyBpcRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      ElderlyBpcRejectionNotFoundError,
    );

    const rejection =
      await this.elderlyBpcRejectionQueryRepositoryGateway.findOneByElderlyBpcRejectionIdOrFailWithRelations(
        elderlyBpcRejectionId,
        ElderlyBpcRejectionNotFoundError,
      );

    const currentResult = rejection.elderlyBpcRejectionResult;

    if (currentResult === null) {
      throw new ElderlyBpcRejectionResultNotFoundError();
    }

    let downloadContent = currentResult.completeAnalysisDownload;

    if (downloadContent === null) {
      if (currentResult.completeAnalysis === null) {
        throw new ElderlyBpcRejectionCompleteAnalysisNotFoundError();
      }

      const parsedResult = this.parseCompleteAnalysis(
        currentResult.completeAnalysis,
      );

      downloadContent = parsedResult.analysisResult;

      const updatedResult = this.buildUpdatedResultEntity(
        currentResult,
        { completeAnalysisDownload: downloadContent },
        elderlyBpcRejectionId,
      );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        this.elderlyBpcRejectionResultCommandRepositoryGateway.updateElderlyBpcRejectionResult(
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
      'analise_completa_indeferimento_bpc_idoso',
    );
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

  private buildUpdatedResultEntity(
    currentResult: ElderlyBpcRejectionResultEntity,
    overrides: { completeAnalysisDownload?: string | null },
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): ElderlyBpcRejectionResultEntity {
    return new ElderlyBpcRejectionResultEntity({
      id: currentResult.id,
      completeAnalysis: currentResult.completeAnalysis,
      simplifiedAnalysis: currentResult.simplifiedAnalysis,
      completeAnalysisDownload:
        overrides.completeAnalysisDownload ??
        currentResult.completeAnalysisDownload,
      simplifiedAnalysisDownload: currentResult.simplifiedAnalysisDownload,
      elderlyBpcRejectionId,
    });
  }
}
