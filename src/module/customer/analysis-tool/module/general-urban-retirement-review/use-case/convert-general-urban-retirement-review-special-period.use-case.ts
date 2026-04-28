import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/general-urban-retirement-review-special-period.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/result/get-general-urban-retirement-review-special-period.query.result';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';
import { ConvertGeneralUrbanRetirementReviewSpecialPeriodResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/convert-general-urban-retirement-review-special-period.response.dto';
import { GeneralUrbanRetirementReviewSpecialPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-special-period-not-found.error';

interface GeneralUrbanRetirementReviewSpecialPeriodItemInterface {
  empresa: string;
  periodoInicio: string;
  periodoFim: string;
  categoria: string;
  tipoDeTrabalho: string;
  competenciaAbaixoDoMinimo: boolean;
  contribuicaoMedia: string;
  status: boolean;
}

@Injectable()
export class ConvertGeneralUrbanRetirementReviewSpecialPeriodUseCase {
  protected readonly _type =
    ConvertGeneralUrbanRetirementReviewSpecialPeriodUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway: GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
    generalUrbanRetirementReviewSpecialPeriodId: GeneralUrbanRetirementReviewSpecialPeriodId,
  ): Promise<ConvertGeneralUrbanRetirementReviewSpecialPeriodResponseDto> {
    await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFail(
      generalUrbanRetirementReviewId,
      GeneralUrbanRetirementReviewSpecialPeriodNotFoundError,
    );

    const generalUrbanRetirementReviewEntity =
      new GeneralUrbanRetirementReviewEntity({
        id: new GeneralUrbanRetirementReviewId(
          generalUrbanRetirementReviewId.toString(),
        ),
      });

    const specialPeriod: GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult =
      await this.generalUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewSpecialPeriodIdOrFail(
        generalUrbanRetirementReviewSpecialPeriodId,
        GeneralUrbanRetirementReviewSpecialPeriodNotFoundError,
      );

    const rawResponse = specialPeriod.response;

    let items: GeneralUrbanRetirementReviewSpecialPeriodItemInterface[];
    try {
      const parsed: unknown = JSON.parse(rawResponse);
      items = Array.isArray(parsed)
        ? (parsed as GeneralUrbanRetirementReviewSpecialPeriodItemInterface[])
        : [parsed as GeneralUrbanRetirementReviewSpecialPeriodItemInterface];
    } catch {
      items = [];
    }

    const periodEntities = items.map(
      (item) =>
        new GeneralUrbanRetirementReviewPeriodEntity({
          periodName: item.empresa ?? null,
          periodStart: item.periodoInicio ? new Date(item.periodoInicio) : null,
          periodEnd: item.periodoFim ? new Date(item.periodoFim) : null,
          category: item.categoria ?? null,
          isPendency: false,
          competenceBelowTheMinimum: item.competenciaAbaixoDoMinimo ?? false,
          contributionAverage: new DecimalValue(item.contribuicaoMedia ?? '0'),
          typeOfContribution: item.tipoDeTrabalho ?? null,
          status: item.status ?? null,
          generalUrbanRetirementReview: generalUrbanRetirementReviewEntity,
        }),
    );

    const transactions = periodEntities.map((entity) =>
      this.generalUrbanRetirementReviewPeriodCommandRepositoryGateway.createGeneralUrbanRetirementReviewPeriod(
        entity,
      ),
    );

    if (transactions.length > 0) {
      const tx =
        await this.baseTransactionRepositoryGateway.execute(transactions);
      await tx.commit();
    }

    return ConvertGeneralUrbanRetirementReviewSpecialPeriodResponseDto.build({
      generalUrbanRetirementReviewPeriodId:
        periodEntities[0]?.id ?? new GeneralUrbanRetirementReviewPeriodId(),
    });
  }
}
