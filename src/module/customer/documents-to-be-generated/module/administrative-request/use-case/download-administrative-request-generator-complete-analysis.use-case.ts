import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-does-not-contain-complete-analysis.error';
import { AdministrativeRequestGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadAdministrativeRequestGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(AdministrativeRequestGeneratorQueryRepositoryGateway)
    private readonly administrativeRequestGeneratorQueryRepositoryGateway: AdministrativeRequestGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    administrativeRequestGeneratorId: AdministrativeRequestGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const administrativeRequestGenerator =
      await this.administrativeRequestGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        administrativeRequestGeneratorId,
        AdministrativeRequestGeneratorNotFoundError,
      );

    const responseAi =
      administrativeRequestGenerator.administrativeRequestGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_gerador_requerimento_administrativo',
      exportOptions,
    );
  }
}
