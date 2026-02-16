import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { AudienceQuestionGeneratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/command/audience-question-generator.command.repository.gateway';
import { AudienceQuestionGeneratorBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-benefit/command/audience-question-generator-benefit.command.repository.gateway';
import { AudienceQuestionGeneratorDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-document/command/audience-question-generator-document.command.repository.gateway';
import { AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator-legal-proceeding/command/audience-question-generator-legal-proceeding.command.repository.gateway';
import { AudienceQuestionGeneratorEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/audience-question-generator.entity';
import { AudienceQuestionGeneratorBenefitEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-benefit/audience-question-generator-benefit.entity';
import { AudienceQuestionGeneratorDocumentEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-document/audience-question-generator-document.entity';
import { AudienceQuestionGeneratorLegalProceedingEntity } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator-legal-proceeding/audience-question-generator-legal-proceeding.entity';
import { CreateAudienceQuestionGeneratorRequestDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/request/create-audience-question-generator.request.dto';
import { CreateAudienceQuestionGeneratorResponseDto } from '@module/customer/analysis-tool/module/audience-question-generator/dto/response/create-audience-question-generator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAudienceQuestionGeneratorUseCase {
  protected readonly _type = CreateAudienceQuestionGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorCommandRepositoryGateway: AudienceQuestionGeneratorCommandRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AudienceQuestionGeneratorDocumentCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorDocumentCommandRepositoryGateway: AudienceQuestionGeneratorDocumentCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorBenefitCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorBenefitCommandRepositoryGateway: AudienceQuestionGeneratorBenefitCommandRepositoryGateway,
    @Inject(AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway)
    private readonly audienceQuestionGeneratorLegalProceedingCommandRepositoryGateway: AudienceQuestionGeneratorLegalProceedingCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateAudienceQuestionGeneratorRequestDto,
  ): Promise<CreateAudienceQuestionGeneratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const audienceQuestionDocumentFiles = await Promise.all(
      dto.audienceQuestionDocument !== undefined
        ? dto.audienceQuestionDocument.map(async (value) => {
            return await this.fileProcessorGateway.uploadFile(value);
          })
        : [],
    );

    const analysisToolClientQueryResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        dto.json.analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQueryResult,
      createdBy: analysisToolClientQueryResult.createdBy.id,
      updatedBy: analysisToolClientQueryResult.updatedBy.id,
    });

    const audienceQuestionGenerator = new AudienceQuestionGeneratorEntity({
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    const audienceQuestionDocuments = audienceQuestionDocumentFiles.map(
      (value) => {
        return new AudienceQuestionGeneratorDocumentEntity({
          document: value,
          audienceQuestionGenerator,
        });
      },
    );

    const audienceQuestionGeneratorBenefits = (
      dto.json.inssBenefitNumber ?? []
    ).map(
      (inssBenefitNumber) =>
        new AudienceQuestionGeneratorBenefitEntity({
          inssBenefitNumber,
          audienceQuestionGenerator,
        }),
    );

    const audienceQuestionGeneratorLegalProceedings = (
      dto.json.legalProceedingNumber ?? []
    ).map(
      (legalProceedingNumber) =>
        new AudienceQuestionGeneratorLegalProceedingEntity({
          legalProceedingNumber,
          audienceQuestionGenerator,
        }),
    );

    const countRecords: number =
      await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
      );

    const analysisToolRecord = new AnalysisToolRecordEntity({
      code: new AnalysisToolRecordCode(countRecords + 1),
      type: AnalysisToolRecordTypeEnum.AUDIENCE_QUESTIONS_GENERATOR,
      audienceQuestionGenerator,
      analysisToolClient,
      status: AnalysisStatusEnum.IN_PROGRESS,
      createdBy: organizationMember.id,
      updatedBy: organizationMember.id,
    });

    await this.createOnDatabase(
      audienceQuestionGenerator,
      analysisToolRecord,
      audienceQuestionDocuments,
      audienceQuestionGeneratorBenefits,
      audienceQuestionGeneratorLegalProceedings,
    );

    return CreateAudienceQuestionGeneratorResponseDto.build({
      audienceQuestionGeneratorId: audienceQuestionGenerator.id,
    });
  }

  private async createOnDatabase(
    audienceQuestionGenerator: AudienceQuestionGeneratorEntity,
    analysisToolRecord: AnalysisToolRecordEntity,
    audienceQuestionDocuments: AudienceQuestionGeneratorDocumentEntity[],
    audienceQuestionGeneratorBenefits: AudienceQuestionGeneratorBenefitEntity[],
    audienceQuestionGeneratorLegalProceedings: AudienceQuestionGeneratorLegalProceedingEntity[],
  ): Promise<void> {
    const allAudienceQuestionGeneratorDocuments = audienceQuestionDocuments.map(
      (value) => {
        return this.audienceQuestionGeneratorDocumentCommandRepositoryGateway.createAudienceQuestionGeneratorDocument(
          value,
        );
      },
    );

    const allAudienceQuestionGeneratorBenefits =
      audienceQuestionGeneratorBenefits.map((value) => {
        return this.audienceQuestionGeneratorBenefitCommandRepositoryGateway.createAudienceQuestionGeneratorBenefit(
          value,
        );
      });

    const allAudienceQuestionGeneratorLegalProceedings =
      audienceQuestionGeneratorLegalProceedings.map((value) => {
        return this.audienceQuestionGeneratorLegalProceedingCommandRepositoryGateway.createAudienceQuestionGeneratorLegalProceeding(
          value,
        );
      });

    const audienceQuestionGeneratorTransaction =
      this.audienceQuestionGeneratorCommandRepositoryGateway.createAudienceQuestionGenerator(
        audienceQuestionGenerator,
      );

    const analysisToolRecordTransaction =
      this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
        analysisToolRecord,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      audienceQuestionGeneratorTransaction,
      ...allAudienceQuestionGeneratorDocuments,
      ...allAudienceQuestionGeneratorBenefits,
      ...allAudienceQuestionGeneratorLegalProceedings,
      analysisToolRecordTransaction,
    ]);

    await transaction.commit();
  }
}
