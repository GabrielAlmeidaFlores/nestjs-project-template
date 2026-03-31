import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-does-not-contain-complete-analysis.error';
import { DisabilityAssessmentForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadDisabilityAssessmentForBpcCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadDisabilityAssessmentForBpcCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisQueryRepositoryGateway: DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
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

    const disabilityAssessmentForBpcAnalysisQueryResult =
      await this.disabilityAssessmentForBpcAnalysisQueryRepositoryGateway.findOneByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    if (
      !disabilityAssessmentForBpcAnalysisQueryResult.disabilityAssessmentForBpcAnalysisResult
    ) {
      throw new DisabilityAssessmentForBpcAnalysisNotFoundError();
    }

    const responseAi =
      disabilityAssessmentForBpcAnalysisQueryResult
        .disabilityAssessmentForBpcAnalysisResult
        .disabilityAssessmentForBpcCompleteAnalysis;

    if (responseAi === null) {
      throw new DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_avaliacao_deficiencia_para_bpc',
      exportOptions,
    );
  }
}
