import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { CountLegalProceedingDetailQueryParam } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/param/count-legal-proceeding-detail.query.param';
import { LegalProceedingDetailItemStatusEnum } from '@module/customer/legal-proceeding/domain/schema/enum/legal-proceeding-detail-item-status.enum';
import { CountLegalProceedingDetailRequestDto } from '@module/customer/legal-proceeding/dto/request/count-legal-proceeding-detail.request.dto';
import { CountLegalProceedingDetailResponseDto } from '@module/customer/legal-proceeding/dto/response/count-legal-proceeding-detail.reponse.dto';
import { LegalProceedingDetailDataResponseDto } from '@module/customer/legal-proceeding/dto/response/legal-proceeding-detail-item.reponse.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CountLegalProceedingDetailUseCase {
  protected readonly _type = CountLegalProceedingDetailUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CountLegalProceedingDetailRequestDto,
  ): Promise<CountLegalProceedingDetailResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const legalProceedingDetailList =
      await this.legalProceedingDetailQueryRepositoryGateway.listByOrganizationIdAndCreatedBy(
        organizationSessionData.organizationId,
        new CountLegalProceedingDetailQueryParam(dto),
      );

    let inProgress = 0;
    let concluded = 0;
    let total = 0;

    legalProceedingDetailList.resource.forEach((proceeding) => {
      const detailObject = JSON.parse(
        proceeding.detail,
      ) as LegalProceedingDetailDataResponseDto;

      detailObject.data.items.forEach((item) => {
        if (item.status === LegalProceedingDetailItemStatusEnum.P) {
          inProgress++;
        }
        if (item.status === LegalProceedingDetailItemStatusEnum.C) {
          concluded++;
        }
        total++;
      });
    });

    const response = CountLegalProceedingDetailResponseDto.build({
      inProgress,
      concluded,
      total,
    });

    return response;
  }
}
