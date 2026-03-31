import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class GetOrganizationCustomizationUseCase {
  protected readonly _type = GetOrganizationCustomizationUseCase.name;

  public constructor(
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationCustomizationResponseDto> {
    const result =
      await this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      );

    if (!result) {
      throw new OrganizationCustomizationNotFoundError();
    }

    const [organizationLogoSignedUrl, organizationLogoOriginalFileName] =
      result.organizationLogo !== null
        ? await Promise.all([
            this.fileProcessorGateway
              .getOrganizationLogo(result.organizationLogo)
              .then((url) => url.toString()),
            this.fileProcessorGateway.getOriginalFileName(
              result.organizationLogo,
            ),
          ])
        : [null, null];

    return GetOrganizationCustomizationResponseDto.build({
      organizationCustomizationId: result.organizationCustomizationId,
      organizationName: result.organizationName,
      ...(organizationLogoSignedUrl !== null && {
        organizationLogo: organizationLogoSignedUrl,
      }),
      ...(organizationLogoOriginalFileName !== null && {
        organizationLogoOriginalFileName,
      }),
      organizationCustomizationDocumentFooterDescription:
        result.organizationCustomizationDocumentFooterDescription,
      organizationCustomizationDocumentHeaderTemplateId:
        result.organizationCustomizationDocumentHeaderTemplateId,
      organizationCustomizationDocumentHeaderTemplateType:
        result.organizationCustomizationDocumentHeaderTemplateType,
      organizationCustomizationDocumentFooterTemplateId:
        result.organizationCustomizationDocumentFooterTemplateId,
      organizationCustomizationDocumentFooterTemplateType:
        result.organizationCustomizationDocumentFooterTemplateType,
      primaryColor: result.primaryColor,
      secondaryColor: result.secondaryColor,
      tertiaryColor: result.tertiaryColor,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
