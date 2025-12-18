import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { ListLegalProceedingDetailQueryParam } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/param/list-legal-proceeding-detail.query.param';
import { GetLegalProceedingDetailLaywerWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-laywer-with-relations.response.dto';
import { ListLegalProceedingDetailLaywerResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-detail-laywer.response.dto';
import { DetailParsedType } from '@module/customer/legal-proceeding/type/legal-proceeding-detail.type';

import type { ListLegalProceedingDetailRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-detail.request.dto';
import type { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import type { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListLegalProceedingDetailUseCase {
  protected readonly _type = ListLegalProceedingDetailUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListLegalProceedingDetailRequestDto,
  ): Promise<ListLegalProceedingDetailLaywerResponseDto> {
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

    const resource: GetLegalProceedingDetailLaywerWithRelationsResponseDto[] =
      legalProceedingDetailList.resource.map((item) => {
        const detailParsed = JSON.parse(item.detail) as DetailParsedType;

        const items = detailParsed.data?.items ?? [];
        const lastItem = items.length > 0 ? items[items.length - 1] : null;

        const recipient = lastItem?.destinatarios ?? [];
        const recipientLawyer = lastItem?.destinatarioadvogados ?? [];

        return GetLegalProceedingDetailLaywerWithRelationsResponseDto.build({
          ...item,
          detail: JSON.parse(item.detail) as object,
          recipient,
          recipientLawyer,
        });
      });

    return ListLegalProceedingDetailLaywerResponseDto.build({
      ...legalProceedingDetailList,
      resource,
    });
  }
}
