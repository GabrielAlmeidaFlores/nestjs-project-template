import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { MarkdownConverterGateway } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import {
  GetSpeechGeneratorResponseDto,
  GetSpeechGeneratorClientResponseDto,
  GetSpeechGeneratorResultResponseDto,
  GetSpeechGeneratorResponsibleResponseDto,
  GetSpeechGeneratorDocumentResponseDto,
} from '@module/customer/analysis-tool/module/speech-generator/dto/response/get-speech-generator.response.dto';
import { SpeechGeneratorNotFoundError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetSpeechGeneratorUseCase {
  protected readonly _type = GetSpeechGeneratorUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpeechGeneratorQueryRepositoryGateway)
    private readonly speechGeneratorQueryRepositoryGateway: SpeechGeneratorQueryRepositoryGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    speechGeneratorId: SpeechGeneratorId,
  ): Promise<GetSpeechGeneratorResponseDto> {
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

    let speechGeneratorResultDto = null;
    if (speechGeneratorQueryResult.speechGeneratorResult !== null) {
      const completeContentMarkdown =
        speechGeneratorQueryResult.speechGeneratorResult
          .speechGeneratorCompleteContent;
      const completeContent =
        completeContentMarkdown !== null
          ? await this.markdownConverterGateway.convertToHtml(
              completeContentMarkdown,
            )
          : null;

      const simplifiedContentMarkdown =
        speechGeneratorQueryResult.speechGeneratorResult
          .speechGeneratorSimplifiedContent;
      const simplifiedContent =
        simplifiedContentMarkdown !== null
          ? await this.markdownConverterGateway.convertToHtml(
              simplifiedContentMarkdown,
            )
          : null;

      speechGeneratorResultDto = GetSpeechGeneratorResultResponseDto.build({
        clientName: speechGeneratorQueryResult.speechGeneratorResult.clientName,
        clientFederalDocument:
          speechGeneratorQueryResult.speechGeneratorResult
            .clientFederalDocument,
        clientBirthDate:
          speechGeneratorQueryResult.speechGeneratorResult.clientBirthDate,
        clientLastAffiliationDate:
          speechGeneratorQueryResult.speechGeneratorResult.clientLastAffiliationDate,
        speechGeneratorCompleteContent: completeContent,
        speechGeneratorSimplifiedContent: simplifiedContent,
        createdAt: speechGeneratorQueryResult.speechGeneratorResult.createdAt,
        updatedAt: speechGeneratorQueryResult.speechGeneratorResult.updatedAt,
      });
    }

    const response = GetSpeechGeneratorResponseDto.build({
      id: speechGeneratorQueryResult.id,
      status: analysisToolRecordQueryResult.status,
      updatedAt: analysisToolRecordQueryResult.updatedAt,
      createdAt: analysisToolRecordQueryResult.createdAt,
      analysisToolClient: GetSpeechGeneratorClientResponseDto.build({
        id: analysisToolRecordQueryResult.analysisToolClient.id,
        name: analysisToolRecordQueryResult.analysisToolClient.name,
      }),
      speechGeneratorResult: speechGeneratorResultDto,
      inssBenefitNumber: speechGeneratorQueryResult.speechGeneratorBenefit.map(
        (t) => t.inssBenefitNumber,
      ),
      legalProceedingNumber:
        speechGeneratorQueryResult.speechGeneratorLegalProceeding.map(
          (t) => t.legalProceedingNumber,
        ),
      createdBy: GetSpeechGeneratorResponsibleResponseDto.build({
        id: analysisToolRecordQueryResult.createdBy.customer.id,
        name: analysisToolRecordQueryResult.createdBy.customer.name,
      }),
      updatedBy: GetSpeechGeneratorResponsibleResponseDto.build({
        id: analysisToolRecordQueryResult.updatedBy.customer.id,
        name: analysisToolRecordQueryResult.updatedBy.customer.name,
      }),
    });

    if (speechGeneratorQueryResult.speechGeneratorDocument.length > 0) {
      const documents = await Promise.all(
        speechGeneratorQueryResult.speechGeneratorDocument.map(
          async (document) => {
            const url = await this.fileProcessorGateway.getFileSignedUrl(
              document.document,
            );
            const originalFileName =
              await this.fileProcessorGateway.getOriginalFileName(
                document.document,
              );
            return { url, originalFileName };
          },
        ),
      );
      response.speechGeneratorDocuments = documents.map((d) =>
        GetSpeechGeneratorDocumentResponseDto.build({
          url: d.url.toString(),
          originalFileName: d.originalFileName.toString(),
        }),
      );
    }

    if (
      analysisToolRecordQueryResult.createdBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.createdBy.customer.profilePicture,
      );
      response.createdBy.profilePicture = profilePicture.toString();
    }

    if (
      analysisToolRecordQueryResult.updatedBy.customer.profilePicture !== null
    ) {
      const profilePicture = await this.fileProcessorGateway.getFileSignedUrl(
        analysisToolRecordQueryResult.updatedBy.customer.profilePicture,
      );
      response.updatedBy.profilePicture = profilePicture.toString();
    }

    return response;
  }
}
