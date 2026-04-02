import { Inject, Injectable } from '@nestjs/common';

import { ListOrganizationMembersInputModel } from '@module/customer/account/domain/repository/organization-member/query/model/input/list-organization-members.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ListOrganizationCollaboratorsRequestDto } from '@module/customer/account/dto/request/list-organization-collaborators.request.dto';
import { GetOrganizationCollaboratorResponseDto } from '@module/customer/account/dto/response/get-organization-collaborator.response.dto';
import { ListOrganizationCollaboratorsResponseDto } from '@module/customer/account/dto/response/list-organization-collaborators.response.dto';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListOrganizationCollaboratorsUseCase {
  protected readonly _type = ListOrganizationCollaboratorsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListOrganizationCollaboratorsRequestDto,
  ): Promise<ListOrganizationCollaboratorsResponseDto> {
    const pagination = new ListOrganizationMembersInputModel(dto);

    const result =
      await this.organizationMemberQueryRepositoryGateway.listOrganizationMembersByOrganizationId(
        organizationSessionData.organizationId,
        pagination,
      );

    return ListOrganizationCollaboratorsResponseDto.build({
      page: result.page,
      limit: result.limit,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      amountItemsCurrentPage: result.amountItemsCurrentPage,
      resource: result.resource.map((item) =>
        GetOrganizationCollaboratorResponseDto.build({
          organizationMemberId: item.organizationMemberId,
          name: item.name,
          email: item.email,
          federalDocument: item.federalDocument,
          registrationDate: item.registrationDate,
          isActive: item.isActive,
        }),
      ),
    });
  }
}
