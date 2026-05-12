import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-does-not-contain-complete-analysis.error';
import { SpecialRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-not-found.error';
import { SpecialRetirementRejectionResultNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-rejection/error/special-retirement-rejection-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

import type { SpecialRetirementRejectionCompleteAnalysisInterface } from '@module/customer/analysis-tool/module/special-retirement-rejection/interface/special-retirement-rejection-complete-analysis.interface';

@Injectable()
export class DownloadSpecialRetirementRejectionCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadSpecialRetirementRejectionCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementRejectionId: SpecialRetirementRejectionId,
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

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementRejectionIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementRejectionId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementRejectionNotFoundError,
      );

    const specialRetirementRejection =
      analysisToolRecordQueryResult.specialRetirementRejection;

    if (specialRetirementRejection === null) {
      throw new SpecialRetirementRejectionNotFoundError();
    }

    const currentResult =
      specialRetirementRejection.specialRetirementRejectionResult;

    if (currentResult === null) {
      throw new SpecialRetirementRejectionResultNotFoundError();
    }

    if (currentResult.completeAnalysis === null) {
      throw new SpecialRetirementRejectionDoesNotContainCompleteAnalysisError();
    }

    const parsedCompleteAnalysis = this.parseCompleteAnalysis(
      currentResult.completeAnalysis,
    );

    if (parsedCompleteAnalysis.analysisResult.trim() === '') {
      throw new SpecialRetirementRejectionDoesNotContainCompleteAnalysisError();
    }

    const htmlContent = await this.exportDocumentGateway.convertMarkdownToHtml(
      parsedCompleteAnalysis.analysisResult,
    );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      format,
      'analise_completa_indeferimento_aposentadoria_especial',
    );
  }

  private parseCompleteAnalysis(
    raw: string,
  ): SpecialRetirementRejectionCompleteAnalysisInterface {
    let cleanedJson = raw;

    if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
      cleanedJson = JSON.parse(cleanedJson) as string;
    }

    return JSON.parse(
      cleanedJson,
    ) as SpecialRetirementRejectionCompleteAnalysisInterface;
  }
}
