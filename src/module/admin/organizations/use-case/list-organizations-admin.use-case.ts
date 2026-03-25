import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetAdminOrganizationResponseDto } from '@module/admin/organizations/dto/response/get-admin-organization.response.dto';
import { ListAdminOrganizationsResponseDto } from '@module/admin/organizations/dto/response/list-admin-organizations.response.dto';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';

@Injectable()
export class ListOrganizationsAdminUseCase {
  protected readonly _type = ListOrganizationsAdminUseCase.name;

  public constructor(
    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListDataInputModel,
  ): Promise<ListAdminOrganizationsResponseDto> {
    const listResult =
      await this.organizationQueryRepositoryGateway.listAllPaginated(dto);

    const resource = listResult.resource.map((organization) =>
      GetAdminOrganizationResponseDto.build({
        id: organization.id,
        name: organization.name,
      }),
    );

    return ListAdminOrganizationsResponseDto.build({
      page: listResult.page,
      limit: listResult.limit,
      totalItems: listResult.totalItems,
      totalPages: listResult.totalPages,
      amountItemsCurrentPage: listResult.amountItemsCurrentPage,
      resource,
    });
  }
}
