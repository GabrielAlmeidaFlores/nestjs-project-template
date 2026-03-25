import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCustomizationQueryRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization/query/organization-customization.query.repository.gateway';
import { GetOrganizationCustomizationResponseDto } from '@module/customer/organization-customization/dto/response/get-organization-customization.response.dto';
import { ListOrganizationCustomizationsResponseDto } from '@module/customer/organization-customization/dto/response/list-organization-customizations.response.dto';

@Injectable()
export class ListOrganizationCustomizationsUseCase {
  protected readonly _type = ListOrganizationCustomizationsUseCase.name;

  public constructor(
    @Inject(OrganizationCustomizationQueryRepositoryGateway)
    private readonly organizationCustomizationQueryRepository: OrganizationCustomizationQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    pagination: ListDataInputModel,
  ): Promise<ListOrganizationCustomizationsResponseDto> {
    const result =
      await this.organizationCustomizationQueryRepository.listOrganizationCustomizations(
        organizationId,
        pagination,
      );

    const resource = result.resource.map((item) =>
      GetOrganizationCustomizationResponseDto.build({
        organizationCustomizationId: item.organizationCustomizationId,
        organizationLogo: item.organizationLogo,
        organizationCustomizationDocumentFooterDescription:
          item.organizationCustomizationDocumentFooterDescription,
        organizationCustomizationDocumentHeaderTemplateId:
          item.organizationCustomizationDocumentHeaderTemplateId,
        organizationCustomizationDocumentHeaderTemplateType:
          item.organizationCustomizationDocumentHeaderTemplateType,
        organizationCustomizationDocumentFooterTemplateId:
          item.organizationCustomizationDocumentFooterTemplateId,
        organizationCustomizationDocumentFooterTemplateType:
          item.organizationCustomizationDocumentFooterTemplateType,
        primaryColor: item.primaryColor,
        secondaryColor: item.secondaryColor,
        tertiaryColor: item.tertiaryColor,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );

    return ListOrganizationCustomizationsResponseDto.build({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      amountItemsCurrentPage: result.amountItemsCurrentPage,
      resource,
    });
  }
}
