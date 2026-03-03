import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { ExportDocumentGateway } from '@module/customer/analysis-tool/lib/export-document/export-document.gateway';
import { AdministrativeRequestGeneratorCommandRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/command/administrative-request-generator.command.repository.gateway';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import { UpdateAdministrativeRequestGeneratorCompleteAnalysisRequestDto } from '@module/customer/documents-to-be-generated/module/administrative-request/dto/request/update-administrative-request-generator-complete-analysis.request.dto';
import { UpdateAdministrativeRequestGeneratorCompleteAnalysisResponseDto } from '@module/customer/documents-to-be-generated/module/administrative-request/dto/response/update-administrative-request-generator-complete-analysis.response.dto';
import { AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-does-not-contain-complete-analysis.error';
import { AdministrativeRequestGeneratorNotFoundError } from '@module/customer/documents-to-be-generated/module/administrative-request/error/administrative-request-generator-not-found.error';

@Injectable()
export class UpdateAdministrativeRequestGeneratorCompleteAnalysisUseCase {
  protected readonly _type =
    UpdateAdministrativeRequestGeneratorCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(AdministrativeRequestGeneratorQueryRepositoryGateway)
    private readonly administrativeRequestGeneratorQueryRepositoryGateway: AdministrativeRequestGeneratorQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AdministrativeRequestGeneratorCommandRepositoryGateway)
    private readonly administrativeRequestGeneratorCommandRepositoryGateway: AdministrativeRequestGeneratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    administrativeRequestGeneratorId: AdministrativeRequestGeneratorId,
    dto: UpdateAdministrativeRequestGeneratorCompleteAnalysisRequestDto,
  ): Promise<UpdateAdministrativeRequestGeneratorCompleteAnalysisResponseDto> {
    const administrativeRequestGenerator =
      await this.administrativeRequestGeneratorQueryRepositoryGateway.findOneByIdOrFail(
        administrativeRequestGeneratorId,
        AdministrativeRequestGeneratorNotFoundError,
      );

    if (
      administrativeRequestGenerator.administrativeRequestGeneratorCompleteAnalysis ===
      null
    ) {
      throw new AdministrativeRequestGeneratorDoesNotContainCompleteAnalysisError();
    }

    const convertHtmlToMarkdown =
      this.exportDocumentGateway.convertHtmlToMarkdown(
        dto.administrativeRequestGeneratorCompleteAnalysis,
      );

    const convertMarkdownToHtml =
      await this.exportDocumentGateway.convertMarkdownToHtml(
        convertHtmlToMarkdown,
      );

    const updatedAdministrativeRequestGenerator =
      new AdministrativeRequestGeneratorEntity({
        ...administrativeRequestGenerator,
        administrativeRequestGeneratorCompleteAnalysis: convertHtmlToMarkdown,
      });

    const administrativeRequestGeneratorTransaction =
      this.administrativeRequestGeneratorCommandRepositoryGateway.updateAdministrativeRequestGenerator(
        administrativeRequestGenerator.id,
        updatedAdministrativeRequestGenerator,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      administrativeRequestGeneratorTransaction,
    );
    await transaction.commit();

    return UpdateAdministrativeRequestGeneratorCompleteAnalysisResponseDto.build(
      {
        administrativeRequestGeneratorCompleteAnalysis: convertMarkdownToHtml,
      },
    );
  }
}
