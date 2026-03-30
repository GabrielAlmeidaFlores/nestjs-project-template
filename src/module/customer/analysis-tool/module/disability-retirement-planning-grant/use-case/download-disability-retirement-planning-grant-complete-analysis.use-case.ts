import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DisabilityRetirementPlanningGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant/query/disability-retirement-planning-grant.query.repository.gateway';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-complete-analysis-download-not-found.error';
import { DisabilityRetirementPlanningGrantNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/error/disability-retirement-planning-grant-not-found.error';
import type { DisabilityRetirementPlanningGrantResultInterface } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/model/interface/disability-retirement-planning-grant-result.interface';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadDisabilityRetirementPlanningGrantCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningGrantQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningGrantQueryRepositoryGateway: DisabilityRetirementPlanningGrantQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityRetirementPlanningGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
      disabilityRetirementPlanningGrantId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      DisabilityRetirementPlanningGrantNotFoundError,
    );

    const analysisQueryResult =
      await this.disabilityRetirementPlanningGrantQueryRepositoryGateway.findOneByDisabilityRetirementPlanningGrantIdOrFailWithRelations(
        disabilityRetirementPlanningGrantId,
        DisabilityRetirementPlanningGrantNotFoundError,
      );

    const completeAnalysisJson =
      analysisQueryResult.disabilityRetirementPlanningGrantResult
        ?.disabilityRetirementPlanningGrantCompleteAnalysis ?? null;

    if (completeAnalysisJson === null) {
      throw new DisabilityRetirementPlanningGrantCompleteAnalysisDownloadNotFoundError();
    }

    const analysisResult = this.extractAnalysisResult(completeAnalysisJson);

    if (analysisResult === null) {
      throw new DisabilityRetirementPlanningGrantCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(analysisResult);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_concessao_aposentadoria_deficiencia',
    );
  }

  private extractAnalysisResult(raw: string): string | null {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed =
        JSON.parse(cleanedJson) as DisabilityRetirementPlanningGrantResultInterface;

      return typeof parsed.analysisResult === 'string'
        ? parsed.analysisResult
        : null;
    } catch {
      return null;
    }
  }
}
