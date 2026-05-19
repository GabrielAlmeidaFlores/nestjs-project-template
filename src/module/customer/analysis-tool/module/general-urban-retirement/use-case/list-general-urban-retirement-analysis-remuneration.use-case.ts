import { Injectable, Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/general-urban-retirement-analysis-remuneration.query.repository.gateway';
import { ListGeneralUrbanRetirementAnalysisRemunerationQueryParam } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/param/list-general-urban-retirement-analysis-remuneration.query.param';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { ListGeneralUrbanRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/list-general-urban-retirement-analysis-remuneration.request.dto';
import { GetGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/get-general-urban-retirement-analysis-remuneration.response.dto';
import { ListGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/list-general-urban-retirement-analysis-remuneration.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListGeneralUrbanRetirementAnalysisRemunerationUseCase {
  protected readonly _type =
    ListGeneralUrbanRetirementAnalysisRemunerationUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    protected readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    protected readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway)
    protected readonly generalUrbanRetirementAnalysisRemunerationQueryRepositoryGateway: GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    dto: ListGeneralUrbanRetirementAnalysisRemunerationRequestDto,
  ): Promise<ListGeneralUrbanRetirementAnalysisRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdOrFail(
      generalUrbanRetirementAnalysisId,
      organizationSessionData.organizationId,
      GeneralUrbanRetirementAnalysisNotFoundError,
    );

    const remunerationList =
      await this.generalUrbanRetirementAnalysisRemunerationQueryRepositoryGateway.listByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        generalUrbanRetirementAnalysisId,
        new ListGeneralUrbanRetirementAnalysisRemunerationQueryParam(dto),
      );

    const resource = remunerationList.resource.map((remuneration) =>
      GetGeneralUrbanRetirementAnalysisRemunerationResponseDto.build({
        remunerationDate: remuneration.remunerationDate,
        remunerationAmount: remuneration.remunerationAmount,
      }),
    );

    return ListGeneralUrbanRetirementAnalysisRemunerationResponseDto.build({
      ...remunerationList,
      resource,
    });
  }
}
