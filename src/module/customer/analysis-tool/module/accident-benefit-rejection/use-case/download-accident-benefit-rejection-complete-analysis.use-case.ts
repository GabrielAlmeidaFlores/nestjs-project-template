import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-complete-analysis-download-not-found.error';
import { AccidentBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/accident-benefit-rejection/error/accident-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { AccidentBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/accident-benefit-rejection/model/interface/accident-benefit-rejection-result.interface';

@Injectable()
export class DownloadAccidentBenefitRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadAccidentBenefitRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AccidentBenefitRejectionQueryRepositoryGateway)
    private readonly accidentBenefitRejectionQueryRepositoryGateway: AccidentBenefitRejectionQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentBenefitRejectionId: AccidentBenefitRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAccidentBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      accidentBenefitRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      AccidentBenefitRejectionNotFoundError,
    );

    const rejection =
      await this.accidentBenefitRejectionQueryRepositoryGateway.findOneByAccidentBenefitRejectionIdOrFailWithRelations(
        accidentBenefitRejectionId,
        AccidentBenefitRejectionNotFoundError,
      );

    const completeAnalysisJson =
      rejection.accidentBenefitRejectionResult?.completeAnalysis ?? null;

    if (completeAnalysisJson === null) {
      throw new AccidentBenefitRejectionCompleteAnalysisDownloadNotFoundError();
    }

    const analysisResult = this.extractAnalysisResult(completeAnalysisJson);

    if (analysisResult === null) {
      throw new AccidentBenefitRejectionCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(analysisResult);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_indeferimento_acidente',
    );
  }

  private extractAnalysisResult(raw: string): string | null {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as AccidentBenefitRejectionResultInterface;

      return typeof parsed.analysisResult === 'string'
        ? parsed.analysisResult
        : null;
    } catch {
      return null;
    }
  }
}
