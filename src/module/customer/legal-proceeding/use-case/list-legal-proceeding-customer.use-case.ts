import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationNotFoundError } from '@module/customer/account/error/organization-not-found.error';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListLegalProceedingCustomerQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-legal-proceeding-customer.query.param.gateway';
import { ListLegalProceedingCustomerRequestDto } from '@module/customer/legal-proceeding/dto/request/list-legal-proceeding-customer.request.dto';
import { DataProceedingCustomerResponseDto } from '@module/customer/legal-proceeding/dto/response/data-proceeding-customer-response.dto';
import { ListLegalProceedingCustomerResponseDto } from '@module/customer/legal-proceeding/dto/response/list-legal-proceeding-customer.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListLegalProceedingByCustomerUseCase {
  protected readonly _type = ListLegalProceedingByCustomerUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    data: ListLegalProceedingCustomerRequestDto,
  ): Promise<ListLegalProceedingCustomerResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationNotFoundError();
    }

    const params = new ListLegalProceedingCustomerQueryParamGateway({
      ...data,
      analysisToolClientId: data.analysisToolClientId.toString(),
    });

    const analysisToolClientLegalProceedings =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listByAnalysisToolClientId(
        params,
      );

    const resource = analysisToolClientLegalProceedings.resource.map((item) =>
      DataProceedingCustomerResponseDto.build({
        id: item.id,
        legalProceedingNumber: item.legalProceedingNumber,
        status: item.status,
        type: item.type,
        lastUpdated: item.lastUpdated
          ? item.lastUpdated instanceof Date
            ? item.lastUpdated
            : new Date(item.lastUpdated)
          : null,
        deadline: null,
      }),
    );

    return ListLegalProceedingCustomerResponseDto.build({
      ...analysisToolClientLegalProceedings,
      resource,
    });
  }
}
