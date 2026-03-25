import { Inject, Injectable } from '@nestjs/common';

import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto } from '@module/customer/organization-customization/dto/response/preview-organization-customization-document-footer-template.response.dto';
import { OrganizationCustomizationDocumentFooterTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-footer-template-not-found.error';

@Injectable()
export class PreviewOrganizationCustomizationDocumentFooterTemplateUseCase {
  protected readonly _type =
    PreviewOrganizationCustomizationDocumentFooterTemplateUseCase.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly footerTemplateQueryRepository: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
  ) {}

  public async execute(
    id: OrganizationCustomizationDocumentFooterTemplateId,
  ): Promise<PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto> {
    const result =
      await this.footerTemplateQueryRepository.findOneOrganizationCustomizationDocumentFooterTemplateById(
        id,
      );

    if (result === null) {
      throw new OrganizationCustomizationDocumentFooterTemplateNotFoundError();
    }

    return PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto.build(
      {
        organizationCustomizationDocumentFooterTemplateId:
          result.organizationCustomizationDocumentFooterTemplateId,
        type: result.type,
        htmlContent: result.htmlContent,
        createdAt: result.createdAt,
      },
    );
  }
}
