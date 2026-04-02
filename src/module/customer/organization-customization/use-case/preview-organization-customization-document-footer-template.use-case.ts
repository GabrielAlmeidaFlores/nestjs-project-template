import { Inject, Injectable } from '@nestjs/common';

import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';
import { PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto } from '@module/customer/organization-customization/dto/response/preview-organization-customization-document-footer-template.response.dto';
import { OrganizationCustomizationDocumentFooterTemplateNotFoundError } from '@module/customer/organization-customization/error/organization-customization-document-footer-template-not-found.error';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class PreviewOrganizationCustomizationDocumentFooterTemplateUseCase {
  protected readonly _type =
    PreviewOrganizationCustomizationDocumentFooterTemplateUseCase.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly footerTemplateQueryRepository: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepository: OrganizationQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    id: OrganizationCustomizationDocumentFooterTemplateId,
    organizationId: OrganizationId,
  ): Promise<PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto> {
    const [template, customization, organization] = await Promise.all([
      this.footerTemplateQueryRepository.findOneOrganizationCustomizationDocumentFooterTemplateById(
        id,
      ),
      this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      ),
      this.organizationQueryRepository.findOneByOrganizationId(organizationId),
    ]);

    if (template === null) {
      throw new OrganizationCustomizationDocumentFooterTemplateNotFoundError();
    }

    if (customization === null) {
      throw new OrganizationCustomizationNotFoundError();
    }

    const logoSignedUrl =
      customization.organizationLogo !== null
        ? (
            await this.fileProcessorGateway.getOrganizationLogo(
              customization.organizationLogo,
            )
          ).toString()
        : '';

    const htmlContent = template.htmlContent
      .replace(/\{\{logo\}\}/g, logoSignedUrl)
      .replace(/\{\{organizationName\}\}/g, organization?.name ?? '')
      .replace(/\{\{primaryColor\}\}/g, customization.primaryColor)
      .replace(/\{\{secondaryColor\}\}/g, customization.secondaryColor)
      .replace(/\{\{tertiaryColor\}\}/g, customization.tertiaryColor)
      .replace(
        /\{\{footerDescription\}\}/g,
        customization.organizationCustomizationDocumentFooterDescription ?? '',
      )
      .replaceAll('\n', '<br>');

    return PreviewOrganizationCustomizationDocumentFooterTemplateResponseDto.build(
      {
        organizationCustomizationDocumentFooterTemplateId:
          template.organizationCustomizationDocumentFooterTemplateId,
        type: template.type,
        htmlContent,
        createdAt: template.createdAt,
      },
    );
  }
}
