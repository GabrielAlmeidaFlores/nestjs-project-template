import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { PovertyDeclarationGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/repository/poverty-declaration-generator-analysis-result/query/poverty-declaration-generator.query.repository.gateway';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';
import { PovertyDeclarationGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/poverty-declaration/error/poverty-declaration-generator-does-not-contain-complete-analysis.error';
import { PovertyDeclarationGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/poverty-declaration/error/poverty-declaration-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase {
  protected readonly _type = DownloadPovertyDeclarationGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(PovertyDeclarationGeneratorQueryRepositoryGateway)
    private readonly povertyDeclarationGeneratorQueryRepositoryGateway: PovertyDeclarationGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    povertyDeclarationGeneratorId: PovertyDeclarationGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const povertyDeclarationGenerator =
      await this.povertyDeclarationGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        povertyDeclarationGeneratorId,
        PovertyDeclarationGeneratorNotFoundError,
      );

    const responseAi = povertyDeclarationGenerator.povertyDeclarationGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new PovertyDeclarationGeneratorDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'declaracao_hipossuficiencia',
      exportOptions,
    );
  }
}
