import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { InitialPetitionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/command/initial-petition-generator.command.repository.gateway';
import { InitialPetitionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/repository/initial-petition-generator-analysis-result/query/initial-petition-generator.query.repository.gateway';
import { InitialPetitionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator.entity';
import { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import { UpdateInitialPetitionGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/initial-petition/dto/request/update-initial-petition-generator-complete-analysis.request.dto';
import { UpdateInitialPetitionGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/initial-petition/dto/response/update-initial-petition-generator-complete-analysis.response.dto';
import { InitialPetitionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-does-not-contain-complete-analysis.error';
import { InitialPetitionGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/initial-petition/error/initial-petition-generator-not-found.error';

@Injectable()
export class UpdateInitialPetitionGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    UpdateInitialPetitionGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(InitialPetitionGeneratorQueryRepositoryGateway)
    private readonly initialPetitionGeneratorQueryRepositoryGateway: InitialPetitionGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(InitialPetitionGeneratorCommandRepositoryGateway)
    private readonly initialPetitionGeneratorCommandRepositoryGateway: InitialPetitionGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    initialPetitionGeneratorId: InitialPetitionGeneratorId,
    dto: UpdateInitialPetitionGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateInitialPetitionGeneratorCompleteAnalysisResponseDto> {
    const initialPetitionGenerator =
      await this.initialPetitionGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        initialPetitionGeneratorId,
        InitialPetitionGeneratorNotFoundError,
      );

    if (
      initialPetitionGenerator.initialPetitionGeneratorCompleteAnalysis === null
    ) {
      throw new InitialPetitionGeneratorDoesNotContainCompleteAnalysisError();
    }

    const convertHtmlToMarkdown =
      this.exportDocumentGateway.convertHtmlToMarkdown(
        dto.initialPetitionGeneratorCompleteAnalysis,
      );

    const convertMarkdownToHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        convertHtmlToMarkdown,
      );

    const updatedInitialPetitionGenerator = new InitialPetitionGeneratorEntity({
      ...initialPetitionGenerator,
      initialPetitionGeneratorCompleteAnalysis: convertHtmlToMarkdown,
    });

    const initialPetitionGeneratorTransaction =
      this.initialPetitionGeneratorCommandRepositoryGateway.updateInitialPetitionGenerator(
        initialPetitionGenerator.id,
        updatedInitialPetitionGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      initialPetitionGeneratorTransaction,
    );
    await transaction.commit();

    return UpdateInitialPetitionGeneratorCompleteAnalysisResponseDto.build({
      initialPetitionGeneratorCompleteAnalysis: convertMarkdownToHtml,
    });
  }
}
