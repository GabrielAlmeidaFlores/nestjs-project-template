import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/query/organization-customization-document-header-template.query.repository.gateway';
import { GetOrganizationCustomizationDocumentHeaderTemplateResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization-document-header-template.response.dto';
import { ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customization-document-header-templates.response.dto';

@Injectable()
export class ListOrganizationCustomizationDocumentHeaderTemplatesUseCase {
  protected readonly _type =
    ListOrganizationCustomizationDocumentHeaderTemplatesUseCase.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
    )
    private readonly headerTemplateQueryRepository: OrganizationCustomizationDocumentHeaderTemplateQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListOrganizationCustomizationDocumentHeaderTemplatesResponseDto> {
    const result =
      await this.headerTemplateQueryRepository.listOrganizationCustomizationDocumentHeaderTemplates(
        pagination,
      );

    const resource = result.resource.map((item) =>
      GetOrganizationCustomizationDocumentHeaderTemplateResponseDto.build({
        organizationCustomizationDocumentHeaderTemplateId:
          item.organizationCustomizationDocumentHeaderTemplateId,
        type: item.type,
        htmlContent: item.htmlContent,
        createdAt: item.createdAt,
      }),
    );

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
