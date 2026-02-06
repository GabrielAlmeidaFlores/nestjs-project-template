import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/audience-question-generator.query.repository.gateway';
import { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import { DeleteAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/delete-audience-question-generator.response.dto';
import { AudienceQuestionGeneratorNotFoundError } from '@module/customer/analysis-tool/module/audience-question-generator/error/audience-question-generator-not-found.error';
import { Injectable, Inject } from '@nestjs/common';
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
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
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

    const deleteTransaction =
      this.audienceQuestionGeneratorCommandRepositoryGateway.deleteAudienceQuestionGenerator(
        audienceQuestionGeneratorResult.id,
        organizationMember.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteTransaction,
    ]);

    await transaction.commit();

    return DeleteAudienceQuestionGeneratorResponseDto.build({
      audienceQuestionGeneratorId: audienceQuestionGeneratorResult.id,
    });
  }
}