import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { FileProcessorGateway } from '@module/customer/account/lib/file-processor/file-processor.gateway';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { GetOrganizationCustomizationDocumentHeaderTemplateResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization-document-header-template.response.dto';
import { ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customization-document-header-templates.response.dto';
import { OrganizationCustomizationNotFoundError } from '@module/customer/organization-customization/error/organization-customization-not-found.error';

@Injectable()
export class ListOrganizationCustomizationDocumentHeaderTemplatesUseCase {
  protected readonly _type =
    ListOrganizationCustomizationDocumentHeaderTemplatesUseCase.name;

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
    pagination: ListDataInputModel,
    organizationId: OrganizationId,
  ): Promise<ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto> {
    const [result, customization, organization] = await Promise.all([
      this.headerTemplateQueryRepository.listOrganizationCustomizationDocumentHeaderTemplates(
        pagination,
      ),
      this.organizationCustomizationQueryRepository.findOneOrganizationCustomizationByOrganizationId(
        organizationId,
      ),
      this.organizationQueryRepository.findOneByOrganizationId(organizationId),
    ]);

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

    const resource = result.resource.map((item) => {
      const htmlContent = item.htmlContent
        .replace(/\{\{logo\}\}/g, logoSignedUrl)
        .replace(/\{\{organizationName\}\}/g, organization?.name ?? '')
        .replace(/\{\{primaryColor\}\}/g, customization.primaryColor)
        .replace(/\{\{secondaryColor\}\}/g, customization.secondaryColor)
        .replace(/\{\{tertiaryColor\}\}/g, customization.tertiaryColor);

      return GetOrganizationCustomizationDocumentHeaderTemplateResponseDto.build(
        {
          organizationCustomizationDocumentHeaderTemplateId:
            item.organizationCustomizationDocumentHeaderTemplateId,
          type: item.type,
          htmlContent,
          createdAt: item.createdAt,
        },
      );
    });

    return ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto.build(
      {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        amountItemsCurrentPage: result.amountItemsCurrentPage,
        resource,
      },
    );
  }
}
