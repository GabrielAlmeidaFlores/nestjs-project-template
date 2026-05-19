import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { PowerOfAttorneyGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/repository/power-of-attorney-generator-analysis-result/query/power-of-attorney-generator.query.repository.gateway';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';
import { PowerOfAttorneyGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/power-of-attorney/error/power-of-attorney-generator-does-not-contain-complete-analysis.error';
import { PowerOfAttorneyGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/power-of-attorney/error/power-of-attorney-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase {
  protected readonly _type = DownloadPowerOfAttorneyGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(PowerOfAttorneyGeneratorQueryRepositoryGateway)
    private readonly powerOfAttorneyGeneratorQueryRepositoryGateway: PowerOfAttorneyGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    powerOfAttorneyGeneratorId: PowerOfAttorneyGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const powerOfAttorneyGenerator =
      await this.powerOfAttorneyGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        powerOfAttorneyGeneratorId,
        PowerOfAttorneyGeneratorNotFoundError,
      );

    const responseAi = powerOfAttorneyGenerator.powerOfAttorneyGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new PowerOfAttorneyGeneratorDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'procuracao',
      exportOptions,
    );
  }
}
