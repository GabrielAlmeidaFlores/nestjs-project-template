import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationNotFoundError } from '@module/customer/account/error/organization-not-found.error';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { GetLegalProceedingDetailLaywerWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-laywer-with-relations.response.dto';
import { DetailParsedType } from '@module/customer/legal-proceeding/type/legal-proceeding-detail.type';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetLegalProceedingDetailByLegalProceedingNumberUseCase {
  protected readonly _type =
    GetLegalProceedingDetailByLegalProceedingNumberUseCase.name;

  public constructor(
    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,

    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailLaywerWithRelationsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationNotFoundError();
    }

    const legalProceedingDetail =
      await this.legalProceedingDetailQueryRepositoryGateway.getByLegalProceedingNumber(
        legalProceedingNumber,
      );

    const detailParsed = JSON.parse(
      legalProceedingDetail.detail,
    ) as DetailParsedType;

    const item = detailParsed.data?.items ?? [];
    const lastItem = item.length > 0 ? item[item.length - 1] : null;

    const recipient = lastItem?.destinatarios ?? [];
    const recipientLawyer = lastItem?.destinatarioadvogados ?? [];

    return GetLegalProceedingDetailLaywerWithRelationsResponseDto.build({
      ...legalProceedingDetail,
      detail: JSON.parse(legalProceedingDetail.detail) as object,
      recipient,
      recipientLawyer,
    });
  }
}
