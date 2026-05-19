import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { OrganizationCustomizationExportDocumentOptionsResolver } from '@module/customer/analysis-tool/lib/organization-customization-resolver/organization-customization-export-document-options.resolver';
import { JefWaiverDeclarationGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/repository/jef-waiver-declaration-generator-analysis-result/query/jef-waiver-declaration-generator.query.repository.gateway';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';
import { JefWaiverDeclarationGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/error/jef-waiver-declaration-generator-does-not-contain-complete-analysis.error';
import { JefWaiverDeclarationGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/error/jef-waiver-declaration-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase {
  protected readonly _type = DownloadJefWaiverDeclarationGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(JefWaiverDeclarationGeneratorQueryRepositoryGateway)
    private readonly jefWaiverDeclarationGeneratorQueryRepositoryGateway: JefWaiverDeclarationGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(OrganizationCustomizationExportDocumentOptionsResolver)
    private readonly organizationCustomizationExportDocumentOptionsResolver: OrganizationCustomizationExportDocumentOptionsResolver,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    jefWaiverDeclarationGeneratorId: JefWaiverDeclarationGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const jefWaiverDeclarationGenerator =
      await this.jefWaiverDeclarationGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        jefWaiverDeclarationGeneratorId,
        JefWaiverDeclarationGeneratorNotFoundError,
      );

    const responseAi = jefWaiverDeclarationGenerator.jefWaiverDeclarationGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new JefWaiverDeclarationGeneratorDoesNotContainCompleteAnalysisError();
    }

    const exportOptions =
      await this.organizationCustomizationExportDocumentOptionsResolver.execute(
        organizationSessionData.organizationId,
      );

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'declaracao_renuncia_jef',
      exportOptions,
    );
  }
}
