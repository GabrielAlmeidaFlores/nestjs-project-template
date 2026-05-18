import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period-document/command/general-urban-retirement-review-period-document.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/general-urban-retirement-review-period-document.entity';
import { CreateGeneralUrbanRetirementReviewPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-period.request.dto';
import { CreateGeneralUrbanRetirementReviewPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-period.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateGeneralUrbanRetirementReviewPeriodUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementReviewPeriodUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: CreateGeneralUrbanRetirementReviewPeriodRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewPeriodResponseDto> {
    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFail(
        dto.json.generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const generalUrbanRetirementReviewEntity =
      new GeneralUrbanRetirementReviewEntity({
        ...generalUrbanRetirementReview,
      });

    let reasonPendency: ReasonPendencyEnum | null = null;
    let isPendency = false;
    if (dto.json.competenceBelowTheMinimum === true) {
      reasonPendency = ReasonPendencyEnum.COMPETENCE_BELOW_MINIMUM;
    }

    if (reasonPendency !== null) {
      isPendency = true;
    }

    const period = new GeneralUrbanRetirementReviewPeriodEntity({
      periodName: dto.json.periodName,
      periodStart: dto.json.periodStart,
      periodEnd: dto.json.periodEnd ?? null,
      category: dto.json.category,
      isPendency,
      competenceBelowTheMinimum: dto.json.competenceBelowTheMinimum,
      contributionAverage: new DecimalValue(dto.json.contributionAverage),
      typeOfContribution: dto.json.typeOfContribution,
      generalUrbanRetirementReview: generalUrbanRetirementReviewEntity,
      status: dto.json.status,
      reasonPendency,
    });

    const documents =
      dto.documents !== undefined
        ? await Promise.all(
            dto.documents.map(async (value) => {
              const buffer = value.file.base64.decodeToBuffer();

              const fileModel = FileModel.build({
                buffer,
                originalName: value.file.originalFileName,
                size: buffer.length,
                encoding: '7bit',
              });

              const documentUrl =
                await this.fileProcessorGateway.uploadFile(fileModel);

              return new GeneralUrbanRetirementReviewPeriodDocumentEntity({
                document: documentUrl,
                generalUrbanRetirementReviewPeriod: period,
              });
            }),
          )
        : [];

    await this.createOnDatabase(period, documents);

    return CreateGeneralUrbanRetirementReviewPeriodResponseDto.build({
      generalUrbanRetirementReviewPeriodId: period.id,
    });
  }

  private async createOnDatabase(
    generalUrbanRetirementReviewPeriod: GeneralUrbanRetirementReviewPeriodEntity,
    generalUrbanRetirementReviewPeriodDocuments?: GeneralUrbanRetirementReviewPeriodDocumentEntity[],
  ): Promise<void> {
    const periodTransaction =
      this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.createGeneralUrbanRetirementReviewPeriod(
        generalUrbanRetirementReviewPeriod,
      );

    const documentTransactions =
      generalUrbanRetirementReviewPeriodDocuments?.map((value) => {
        return this.generalUrbanRetirementReviewPeriodDocumentCommandRepositoryGateway.createGeneralUrbanRetirementReviewPeriodDocument(
          value,
        );
      }) ?? [];

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      periodTransaction,
      ...documentTransactions,
    ]);

    await transactions.commit();
  }
}
