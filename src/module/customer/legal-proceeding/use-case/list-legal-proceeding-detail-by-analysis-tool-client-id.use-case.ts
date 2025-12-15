import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { ListLegalProceedingDetailQueryParam } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/param/list-legal-proceeding-detail.query.param';
import { ListLegalProceedingDetailByAnalysisToolClientRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail-by-analysis-tool-client-id.request.dto';
import { GetLegalProceedingDetailWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-with-relations.response.dto';
import { ListLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail.response.dto';

import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListLegalProceedingDetailByAnalysisToolClientIdUseCase {
  protected readonly _type =
    ListLegalProceedingDetailByAnalysisToolClientIdUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListLegalProceedingDetailByAnalysisToolClientRequestDto,
  ): Promise<ListLegalProceedingDetailResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const legalProceedingDetailList =
      await this.legalProceedingDetailQueryRepositoryGateway.listByOrganizationIdAndAnalysisToolClientId(
        organizationSessionData.organizationId,
        new ListLegalProceedingDetailQueryParam(dto),
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
