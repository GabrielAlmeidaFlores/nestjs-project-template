import { Inject, Injectable, StreamableFile } from '@nestjs/common';

import { ExportDocumentFormatEnum } from '@module/customer/analysis-tool/lib/export-document/enum/export-document-type.enum';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { InitialPetitionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/query/initial-petition-generator.query.repository.gateway';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { InitialPetitionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-does-not-contain-complete-analysis.error';
import { InitialPetitionGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-not-found.error';

@Injectable()
export class DownloadInitialPetitionGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadInitialPetitionGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(InitialPetitionGeneratorQueryRepositoryGateway)
    private readonly initialPetitionGeneratorQueryRepositoryGateway: InitialPetitionGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    initialPetitionGeneratorId: InitialPetitionGeneratorId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    const initialPetitionGenerator =
      await this.initialPetitionGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        initialPetitionGeneratorId,
        InitialPetitionGeneratorNotFoundError,
      );

    const responseAi =
      initialPetitionGenerator.initialPetitionGeneratorCompleteAnalysis;

    if (responseAi === null) {
      throw new InitialPetitionGeneratorDoesNotContainCompleteAnalysisError();
    }

    return this.exportDocumentGateway.downloadFileAsStreamable(
      responseAi,
      format,
      'analise_completa_gerador_peticao_inicial',
    );
  }
}
