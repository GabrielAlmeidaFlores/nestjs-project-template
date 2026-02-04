import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { FullOpinionGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/command/full-opinion-generator.command.repository.gateway';
import { FullOpinionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/query/full-opinion-generator.query.repository.gateway';
import { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import { UpdateFullOpinionGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/full-opinion/dto/request/update-full-opinion-generator-complete-analysis.request.dto';
import { UpdateFullOpinionGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/full-opinion/dto/response/update-full-opinion-generator-complete-analysis.response.dto';
import { FullOpinionGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-does-not-contain-complete-analysis.error';
import { FullOpinionGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/full-opinion/error/full-opinion-generator-not-found.error';

@Injectable()
export class UpdateFullOpinionGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    UpdateFullOpinionGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(FullOpinionGeneratorQueryRepositoryGateway)
    private readonly fullOpinionGeneratorQueryRepositoryGateway: FullOpinionGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(FullOpinionGeneratorCommandRepositoryGateway)
    private readonly fullOpinionGeneratorCommandRepositoryGateway: FullOpinionGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    fullOpinionGeneratorId: FullOpinionGeneratorId,
    dto: UpdateFullOpinionGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateFullOpinionGeneratorCompleteAnalysisResponseDto> {
    const fullOpinionGenerator =
      await this.fullOpinionGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        fullOpinionGeneratorId,
        FullOpinionGeneratorNotFoundError,
      );

    if (fullOpinionGenerator.fullOpinionGeneratorCompleteAnalysis === null) {
      throw new FullOpinionGeneratorDoesNotContainCompleteAnalysisError();
    }

    const convertHtmlToMarkdown =
      this.exportDocumentGateway.convertHtmlToMarkdown(
        dto.fullOpinionGeneratorCompleteAnalysis,
      );

    const convertMarkdownToHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        convertHtmlToMarkdown,
      );

    const updatedFullOpinionGenerator = new FullOpinionGeneratorEntity({
      ...fullOpinionGenerator,
      fullOpinionGeneratorCompleteAnalysis: convertHtmlToMarkdown,
    });

    const fullOpinionGeneratorTransaction =
      this.fullOpinionGeneratorCommandRepositoryGateway.updateFullOpinionGenerator(
        fullOpinionGenerator.id,
        updatedFullOpinionGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      fullOpinionGeneratorTransaction,
    );
    await transaction.commit();

    return UpdateFullOpinionGeneratorCompleteAnalysisResponseDto.build({
      fullOpinionGeneratorCompleteAnalysis: convertMarkdownToHtml,
    });
  }
}
