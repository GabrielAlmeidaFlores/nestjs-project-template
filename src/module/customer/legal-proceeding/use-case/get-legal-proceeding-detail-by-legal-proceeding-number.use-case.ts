import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationNotFoundError } from '@module/customer/account/error/organization-not-found.error';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { GetAnalysisToolClientLegalProceedingSimpleResponseDto } from '@module/customer/legal-proceeding/dto/response/get-analysis-tool-client-legal-proceeding-simple.response.dto';
import { GetLegalProceedingDetailLawyerWithRelationsResponseDto } from '@module/customer/legal-proceeding/dto/response/get-legal-proceeding-detail-lawyer-with-relations.response.dto';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
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

    @Inject(LegalProceedingConsumerGateway)
    private readonly legalProceedingConsumer: LegalProceedingConsumerGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailLawyerWithRelationsResponseDto> {
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

    const extracted = this.legalProceedingConsumer.extractLegalProceedingData(
      legalProceedingDetail.detail,
    );

    const analysisToolClientLegalProceeding =
      GetAnalysisToolClientLegalProceedingSimpleResponseDto.build({
        id: legalProceedingDetail.analysisToolClientLegalProceeding.id,
        legalProceedingNumber:
          legalProceedingDetail.analysisToolClientLegalProceeding
            .legalProceedingNumber,
      });

    return GetLegalProceedingDetailLawyerWithRelationsResponseDto.build({
      id: legalProceedingDetail.id,
      analysisToolClientLegalProceeding,
      detail: JSON.parse(legalProceedingDetail.detail) as object,
      recipient: extracted.recipient,
      recipientLawyer: extracted.recipientLawyer,
    });
  }
}
