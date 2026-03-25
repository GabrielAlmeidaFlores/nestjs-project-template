import { Inject, Injectable } from '@nestjs/common';

import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';
import { PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto } from '@module/customer/organization-customization/dto/response/preview-organization-customization-document-header-template.response.dto';
import { OrganizationCustomizationDocumentHeaderTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-header-template-not-found.error';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase {
  protected readonly _type =
    PreviewOrganizationCustomizationDocumentHeaderTemplateUseCase.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly headerTemplateQueryRepository: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    id: OrganizationCustomizationDocumentHeaderTemplateId,
    organizationId: OrganizationId,
  ): Promise<PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto> {
    const [template, customization, organization] = await Promise.all([
      this.headerTemplateQueryRepository.findOneOrganizationCustomizationDocumentHeaderTemplateById(
        id,
      ),
      this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      ),
      this.organizationQueryRepository.findOneByOrganizationId(organizationId),
    ]);

    if (template === null) {
      throw new OrganizationCustomizationDocumentHeaderTemplateNotFoundError();
    }

    if (customization === null) {
      throw new OrganizationCustomizationNotFoundError();
    }

    const logoSignedUrl = await this.fileProcessorGateway.getOrganizationLogo(
      customization.organizationLogo,
    );

    const htmlContent = template.htmlContent
      .replace(/\{\{logo\}\}/g, logoSignedUrl.toString())
      .replace(/\{\{organizationName\}\}/g, organization?.name ?? '')
      .replace(/\{\{primaryColor\}\}/g, customization.primaryColor)
      .replace(/\{\{secondaryColor\}\}/g, customization.secondaryColor)
      .replace(/\{\{tertiaryColor\}\}/g, customization.tertiaryColor);

    return PreviewOrganizationCustomizationDocumentHeaderTemplateResponseDto.build(
      {
        organizationCustomizationDocumentHeaderTemplateId:
          template.organizationCustomizationDocumentHeaderTemplateId,
        type: template.type,
        htmlContent,
        createdAt: template.createdAt,
      },
    );
  }
}
