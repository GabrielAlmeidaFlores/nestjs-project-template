import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { SpeechGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/command/speech-generator.command.repository.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator-result/command/speech-generator-result.command.repository.gateway';
import { SpeechGeneratorEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/speech-generator.entity';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SpeechGeneratorResultEntity } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator-result/speech-generator-result.entity';
import { UpdateSpeechGeneratorResultCompleteContentRequestDto } from '@module/customer/analysis-tool/module/speech-generator/dto/request/update-speech-generator-result-complete-content.request.dto';
import { UpdateSpeechGeneratorResultCompleteContentResponseDto } from '@module/customer/analysis-tool/module/speech-generator/dto/response/update-speech-generator-result-complete-content.response.dto';
import { SpeechGeneratorDoesNotContainCompleteContentError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-does-not-contain-complete-content.error';
import { SpeechGeneratorNotFoundError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateSpeechGeneratorResultCompleteContentUseCase {
  protected readonly _type =
    UpdateSpeechGeneratorResultCompleteContentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpeechGeneratorQueryRepositoryGateway)
    private readonly speechGeneratorQueryRepositoryGateway: SpeechGeneratorQueryRepositoryGateway,
    @Inject(SpeechGeneratorCommandRepositoryGateway)
    private readonly speechGeneratorCommandRepositoryGateway: SpeechGeneratorCommandRepositoryGateway,
    @Inject(SpeechGeneratorResultCommandRepositoryGateway)
    private readonly speechGeneratorResultCommandRepositoryGateway: SpeechGeneratorResultCommandRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    speechGeneratorId: SpeechGeneratorId,
    dto: UpdateSpeechGeneratorResultCompleteContentRequestDto,
  ): Promise<UpdateSpeechGeneratorResultCompleteContentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpeechGeneratorIdAndOrganizationIdAndAuthIdentityIdOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpeechGeneratorNotFoundError,
      );

    const speechGeneratorQueryResult =
      await this.speechGeneratorQueryRepositoryGateway.findOneBySpeechGeneratorIdAndOrganizationIdWithRelationsOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        SpeechGeneratorNotFoundError,
      );

    if (speechGeneratorQueryResult.speechGeneratorResult === null) {
      throw new SpeechGeneratorDoesNotContainCompleteContentError();
    }

    const markdownContent = this.exportDocumentGateway.convertHtmlToMarkdown(
      dto.htmlContent,
    );

    const speechGeneratorResult = new SpeechGeneratorResultEntity({
      id: speechGeneratorQueryResult.speechGeneratorResult.id,
      speechGeneratorCompleteContent: markdownContent,
      speechGeneratorSimplifiedContent:
        speechGeneratorQueryResult.speechGeneratorResult
          .speechGeneratorSimplifiedContent,
    });

    const speechGenerator = new SpeechGeneratorEntity({
      id: speechGeneratorQueryResult.id,
      speechGeneratorResult,
      speechGeneratorDocument: [],
      createdBy: analysisToolRecordQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.speechGeneratorResultCommandRepositoryGateway.updateSpeechGeneratorResult(
        speechGeneratorResult.id,
        speechGeneratorResult,
      ),
      this.speechGeneratorCommandRepositoryGateway.updateSpeechGenerator(
        speechGenerator.id,
        speechGenerator,
      ),
    ]);
    await transaction.commit();

    return UpdateSpeechGeneratorResultCompleteContentResponseDto.build({
      htmlContent: dto.htmlContent,
    });
  }
}
