import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/command/rural-timeline-cnis-contribution-period-document.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';
import { DeleteRuralTimelineCnisContributionPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/delete-rural-timeline-cnis-contribution-period-document.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralTimelineCnisContributionPeriodDocumentUseCase {
  protected readonly _type =
    DeleteRuralTimelineCnisContributionPeriodDocumentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway)
    private readonly ruralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway: RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    documentId: RuralTimelineCnisContributionPeriodDocumentId,
  ): Promise<DeleteRuralTimelineCnisContributionPeriodDocumentResponseDto> {
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

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway.deleteRuralTimelineCnisContributionPeriodDocument(
        documentId,
      ),
    ]);

    await transaction.commit();

    return DeleteRuralTimelineCnisContributionPeriodDocumentResponseDto.build({
      ruralTimelineCnisContributionPeriodDocumentId: documentId,
    });
  }
}
