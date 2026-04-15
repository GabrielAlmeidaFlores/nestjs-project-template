import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralOrHybridRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/rural-or-hybrid-retirement-rejection.query.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period/command/rural-or-hybrid-retirement-rejection-work-period.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document/command/rural-or-hybrid-retirement-rejection-work-period-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document-analysis/command/rural-or-hybrid-retirement-rejection-work-period-document-analysis.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-earnings-history/command/rural-or-hybrid-retirement-rejection-work-period-earnings-history.command.repository.gateway';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';
import { DeleteRuralOrHybridRetirementRejectionWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/dto/response/delete-rural-or-hybrid-retirement-rejection-work-period.response.dto';
import { RuralOrHybridRetirementRejectionNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-not-found.error';
import { RuralOrHybridRetirementRejectionWorkPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/error/rural-or-hybrid-retirement-rejection-work-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralOrHybridRetirementRejectionWorkPeriodUseCase {
  protected readonly _type =
    DeleteRuralOrHybridRetirementRejectionWorkPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionQueryRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionQueryRepositoryGateway: RuralOrHybridRetirementRejectionQueryRepositoryGateway,
    @Inject(RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway)
    private readonly ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway,
    @Inject(
      RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    )
    private readonly ruralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway: RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId,
    ruralOrHybridRetirementRejectionWorkPeriodId: RuralOrHybridRetirementRejectionWorkPeriodId,
  ): Promise<DeleteRuralOrHybridRetirementRejectionWorkPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const existingRejection =
      await this.ruralOrHybridRetirementRejectionQueryRepositoryGateway.findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
        ruralOrHybridRetirementRejectionId,
        RuralOrHybridRetirementRejectionNotFoundError,
      );

    const existingWorkPeriod = (
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriod ?? []
    ).find(
      (workPeriod) =>
        workPeriod.id.toString() ===
        ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
    );

    if (!existingWorkPeriod) {
      throw new RuralOrHybridRetirementRejectionWorkPeriodNotFoundError();
    }

    const workPeriodDocuments = (
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodDocument ?? []
    ).filter(
      (document) =>
        document.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
        ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
    );
    const workPeriodDocumentAnalyses = (
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis ??
      []
    ).filter(
      (analysis) =>
        analysis.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
        ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
    );
    const workPeriodEarningsHistory = (
      existingRejection.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory ??
      []
    ).filter(
      (item) =>
        item.ruralOrHybridRetirementRejectionWorkPeriodId.toString() ===
        ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
    );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ...workPeriodDocuments.map((document) =>
        this.ruralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodDocument(
          document.id,
        ),
      ),
      ...workPeriodDocumentAnalyses.map((analysis) =>
        this.ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis(
          analysis.id,
        ),
      ),
      ...workPeriodEarningsHistory.map((item) =>
        this.ruralOrHybridRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway.deleteRuralOrHybridRetirementRejectionWorkPeriodEarningsHistory(
          item.id,
        ),
      ),
      this.ruralOrHybridRetirementRejectionWorkPeriodCommandRepositoryGateway.updateRuralOrHybridRetirementRejectionWorkPeriod(
        ruralOrHybridRetirementRejectionWorkPeriodId,
        new RuralOrHybridRetirementRejectionWorkPeriodEntity({
          id: ruralOrHybridRetirementRejectionWorkPeriodId,
          bondOrigin: existingWorkPeriod.bondOrigin,
          startDate: existingWorkPeriod.startDate,
          endDate: existingWorkPeriod.endDate,
          category: existingWorkPeriod.category,
          competenceBelowTheMinimum:
            existingWorkPeriod.competenceBelowTheMinimum,
          pendencyReason: existingWorkPeriod.pendencyReason,
          periodConsideration: existingWorkPeriod.periodConsideration,
          contributionAverage: existingWorkPeriod.contributionAverage,
          status: existingWorkPeriod.status,
          gracePeriod: existingWorkPeriod.gracePeriod,
          jobType: existingWorkPeriod.jobType,
          activityDescription: existingWorkPeriod.activityDescription,
          ruralOrHybridRetirementRejectionId,
          deletedAt: new Date(),
        }),
      ),
    ]);

    await transaction.commit();

    return DeleteRuralOrHybridRetirementRejectionWorkPeriodResponseDto.build({
      ruralOrHybridRetirementRejectionId,
    });
  }
}
