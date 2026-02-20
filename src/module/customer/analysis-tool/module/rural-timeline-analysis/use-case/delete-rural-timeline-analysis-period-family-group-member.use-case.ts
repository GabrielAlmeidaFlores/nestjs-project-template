import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/command/rural-timeline-analysis-period-family-group-member.command.repository.gateway';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/query/rural-timeline-analysis-period-family-group-member.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/value-object/rural-timeline-analysis-period-family-group-member-id/rural-timeline-analysis-period-family-group-member-id.value-object';
import { DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/delete-rural-timeline-analysis-period-family-group-member.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-family-group-member-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase {
  protected readonly _type =
    DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway: RuralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway: RuralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    ruralTimelineAnalysisPeriodId: RuralTimelineAnalysisPeriodId,
    ruralTimelineAnalysisPeriodFamilyGroupMemberId: RuralTimelineAnalysisPeriodFamilyGroupMemberId,
  ): Promise<DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    void (await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    ));

    const existingFamilyGroupMember =
      await this.ruralTimelineAnalysisPeriodFamilyGroupMemberQueryRepositoryGateway.findOneById(
        ruralTimelineAnalysisPeriodFamilyGroupMemberId,
      );

    if (existingFamilyGroupMember === null) {
      throw new RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError();
    }

    if (
      existingFamilyGroupMember.ruralTimelinePeriodId.toString() !==
      ruralTimelineAnalysisPeriodId.toString()
    ) {
      throw new RuralTimelineAnalysisPeriodFamilyGroupMemberNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineAnalysisPeriodFamilyGroupMemberCommandRepositoryGateway.deleteRuralTimelineAnalysisPeriodFamilyGroupMember(
        ruralTimelineAnalysisPeriodFamilyGroupMemberId,
      ),
    ]);

    await transaction.commit();

    return DeleteRuralTimelineAnalysisPeriodFamilyGroupMemberResponseDto.build(
      {},
    );
  }
}
