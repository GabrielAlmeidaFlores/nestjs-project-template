import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { FeeContractGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/repository/fee-contract-generator-analysis-result/query/fee-contract-generator.query.repository.gateway';
import { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';
import { FeeContractGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/fee-contract/error/fee-contract-generator-does-not-contain-complete-analysis.error';
import { FeeContractGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/fee-contract/error/fee-contract-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadFeeContractGeneratorCompleteAnalysisUseCase {
  protected readonly _type = DownloadFeeContractGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(FeeContractGeneratorQueryRepositoryGateway)
    private readonly feeContractGeneratorQueryRepositoryGateway: FeeContractGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    feeContractGeneratorId: FeeContractGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const feeContractGenerator =
      await this.feeContractGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        feeContractGeneratorId,
        FeeContractGeneratorNotFoundError,
      );

    const responseAi = feeContractGenerator.feeContractGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new FeeContractGeneratorDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'contrato_honorarios',
      exportOptions,
    );
  }
}
