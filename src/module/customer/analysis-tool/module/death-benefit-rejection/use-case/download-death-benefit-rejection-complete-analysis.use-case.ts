import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DeathBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/death-benefit-rejection.query.repository.gateway';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionCompleteAnalysisDownloadNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-complete-analysis-download-not-found.error';
import { DeathBenefitRejectionNotFoundError } from '@module/customer/analysis-tool/module/death-benefit-rejection/error/death-benefit-rejection-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { DeathBenefitRejectionResultInterface } from '@module/customer/analysis-tool/module/death-benefit-rejection/model/interface/death-benefit-rejection-result.interface';

@Injectable()
export class DownloadDeathBenefitRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadDeathBenefitRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(DeathBenefitRejectionQueryRepositoryGateway)
    private readonly deathBenefitRejectionQueryRepositoryGateway: DeathBenefitRejectionQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    deathBenefitRejectionId: DeathBenefitRejectionId,
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

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDeathBenefitRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
      deathBenefitRejectionId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      DeathBenefitRejectionNotFoundError,
    );

    const analysisQueryResult =
      await this.deathBenefitRejectionQueryRepositoryGateway.findOneByDeathBenefitRejectionIdOrFailWithRelations(
        deathBenefitRejectionId,
        DeathBenefitRejectionNotFoundError,
      );

    const completeAnalysisJson =
      analysisQueryResult.deathBenefitRejectionResult
        ?.deathBenefitRejectionCompleteAnalysis ?? null;

    if (completeAnalysisJson === null) {
      throw new DeathBenefitRejectionCompleteAnalysisDownloadNotFoundError();
    }

    const analysisDescription =
      this.extractAnalysisDescription(completeAnalysisJson);

    if (analysisDescription === null) {
      throw new DeathBenefitRejectionCompleteAnalysisDownloadNotFoundError();
    }

    const htmlContent =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        analysisDescription,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_pensao_por_morte',
    );
  }

  private extractAnalysisDescription(raw: string): string | null {
    try {
      let cleanedJson = raw;

      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = JSON.parse(cleanedJson) as string;
      }

      const parsed = JSON.parse(
        cleanedJson,
      ) as DeathBenefitRejectionResultInterface;

      return typeof parsed.analysisDescription === 'string'
        ? parsed.analysisDescription
        : null;
    } catch {
      return null;
    }
  }
}
