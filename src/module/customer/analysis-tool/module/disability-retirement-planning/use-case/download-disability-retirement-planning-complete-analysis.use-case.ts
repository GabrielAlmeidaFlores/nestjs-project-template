import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-does-not-contain-complete-analysis.error';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { DisabilityRetirementPlanningCompleteAnalysisModel } from '@module/customer/analysis-tool/module/disability-retirement-planning/model/generic/disability-retirement-planning-complete-analysis.model';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadDisabilityRetirementPlanningCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadDisabilityRetirementPlanningCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
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
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!queryResult) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const completeAnalysisJson =
      queryResult.result?.disabilityRetirementPlanningCompleteAnalysis ?? null;

    if (!queryResult.result || completeAnalysisJson === null) {
      throw new DisabilityRetirementPlanningDoesNotContainCompleteAnalysisError();
    }

    let analysisResult: string;
    try {
      const raw = JSON.parse(
        completeAnalysisJson,
      ) as DisabilityRetirementPlanningCompleteAnalysisModel;
      analysisResult = raw.analysisResult;
    } catch {
      analysisResult = completeAnalysisJson;
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      analysisResult,
      format,
      'analise_completa_aposentadoria_pcd',
    );
  }
}
