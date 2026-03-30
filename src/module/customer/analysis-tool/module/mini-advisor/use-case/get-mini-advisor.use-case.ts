import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { MiniAdvisorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/mini-advisor/domain/repository/mini-advisor/query/mini-advisor.query.repository.gateway';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { GetMiniAdvisorResponseDto, GetMiniAdvisorResultResponseDto } from '@module/customer/analysis-tool/module/mini-advisor/dto/response/get-mini-advisor.response.dto';
import { MiniAdvisorNotFoundError } from '@module/customer/analysis-tool/module/mini-advisor/error/mini-advisor-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMiniAdvisorUseCase {
  protected readonly _type = GetMiniAdvisorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(MiniAdvisorQueryRepositoryGateway)
    private readonly miniAdvisorQueryRepositoryGateway: MiniAdvisorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    miniAdvisorId: MiniAdvisorId,
  ): Promise<GetMiniAdvisorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByMiniAdvisorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        miniAdvisorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        MiniAdvisorNotFoundError,
      );

    const miniAdvisorQueryResult =
      await this.miniAdvisorQueryRepositoryGateway.findOneByIdOrFail(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        miniAdvisorId,
        MiniAdvisorNotFoundError,
      );

    const resultData = miniAdvisorQueryResult.miniAdvisorResult;

    const miniAdvisorResult = resultData
      ? GetMiniAdvisorResultResponseDto.build({
          miniAdvisorResultId: resultData.id,
          chosenAnalysis: resultData.chosenAnalysis,
          ...(resultData.benefitDescription !== null && {
            benefitDescription: resultData.benefitDescription,
          }),
          ...(resultData.attentionNote !== null && {
            attentionNote: resultData.attentionNote,
          }),
        })
      : undefined;

    return GetMiniAdvisorResponseDto.build({
      miniAdvisorId,
      analysisToolClientId: analysisToolRecordQueryResult.analysisToolClient.id,
      clientSituation: miniAdvisorQueryResult.clientSituation,
      clientAge: miniAdvisorQueryResult.clientAge,
      clientGender: miniAdvisorQueryResult.clientGender,
      clientWorkHistory: miniAdvisorQueryResult.clientWorkHistory,
      hasContributedWithInss: miniAdvisorQueryResult.hasContributedWithInss,
      clientHasDisabilityOrLimitations:
        miniAdvisorQueryResult.clientHasDisabilityOrLimitations,
      ...(miniAdvisorResult !== undefined && { miniAdvisorResult }),
      createdAt: analysisToolRecordQueryResult.createdAt,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
    });
  }
}
