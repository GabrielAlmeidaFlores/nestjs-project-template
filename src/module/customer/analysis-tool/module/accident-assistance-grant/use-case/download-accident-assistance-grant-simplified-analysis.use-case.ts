import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { AccidentAssistanceGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/accident-assistance-grant.query.repository.gateway';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-grant/error/accident-assistance-grant-analysis-download-not-found.error';
import { AccidentAssistanceGrantNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-grant/error/accident-assistance-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadAccidentAssistanceGrantSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadAccidentAssistanceGrantSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceGrantQueryRepositoryGateway)
    private readonly accidentAssistanceGrantQueryRepositoryGateway: AccidentAssistanceGrantQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceGrantId: AccidentAssistanceGrantId,
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

    const grant =
      await this.accidentAssistanceGrantQueryRepositoryGateway.findOneByAccidentAssistanceGrantIdOrFailWithRelations(
        accidentAssistanceGrantId,
        AccidentAssistanceGrantNotFoundError,
      );

    const rawAnalysis =
      grant.accidentAssistanceGrantResult?.firstAnalysis ?? null;

    if (rawAnalysis === null) {
      throw new AccidentAssistanceGrantAnalysisDownloadNotFoundError();
    }

    const analysisText = this.extractField(rawAnalysis, 'analysisConclusion');

    if (analysisText === null) {
      throw new AccidentAssistanceGrantAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(analysisText);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_simplificada_concessao_auxilio_acidente',
    );
  }

  private extractField(raw: string, field: string): string | null {
    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      return typeof parsed[field] === 'string'
        ? (parsed[field] as string)
        : null;
    } catch {
      return raw;
    }
  }
}
