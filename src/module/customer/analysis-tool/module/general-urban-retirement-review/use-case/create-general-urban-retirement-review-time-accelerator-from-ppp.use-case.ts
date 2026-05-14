import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/general-urban-retirement-review-special-period.query.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/command/general-urban-retirement-review-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorFromPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/create-general-urban-retirement-review-time-accelerator-from-ppp.request.dto';
import { CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/create-general-urban-retirement-review-time-accelerator.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { GeneralUrbanRetirementReviewSpecialPeriodNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-special-period-not-found.error';

type PppAnalysisItemType = {
  tipo?: string;
  nome?: string;
  empresa?: string;
  periodoInicio?: string;
  periodoFim?: string;
  viabilidade?: string;
  reconhecimentoINSS?: string;
  impactoCarencia?: boolean | string;
  reconhecimentoJudicial?: string;
  tempoContribuicao?: string;
  observacaoTecnica?: string;
};

@Injectable()
export class CreateGeneralUrbanRetirementReviewTimeAcceleratorFromPppUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementReviewTimeAcceleratorFromPppUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway)
    private readonly specialPeriodQueryRepositoryGateway: GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway)
    private readonly timeAcceleratorCommandRepositoryGateway: GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateGeneralUrbanRetirementReviewTimeAcceleratorFromPppRequestDto,
  ): Promise<CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto> {
    const specialPeriod =
      await this.specialPeriodQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewSpecialPeriodIdOrFail(
        dto.json.generalUrbanRetirementReviewSpecialPeriodId,
        GeneralUrbanRetirementReviewSpecialPeriodNotFoundError,
      );

    const generalUrbanRetirementReviewRecord =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        dto.json.generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const generalUrbanRetirementReview = new GeneralUrbanRetirementReviewEntity(
      { ...generalUrbanRetirementReviewRecord },
    );

    const rawResponse = specialPeriod.response;

    let jsonString = rawResponse.trim();
    const codeFenceMatch = rawResponse.match(
      /```(?:json)?\s*([\s\S]*?)\s*```/i,
    );
    if (
      codeFenceMatch !== null &&
      typeof codeFenceMatch[1] === 'string' &&
      codeFenceMatch[1].trim() !== ''
    ) {
      jsonString = codeFenceMatch[1].trim();
    }

    let items: PppAnalysisItemType[] = [];
    try {
      const parsed: unknown = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        items = parsed as PppAnalysisItemType[];
      } else if (parsed !== null && typeof parsed === 'object') {
        items = [parsed as PppAnalysisItemType];
      }
    } catch {
      items = [];
    }

    if (items.length === 0) {
      items = [{}];
    }

    const item: PppAnalysisItemType = items[0] ?? {};

    const parseDate = (value?: string): Date | null => {
      if (value === undefined || value.trim() === '') {
        return null;
      }
      const normalized = value.replace(/\//g, '-');
      const d = new Date(normalized);
      return isNaN(d.getTime()) ? null : d;
    };

    const resolveBoolean = (value?: boolean | string): boolean => {
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'string') {
        return value === 'true' || value === 'TRUE' || value === '1';
      }
      return false;
    };

    const timeAccelerator =
      new GeneralUrbanRetirementReviewTimeAcceleratorEntity({
        timeType: item.tipo ?? 'Análise de PPP',
        name: item.nome ?? null,
        institution: item.empresa ?? null,
        periodStart: parseDate(item.periodoInicio),
        periodEnd: parseDate(item.periodoFim),
        viability: item.viabilidade ?? null,
        technicalNote: item.observacaoTecnica ?? null,
        affectsQualifyingPeriod: resolveBoolean(item.impactoCarencia),
        timeGained: item.tempoContribuicao ?? null,
        recognitionInss: item.reconhecimentoINSS ?? 'N/A',
        recognitionJudicial: item.reconhecimentoJudicial ?? 'N/A',
        generalUrbanRetirementReview,
      });

    const createTx =
      this.timeAcceleratorCommandRepositoryGateway.createGeneralUrbanRetirementReviewTimeAccelerator(
        timeAccelerator,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      createTx,
    ]);

    await transactions.commit();

    return CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto.build({
      generalUrbanRetirementReviewTimeAcceleratorId: timeAccelerator.id,
    });
  }
}
