import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period/command/general-urban-retirement-grant-period.command.repository.gateway';
import { GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-period-document/command/general-urban-retirement-grant-period-document.command.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/enum/reason-pendency.enum';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.entity';
import { CreateGeneralUrbanRetirementGrantPeriodRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-period.request.dto';
import { CreateGeneralUrbanRetirementGrantPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-period.response.dto';
import { GeneralUrbanRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-not-found.error';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateGeneralUrbanRetirementGrantPeriodUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementGrantPeriodUseCase.name;

  public constructor(
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodCommandRepositoryGateway: GeneralUrbanRetirementGrantPeriodCommandRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway: GeneralUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
  ) {}

  public async execute(
    dto: CreateGeneralUrbanRetirementGrantPeriodRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantPeriodResponseDto> {
    const generalUrbanRetirementGrant =
      await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFail(
        dto.json.generalUrbanRetirementGrantId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    const generalUrbanRetirementGrantEntity =
      new GeneralUrbanRetirementGrantEntity({
        ...generalUrbanRetirementGrant,
      });

    let reasonPendency: ReasonPendencyEnum | null = null;
    let isPendency = false;
    if (dto.json.competenceBelowTheMinimum === true) {
      reasonPendency = ReasonPendencyEnum.COMPETENCE_BELOW_MINIMUM;
    }

    if (reasonPendency !== null) {
      isPendency = true;
    }

    const period = new GeneralUrbanRetirementGrantPeriodEntity({
      periodName: dto.json.periodName,
      periodStart: dto.json.periodStart,
      periodEnd: dto.json.periodEnd ?? null,
      category: dto.json.category,
      isPendency,
      competenceBelowTheMinimum: dto.json.competenceBelowTheMinimum,
      contributionAverage: new DecimalValue(dto.json.contributionAverage),
      typeOfContribution: dto.json.typeOfContribution,
      generalUrbanRetirementGrant: generalUrbanRetirementGrantEntity,
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

              return new GeneralUrbanRetirementGrantPeriodDocumentEntity({
                document: documentUrl,
                generalUrbanRetirementGrantPeriod: period,
              });
            }),
          )
        : [];

    await this.createOnDatabase(period, documents);

    return CreateGeneralUrbanRetirementGrantPeriodResponseDto.build({
      generalUrbanRetirementGrantPeriodId: period.id,
    });
  }

  private async createOnDatabase(
    generalUrbanRetirementGrantPeriod: GeneralUrbanRetirementGrantPeriodEntity,
    generalUrbanRetirementGrantPeriodDocuments?: GeneralUrbanRetirementGrantPeriodDocumentEntity[],
  ): Promise<void> {
    const periodTransaction =
      this.generalUrbanRetirementGrantPeriodCommandRepositoryGateway.createGeneralUrbanRetirementGrantPeriod(
        generalUrbanRetirementGrantPeriod,
      );

    const documentTransactions =
      generalUrbanRetirementGrantPeriodDocuments?.map((value) => {
        return this.generalUrbanRetirementGrantPeriodDocumentCommandRepositoryGateway.createGeneralUrbanRetirementGrantPeriodDocument(
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
