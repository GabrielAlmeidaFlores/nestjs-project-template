import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/command/rural-timeline-analysis-inss-benefit.command.repository.gateway';
import { GetRuralTimelineAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/query/result/get-rural-timeline-analysis-inss-benefit.query.result';
import { RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/command/rural-timeline-analysis-legal-proceeding.command.repository.gateway';
import { GetRuralTimelineAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/query/result/get-rural-timeline-analysis-legal-proceeding.query.result';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity';
import { RuralTimelineAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.entity';
import { UpdateRuralTimelineAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis.request.dto';
import { UpdateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisUseCase {
  protected readonly _type = UpdateRuralTimelineAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCommandRepositoryGateway: RuralTimelineAnalysisCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisInssBenefitCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisInssBenefitCommandRepositoryGateway: RuralTimelineAnalysisInssBenefitCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisLegalProceedingCommandRepositoryGateway: RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: UpdateRuralTimelineAnalysisRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        ruralTimelineAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RuralTimelineAnalysisNotFoundError,
      );

    const existingQueryResult =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findOneByIdWithRelations(
        ruralTimelineAnalysisId,
      );

    if (existingQueryResult === null) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    const existingEntity =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findOneById(
        ruralTimelineAnalysisId,
      );

    if (existingEntity === null) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisEntity({
      id: ruralTimelineAnalysisId,
      analysisToolClientId: existingEntity.analysisToolClientId,
      ruralTimelineCompleteAnalysis:
        dto.ruralTimelineCompleteAnalysis ??
        existingEntity.ruralTimelineCompleteAnalysis,
      ruralTimelineSimplifiedAnalysis:
        dto.ruralTimelineSimplifiedAnalysis ??
        existingEntity.ruralTimelineSimplifiedAnalysis,
      ruralTimelinePeriodDocumentAnalysis:
        dto.ruralTimelinePeriodDocumentAnalysis ??
        existingEntity.ruralTimelinePeriodDocumentAnalysis,
      workRegime: dto.workRegime ?? existingEntity.workRegime,
      createdAt: existingEntity.createdAt,
      updatedAt: existingEntity.updatedAt,
      deletedAt: existingEntity.deletedAt,
    });

    const transactions: TransactionType[] = [];

    if (dto.inssBenefitNumber !== undefined) {
      const inssBenefitNumberTransactions =
        this.updateInssBenefitNumberOnDatabase(
          updatedEntity,
          existingQueryResult.ruralTimelineAnalysisInssBenefit,
          dto.inssBenefitNumber,
        );

      transactions.push(...inssBenefitNumberTransactions);
    }

    if (dto.legalProceedingNumber !== undefined) {
      const legalProceedingNumberTransactions =
        this.updateLegalProceedingNumberOnDatabase(
          updatedEntity,
          existingQueryResult.ruralTimelineAnalysisLegalProceeding,
          dto.legalProceedingNumber,
        );

      transactions.push(...legalProceedingNumberTransactions);
    }

    const ruralTimelineAnalysisTransaction =
      this.ruralTimelineAnalysisCommandRepositoryGateway.updateRuralTimeline(
        updatedEntity,
      );
    transactions.push(ruralTimelineAnalysisTransaction);

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: AnalysisToolRecordTypeEnum.RURAL_TIMELINE_ANALYSIS,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecordQueryResult.id.toString(),
        transactions,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisResponseDto.build({
      ruralTimelineAnalysisId: updatedEntity.id,
    });
  }

  private updateInssBenefitNumberOnDatabase(
    ruralTimelineAnalysis: RuralTimelineAnalysisEntity,
    currentInssBenefitNumber: GetRuralTimelineAnalysisInssBenefitQueryResult[],
    newInssBenefitNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = currentInssBenefitNumber.map((value) => {
      return this.ruralTimelineAnalysisInssBenefitCommandRepositoryGateway.deleteRuralTimelineAnalysisInssBenefit(
        value.id,
      );
    });

    const createNew = newInssBenefitNumber.map((value) => {
      const entity = new RuralTimelineAnalysisInssBenefitEntity({
        inssBenefitNumber: value,
        ruralTimelineAnalysisId: ruralTimelineAnalysis.id,
      });

      return this.ruralTimelineAnalysisInssBenefitCommandRepositoryGateway.createRuralTimelineAnalysisInssBenefit(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }

  private updateLegalProceedingNumberOnDatabase(
    ruralTimelineAnalysis: RuralTimelineAnalysisEntity,
    currentLegalProceedingNumber: GetRuralTimelineAnalysisLegalProceedingQueryResult[],
    newLegalProceedingNumber: string[],
  ): TransactionType[] {
    const deleteCurrent = currentLegalProceedingNumber.map((value) => {
      return this.ruralTimelineAnalysisLegalProceedingCommandRepositoryGateway.deleteRuralTimelineAnalysisLegalProceeding(
        value.id,
      );
    });

    const createNew = newLegalProceedingNumber.map((value) => {
      const entity = new RuralTimelineAnalysisLegalProceedingEntity({
        legalProceedingNumber: value,
        ruralTimelineAnalysisId: ruralTimelineAnalysis.id,
      });

      return this.ruralTimelineAnalysisLegalProceedingCommandRepositoryGateway.createRuralTimelineAnalysisLegalProceeding(
        entity,
      );
    });

    return [...deleteCurrent, ...createNew];
  }
}
