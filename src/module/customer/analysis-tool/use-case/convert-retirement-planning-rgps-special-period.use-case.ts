import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period/command/retirement-planning-rgps-period.repository.gateway';
import { GetRetirementPlanningRgpsSpecialPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/result/get-retirement-planning-rgps-special-period.query.result';
import { RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/retirement-planning-rgps-special-period.query.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';
import { ConvertRetirementPlanningRgpsSpecialPeriodResponseDto } from '@module/customer/analysis-tool/dto/response/convert-retirement-planning-rgps-special-period-response.response.dto';
import { RetirementPlanningRgpsSpecialPeriodNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-special-period-not-found.error';

export interface RetirementPlanningSpecialPeriodAnalysisInterface {
  identificacao_analise: {
    id_analise: string;
    data_analise: string;
    versao_prompt: string;
    modelo_ia: string;
  };
  cliente: {
    nome: string;
    cpf: string | null;
    sexo: string;
    data_nascimento: string;
  };
  resumo_executivo: {
    tipo: string;
    nome: string;
    empresa: string;
    periodoInicio: string;
    periodoFim: string;
    viabilidade: string;
    viabilidadeTempoEspecial: boolean;
    reconhecimentoINSS: string;
    impactoCarencia: boolean;
    reconhecimentoJudicial: string;
    tempoContribuicao: string;
    observacaoTecnica: string;
  };
  documentos_analisados: DocumentAnalyzedInterface[];
}

export interface DocumentAnalyzedInterface {
  tipo_documento: string;
  numero_documento: string;
  metadados?: Record<string, unknown>;
  periodos?: PeriodInterface[];
  responsaveis_tecnicos?: ResponsibleTechnicalInterface[];
  representante_legal?: Record<string, unknown>;
}

export interface PeriodInterface {
  periodoInicio?: string;
  periodoFim?: string;
  dataInicio?: string;
  dataFim?: string;
  empresa?: string;
  empregador?: string;
  setor?: string;
  cargo?: string;
  funcao?: string;
  cbo?: string | number;
  descricao?: string;
  agentes?: Array<
    | {
        tipo?: string;
        nome?: string;
        intensidade?: string | number;
        unidade?: string;
        observacao?: string;
      }
    | string
  >;
}

export interface ResponsibleTechnicalInterface {
  nome?: string;
  cargo?: string;
  registro?: string;
  conselho?: string;
  assinatura?: string;
}

@Injectable()
export class ConvertRetirementPlanningRgpsSpecialPeriodUseCase {
  protected readonly _type =
    ConvertRetirementPlanningRgpsSpecialPeriodUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsSpecialPeriodQueryRepositoryGateway: RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodCommandRepositoryGateway: RetirementPlanningRgpsPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    retirementPlanningRgpsSpecialPeriodId: RetirementPlanningRgpsSpecialPeriodId,
  ): Promise<ConvertRetirementPlanningRgpsSpecialPeriodResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFail(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsSpecialPeriodNotFoundError,
      );

    const retirementPlanningRgpsEntity = new RetirementPlanningRgpsEntity({
      id: new RetirementPlanningRgpsId(retirementPlanningRgps.id.toString()),
    });

    const specialPeriod: GetRetirementPlanningRgpsSpecialPeriodQueryResult =
      await this.retirementPlanningRgpsSpecialPeriodQueryRepositoryGateway.findOneByRetirementPlanningRgpsSpecialPeriodIdOrFail(
        retirementPlanningRgpsSpecialPeriodId,
        RetirementPlanningRgpsSpecialPeriodNotFoundError,
      );

    const rawResponse = specialPeriod.response;

    let jsonString = '';
    const codeFenceMatch = rawResponse.match(
      /```(?:json)?\s*([\s\S]*?)\s*```/i,
    );

    if (
      codeFenceMatch &&
      typeof codeFenceMatch[1] === 'string' &&
      codeFenceMatch[1].trim() !== ''
    ) {
      jsonString = codeFenceMatch[1].trim();
    } else {
      const objMatch = rawResponse.match(/\{[\s\S]*\}/);
      jsonString = objMatch ? objMatch[0] : '{}';
    }

    let parsed: RetirementPlanningSpecialPeriodAnalysisInterface;
    try {
      parsed = JSON.parse(
        jsonString,
      ) as RetirementPlanningSpecialPeriodAnalysisInterface;
    } catch {
      throw new RetirementPlanningRgpsSpecialPeriodNotFoundError();
    }

    const periodEntity = new RetirementPlanningRgpsPeriodEntity({
      periodName: parsed.resumo_executivo.nome,
      periodStart: new Date(parsed.resumo_executivo.periodoInicio),
      periodEnd: new Date(parsed.resumo_executivo.periodoFim),
      category: 'Especial',
      isPendency: false,
      competenceBelowTheMinimum: true,
      contributionAverage: new DecimalValue(0),
      typeOfContribution: 'Urbano',
      retirementPlanningRgps: retirementPlanningRgpsEntity,
    });

    const createdPeriod =
      this.retirementPlanningRgpsPeriodCommandRepositoryGateway.createRetirementPlanningRgpsPeriod(
        periodEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      createdPeriod,
    ]);

    await transactions.commit();

    return ConvertRetirementPlanningRgpsSpecialPeriodResponseDto.build({
      retirementPlanningRgpsPeriodId: periodEntity.id,
    });
  }
}
