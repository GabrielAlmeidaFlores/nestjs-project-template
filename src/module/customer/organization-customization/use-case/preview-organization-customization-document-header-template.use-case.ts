import { Inject, Injectable } from '@nestjs/common';

import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';
import { PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto } from '@module/customer/organization-customization/dto/response/preview-organization-customization-document-header-template.response.dto';
import { OrganizationCustomizationDocumentHeaderTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-header-template-not-found.error';

@Injectable()
export class PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase {
  protected readonly _type =
    PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly headerTemplateQueryRepository: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
  ) {}

  public async execute(
    id: OrganizationCustomizationDocumentHeaderTemplateId,
  ): Promise<PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto> {
    const result =
      await this.headerTemplateQueryRepository.findOneOrganizationCustomizationDocumentHeaderTemplateById(
        id,
      );

    if (result === null) {
      throw new OrganizationCustomizationDocumentHeaderTemplateNotFoundError();
    }

    return PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto.build(
      {
        organizationCustomizationDocumentHeaderTemplateId:
          result.organizationCustomizationDocumentHeaderTemplateId,
        type: result.type,
        htmlContent: result.htmlContent,
        createdAt: result.createdAt,
      },
    );
  }
}
