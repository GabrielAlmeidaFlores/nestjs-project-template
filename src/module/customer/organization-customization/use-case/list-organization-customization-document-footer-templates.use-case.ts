import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/query/organization-customization-document-footer-template.query.repository.gateway';
import { GetOrganizationCustomizationDocumentFooterTemplateResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization-document-footer-template.response.dto';
import { ListOrganizationCustomizationDocumentFooterTemplatesResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customization-document-footer-templates.response.dto';

@Injectable()
export class ListOrganizationCustomizationDocumentFooterTemplatesUseCase {
  protected readonly _type =
    ListOrganizationCustomizationDocumentFooterTemplatesUseCase.name;

  public constructor(
    @Inject(
      OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
    )
    private readonly footerTemplateQueryRepository: OrganizationCustomizationDocumentFooterTemplateQueryRepositoryGateway,
  ) {}

  public async execute(
    pagination: ListDataInputModel,
  ): Promise<ListOrganizationCustomizationDocumentFooterTemplatesResponseDto> {
    const result =
      await this.footerTemplateQueryRepository.listOrganizationCustomizationDocumentFooterTemplates(
        pagination,
      );

    const resource = result.resource.map((item) =>
      GetOrganizationCustomizationDocumentFooterTemplateResponseDto.build({
        organizationCustomizationDocumentFooterTemplateId:
          item.organizationCustomizationDocumentFooterTemplateId,
        type: item.type,
        createdAt: item.createdAt,
      }),
    );

    return ListOrganizationCustomizationDocumentFooterTemplatesResponseDto.build(
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
