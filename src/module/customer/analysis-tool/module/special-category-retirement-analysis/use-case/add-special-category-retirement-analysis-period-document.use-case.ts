import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/command/special-category-retirement-analysis-period-document.command.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/special-category-retirement-analysis-work-period.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/special-category-retirement-analysis-period-document.entity';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/add-special-category-retirement-analysis-period-document.request.dto';
import { AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/add-special-category-retirement-analysis-period-document.response.dto';
import { SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-work-period-not-found.error';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase {
  protected readonly _type =
    AddSpecialCategoryRetirementAnalysisPeriodDocumentUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway)
    private readonly workPeriodQueryRepositoryGateway: SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway,
    @Inject(
      SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    )
    private readonly periodDocumentCommandRepositoryGateway: SpecialCategoryRetirementAnalysisPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
    dto: AddSpecialCategoryRetirementAnalysisPeriodDocumentRequestDto,
  ): Promise<AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto> {
    await this.workPeriodQueryRepositoryGateway.findOneByIdOrFail(
      workPeriodId,
      SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError,
    );

    const buffer = dto.document.base64.decodeToBuffer();

    const fileModel = FileModel.build({
      buffer,
      originalName: dto.document.originalFileName,
      size: buffer.length,
      encoding: '7bit',
    });

    const storedFileExternalName =
      await this.fileProcessorGateway.uploadFile(fileModel);

    const periodDocument =
      new SpecialCategoryRetirementAnalysisPeriodDocumentEntity({
        specialCategoryRetirementAnalysisWorkPeriodId: workPeriodId,
        storedFileExternalName,
        originalFileUploadName: dto.document.originalFileName,
        retirementDocumentTypeCategory: dto.retirementDocumentTypeCategory,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.periodDocumentCommandRepositoryGateway.createSpecialCategoryRetirementAnalysisPeriodDocument(
        periodDocument,
      ),
    ]);

    await transaction.commit();

    return AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto.build({
      specialCategoryRetirementAnalysisPeriodDocumentId: periodDocument.id,
    });
  }
}
