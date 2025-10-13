import { Inject, Injectable } from '@nestjs/common';

import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import {
  GetLegalPleadingAddressDataResponseDto,
  GetLegalPleadingClientResponseDto,
  GetLegalPleadingDocumentAnalysisResponseDto,
  GetLegalPleadingDocumentResponseDto,
  GetLegalPleadingResponseDto,
  GetLegalPleadingResponsibleResponseDto,
  GetLegalPleadingResultResponseDto,
} from '@module/customer/analysis-tool/dto/response/get-legal-pleading.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetLegalPleadingUseCase {
  protected readonly _type = GetLegalPleadingUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
  ): Promise<GetLegalPleadingResponseDto> {
    const legalPleadingQueryResult =
      await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingAndOrganizationIdOrFail(
        legalPleadingId,
        organizationSessionData.organizationId,
        LegalPleadingNotFoundError,
      );

    const analysisToolClient = GetLegalPleadingClientResponseDto.build({
      ...legalPleadingQueryResult.analysisToolClient,
    });

    const legalPleadingAddress = legalPleadingQueryResult.legalPleadingAddress
      ? GetLegalPleadingAddressDataResponseDto.build({
          ...legalPleadingQueryResult.legalPleadingAddress,
        })
      : null;

    const legalPleadingResult = legalPleadingQueryResult.legalPleadingAddress
      ? GetLegalPleadingResultResponseDto.build({
          ...legalPleadingQueryResult.legalPleadingResult,
        })
      : null;

    const createdBy = GetLegalPleadingResponsibleResponseDto.build({
      id: legalPleadingQueryResult.createdBy.customer.id,
      name: legalPleadingQueryResult.createdBy.customer.name,
    });

    const updatedBy = GetLegalPleadingResponsibleResponseDto.build({
      id: legalPleadingQueryResult.updatedBy.customer.id,
      name: legalPleadingQueryResult.updatedBy.customer.name,
    });

    const legalPleadingDocumentTypeList = [
      ...new Set(
        legalPleadingQueryResult.legalPleadingDocument.map((i) => i.type),
      ),
    ];

    const legalPleadingDocumentAnalysis = await Promise.all(
      legalPleadingDocumentTypeList.map(async (type) => {
        const documents = legalPleadingQueryResult.legalPleadingDocument.filter(
          (i) => i.type === type,
        );

        const analysis =
          documents[0]?.legalPleadingDocumentAnalysis?.analysis ?? null;

        const documentUrls = await Promise.all(
          documents.map(async (item) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              item.document,
            );

            return url.toString();
          }),
        );

        const legalPleadingDocument = documentUrls.map((url) => {
          return GetLegalPleadingDocumentResponseDto.build({ url });
        });

        return GetLegalPleadingDocumentAnalysisResponseDto.build({
          analysis: analysis,
          type,
          legalPleadingDocument,
        });
      }),
    );

    const response = GetLegalPleadingResponseDto.build({
      ...legalPleadingQueryResult,
      analysisToolClient,
      legalPleadingAddress,
      legalPleadingResult,
      legalPleadingDocumentAnalysis,
      createdBy,
      updatedBy,
    });

    if (legalPleadingQueryResult.createdBy.customer.profilePicture !== null) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        legalPleadingQueryResult.createdBy.customer.profilePicture,
      );

      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (legalPleadingQueryResult.updatedBy.customer.profilePicture !== null) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        legalPleadingQueryResult.updatedBy.customer.profilePicture,
      );

      response.updatedBy.profilePicture = profilePicture.toString();
    }

    return response;
  }
}
