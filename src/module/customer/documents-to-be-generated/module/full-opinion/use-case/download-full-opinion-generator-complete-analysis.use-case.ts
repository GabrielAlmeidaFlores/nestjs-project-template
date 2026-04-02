import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { FullOpinionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/query/full-opinion-generator.query.repository.gateway';
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import { FullOpinionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-does-not-contain-complete-analysis.error';
import { FullOpinionGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadFullOpinionGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadFullOpinionGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(FullOpinionGeneratorQueryRepositoryGateway)
    private readonly fullOpinionGeneratorQueryRepositoryGateway: FullOpinionGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    fullOpinionGeneratorId: FullOpinionGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const fullOpinionGenerator =
      await this.fullOpinionGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        fullOpinionGeneratorId,
        FullOpinionGeneratorNotFoundError,
      );

    const responseAi =
      fullOpinionGenerator.fullOpinionGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new FullOpinionGeneratorDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_gerador_parecer_completo',
      exportOptions,
    );
  }
}
