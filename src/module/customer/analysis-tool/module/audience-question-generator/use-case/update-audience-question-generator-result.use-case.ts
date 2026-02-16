import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { AudienceQuestionGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-result/command/audience-question-generator-result.command.repository.gateway';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { AudienceQuestionGeneratorResultEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-result/audience-question-generator-result.entity';
import { UpdateAudienceQuestionGeneratorResultRequestDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/request/update-audience-question-generator-result.request.dto';
import { UpdateAudienceQuestionGeneratorResultResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/update-audience-question-generator-result.response.dto';
import { AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-does-not-contain-complete-analysis.error';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateAudienceQuestionGeneratorResultUseCase {
  protected readonly _type = UpdateAudienceQuestionGeneratorResultUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorQueryRepositoryGateway)
    private readonly audienceQuestionGeneratorQueryRepositoryGateway: AudienceQuestionGeneratorQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorCommandRepositoryGateway: AudienceQuestionGeneratorCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorResultCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorResultCommandRepositoryGateway: AudienceQuestionGeneratorResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    dto: UpdateAudienceQuestionGeneratorResultRequestDto,
  ): Promise<UpdateAudienceQuestionGeneratorResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByAudienceQuestionGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AudienceQuestionGeneratorNotFoundError,
      );

    const audienceQuestionGeneratorQueryResult =
      await this.audienceQuestionGeneratorQueryRepositoryGateway.findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
        audienceQuestionGeneratorId,
        organizationSessionData.organizationId,
        AudienceQuestionGeneratorNotFoundError,
      );

    if (audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult === null) {
      throw new AudienceQuestionGeneratorDoesNotContainCompleteAnalysisError();
    }

    const audienceQuestionGeneratorResult = new AudienceQuestionGeneratorResultEntity({
      id: audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult.id,
      audienceQuestionGeneratorCompleteAnalysis: dto.result,
      audienceQuestionGeneratorSimplifiedAnalysis:
        audienceQuestionGeneratorQueryResult.audienceQuestionGeneratorResult
          .audienceQuestionGeneratorSimplifiedAnalysis,
    });

    const audienceQuestionGenerator = new AudienceQuestionGeneratorEntity({
      id: audienceQuestionGeneratorQueryResult.id,
      audienceQuestionGeneratorResult,
      audienceQuestionGeneratorDocument: [],
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.audienceQuestionGeneratorResultCommandRepositoryGateway.updateAudienceQuestionGeneratorResult(
        audienceQuestionGeneratorResult.id,
        audienceQuestionGeneratorResult,
      ),
      this.audienceQuestionGeneratorCommandRepositoryGateway.updateAudienceQuestionGenerator(
        audienceQuestionGenerator.id,
        audienceQuestionGenerator,
      ),
    ]);
    await transaction.commit();

    return UpdateAudienceQuestionGeneratorResultResponseDto.build({
      result: dto.result,
    });
  }
}
