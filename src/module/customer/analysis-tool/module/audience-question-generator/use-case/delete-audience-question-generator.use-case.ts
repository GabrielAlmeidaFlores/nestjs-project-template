import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { DeleteAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/delete-audience-question-generator.response.dto';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteAudienceQuestionGeneratorUseCase {
  protected readonly _type = DeleteAudienceQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorQueryRepositoryGateway)
    private readonly audienceQuestionGeneratorQueryRepositoryGateway: AudienceQuestionGeneratorQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorCommandRepositoryGateway: AudienceQuestionGeneratorCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
  ): Promise<DeleteAudienceQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const audienceQuestionGeneratorResult =
      await this.audienceQuestionGeneratorQueryRepositoryGateway.findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const deleteTransaction =
      this.audienceQuestionGeneratorCommandRepositoryGateway.deleteAudienceQuestionGenerator(
        audienceQuestionGeneratorResult.id,
        organizationMember.id,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.DELETED,
        analysisType: AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecordQueryResult.id.toString(),
        transactions: [deleteTransaction],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return DeleteAudienceQuestionGeneratorResponseDto.build({
      audienceQuestionGeneratorId: audienceQuestionGeneratorResult.id,
    });
  }
}
