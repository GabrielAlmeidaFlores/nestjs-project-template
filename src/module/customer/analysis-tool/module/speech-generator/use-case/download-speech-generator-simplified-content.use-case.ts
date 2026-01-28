import { Inject, Injectable } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { SpeechGeneratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/speech-generator.query.repository.gateway';
import { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import { SpeechGeneratorDoesNotContainSimplifiedContentError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-does-not-contain-simplified-content.error';
import { SpeechGeneratorNotFoundError } from '@module/customer/analysis-tool/module/speech-generator/error/speech-generator-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DownloadSpeechGeneratorSimplifiedContentUseCase {
  protected readonly _type =
    DownloadSpeechGeneratorSimplifiedContentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(SpeechGeneratorQueryRepositoryGateway)
    private readonly speechGeneratorQueryRepositoryGateway: SpeechGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    speechGeneratorId: SpeechGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const speechGeneratorQueryResult =
      await this.speechGeneratorQueryRepositoryGateway.findOneBySpeechGeneratorIdAndOrganizationIdWithRelationsOrFail(
        speechGeneratorId,
        organizationSessionData.organizationId,
        SpeechGeneratorNotFoundError,
      );

    if (speechGeneratorQueryResult.speechGeneratorResult === null) {
      throw new SpeechGeneratorNotFoundError();
    }

    const content =
      speechGeneratorQueryResult.speechGeneratorResult
        .speechGeneratorSimplifiedContent;

    if (content === null) {
      throw new SpeechGeneratorDoesNotContainSimplifiedContentError();
    }

    return await this.exportDocumentGateway.downloadFileAsStreamable(
      content,
      format,
      'discurso_simplificado_gerador_discurso',
    );
  }
}
