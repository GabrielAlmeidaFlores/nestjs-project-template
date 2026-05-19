import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { JefWaiverDeclarationGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/repository/jef-waiver-declaration-generator-analysis-result/command/jef-waiver-declaration-generator.command.repository.gateway';
import { JefWaiverDeclarationGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/repository/jef-waiver-declaration-generator-analysis-result/query/jef-waiver-declaration-generator.query.repository.gateway';
import { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';
import { UpdateJefWaiverDeclarationGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/dto/request/update-jef-waiver-declaration-generator-complete-analysis.request.dto';
import { UpdateJefWaiverDeclarationGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/dto/response/update-jef-waiver-declaration-generator-complete-analysis.response.dto';
import { JefWaiverDeclarationGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/error/jef-waiver-declaration-generator-does-not-contain-complete-analysis.error';
import { JefWaiverDeclarationGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/error/jef-waiver-declaration-generator-not-found.error';

@Injectable()
export class UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase {
  protected readonly _type = UpdateJefWaiverDeclarationGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(JefWaiverDeclarationGeneratorQueryRepositoryGateway)
    private readonly jefWaiverDeclarationGeneratorQueryRepositoryGateway: JefWaiverDeclarationGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(JefWaiverDeclarationGeneratorCommandRepositoryGateway)
    private readonly jefWaiverDeclarationGeneratorCommandRepositoryGateway: JefWaiverDeclarationGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    jefWaiverDeclarationGeneratorId: JefWaiverDeclarationGeneratorId,
    dto: UpdateJefWaiverDeclarationGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateJefWaiverDeclarationGeneratorCompleteAnalysisResponseDto> {
    const jefWaiverDeclarationGenerator =
      await this.jefWaiverDeclarationGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        jefWaiverDeclarationGeneratorId,
        JefWaiverDeclarationGeneratorNotFoundError,
      );

    if (jefWaiverDeclarationGenerator.jefWaiverDeclarationGeneratorCompleteAnalysis === null) {
      throw new JefWaiverDeclarationGeneratorDoesNotContainCompleteAnalysisError();
    }

    const convertHtmlToMarkdown = this.exportDocumentGateway.convertHtmlToMarkdown(
      dto.jefWaiverDeclarationGeneratorCompleteAnalysis,
    );

    const convertMarkdownToHtml = await this.exportDocumentGateway.convertMarkdownToHtml(
      convertHtmlToMarkdown,
    );

    const updatedJefWaiverDeclarationGenerator = new JefWaiverDeclarationGeneratorEntity({
      ...jefWaiverDeclarationGenerator,
      jefWaiverDeclarationGeneratorCompleteAnalysis: convertHtmlToMarkdown,
    });

    const jefWaiverDeclarationGeneratorTransaction =
      this.jefWaiverDeclarationGeneratorCommandRepositoryGateway.updateJefWaiverDeclarationGenerator(
        jefWaiverDeclarationGenerator.id,
        updatedJefWaiverDeclarationGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      jefWaiverDeclarationGeneratorTransaction,
    );
    await transaction.commit();

    return UpdateJefWaiverDeclarationGeneratorCompleteAnalysisResponseDto.build({
      jefWaiverDeclarationGeneratorCompleteAnalysis: convertMarkdownToHtml,
    });
  }
}
