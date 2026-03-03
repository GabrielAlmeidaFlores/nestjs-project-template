import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/repository/medical-and-social-report-objection-generator-analysis/query/medical-and-social-report-objection-generator-analysis.query.repository.gateway';
import { MedicalAndSocialReportObjectionGeneratorAnalysisId } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/domain/schema/entity/medical-and-social-report-objection-generator-analysis/value-object/medical-and-social-report-objection-generator-analysis-id/medical-and-social-report-objection-generator-analysis-id.value-object';
import { MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-does-not-contain-complete-analysis.error';
import { MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError } from '@module/customer/analysis-tool/module/medical-and-social-report-objection-generator-analysis/error/medical-and-social-report-objection-generator-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadMedicalAndSocialReportObjectionGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(
      MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    )
    private readonly medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway: MedicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    medicalAndSocialReportObjectionGeneratorAnalysisId: MedicalAndSocialReportObjectionGeneratorAnalysisId,
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

    const medicalAndSocialReportObjectionGeneratorAnalysisQueryResult =
      await this.medicalAndSocialReportObjectionGeneratorAnalysisQueryRepositoryGateway.findOneByMedicalAndSocialReportObjectionGeneratorAnalysisIdAndOrganizationIdOrFail(
        medicalAndSocialReportObjectionGeneratorAnalysisId,
        organizationSessionData.organizationId,
        MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError,
      );

    if (
      !medicalAndSocialReportObjectionGeneratorAnalysisQueryResult.medicalAndSocialReportObjectionGeneratorAnalysisResult
    ) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError();
    }

    const responseAi =
      medicalAndSocialReportObjectionGeneratorAnalysisQueryResult
        .medicalAndSocialReportObjectionGeneratorAnalysisResult
        .medicalAndSocialReportObjectionGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_geradora_objeção_laudo_medico_social',
    );
  }
}
