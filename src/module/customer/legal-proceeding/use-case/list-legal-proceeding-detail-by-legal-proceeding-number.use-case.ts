import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationNotFoundError } from '@module/customer/account/error/organization-not-found.error';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { ListLegalProceedingDetailByLegalProceedingNumberRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-legal-proceeding-number.request.dto';
import { GetLegalProceedingDetailWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-with-relations.response.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListLegalProceedingDetailByLegalProceedingNumberUseCase {
  protected readonly _type =
    ListLegalProceedingDetailByLegalProceedingNumberUseCase.name;

  public constructor(
    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,

    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: ListLegalProceedingDetailByLegalProceedingNumberRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationNotFoundError();
    }

    const legalProceedingDetailList =
      await this.legalProceedingDetailQueryRepositoryGateway.listByLegalProceedingNumber(
        dto.legalProceedingNumber,
        new ListDataInputModel(dto),
      );

    const resource: GetLegalProceedingDetailWithRelationsResponseDto[] =
      legalProceedingDetailList.resource.map((item) => {
        return GetLegalProceedingDetailWithRelationsResponseDto.build({
          ...item,
          detail: JSON.parse(item.detail) as object,
        });
      });

    return ListLegalProceedingDetailResponseDto.build({
      ...legalProceedingDetailList,
      resource,
    });
  }
}
