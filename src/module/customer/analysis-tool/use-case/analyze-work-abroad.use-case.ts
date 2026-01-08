import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/command/retirement-planning-rgps-analysis-result.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-type';
import { AnalyzeRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/dto/request/analyze-retirement-planning-rgps-cnis.request.dto';
import { AnalyzeRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/dto/response/analyze-retirement-planning-rgps-cnis.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';

@Injectable()
export class AnalyzeWorkAbroadUseCase {
  protected readonly _type = AnalyzeWorkAbroadUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsAnalysisResultCommandRepositoryGateway: RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway,
  ) {}

  public async execute(
    dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        dto.json.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const retirementPlanningRgpsEntity = new RetirementPlanningRgpsEntity({
      ...retirementPlanningRgps,
    });

    const systemInstruction = `
      IDENTIDADE E PROPÓSITO
      Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário Internacional. Seu foco é a análise de documentos de TRABALHO NO EXTERIOR para fins de averbação no Brasil mediante Acordos Internacionais de Previdência Social.
      Sua missão é aplicar a Regra da Totalização (Arts. 403 a 405 da IN 128/2022) para validar períodos estrangeiros, utilizando como parâmetro de raciocínio os parâmetros abaixo e as normas respectivas dos acordos com cada país.
      FASE 1: TRIAGEM E CONTEXTUALIZAÇÃO (O "Radar" do ELOY)
      Ao receber os documentos e o período, identifique imediatamente:
      País de Prestação do Serviço: Verifique se o Brasil possui Acordo Bilateral ou Multilateral (Ibero-americano/Mercosul) com este país.
      Natureza do Documento:
      Formulário de Ligação (Ideal): Documento oficial da agência previdenciária estrangeira (ex: SSA americano) certificando o tempo.
      Provas Materiais: Contratos de trabalho, holerites (paystubs), tax returns (W-2), registros consulares.
      FASE 2: REGRAS DE NEGÓCIO E FUNDAMENTAÇÃO (A Lógica da Totalização)
      Aplique estritamente as regras da IN 128/2022 e a lógica do Parecer Referência:
      1. Regra da Totalização (Art. 403 e 404 da IN 128/2022)
      Conceito: O tempo cumprido no país acordante deve ser somado ao tempo brasileiro para aquisição de direitos (elegibilidade).
      Impacto Financeiro (Proporcionalidade): Alerte que, ao usar a totalização, o benefício brasileiro será pago de forma proporcional (pró-rata) ao tempo contribuído no Brasil, podendo resultar em valor inferior ao salário mínimo (Art. 404, §1º), exceto se o acordo estipular o contrário.
      2. Validação para Carência e Qualidade de Segurado (Art. 405 da IN 128/2022)
      Se o documento estrangeiro for validado, o período conta integralmente para:
      Tempo de Contribuição.
      Carência (Fundamento: Art. 405 da IN 128).
      Manutenção da Qualidade de Segurado.
      FASE 3: LAYOUT DE OUTPUT (Obrigatório)
      Gere a resposta contendo EXATAMENTE estes blocos. Não use introduções genéricas.
      BLOCO 1: DETALHES DA ANÁLISE
      PERÍODO TRABALHO PRESTADO NO EXTERIOR: [Data Início] a [Data Fim]
      CATEGORIA DO TRABALHADOR: Empregado
      (Nota Interna: Fixado como "Empregado" conforme instrução do sistema).
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Alta: Formulário oficial do órgão estrangeiro ou prova robusta de vínculo e imposto (Tax Return/Contrato).
      Média: Holerites isolados ou tradução simples sem consularização/apostilamento (quando exigido).
      Baixa: Declaração simples de empresa sem carimbo oficial ou documentos ilegíveis.
      TEMPO QUE PODE SER CONTABILIZADO COMO TEMPO DE CONTRIBUIÇÃO: [X Anos, Y Meses e Z Dias]
      (Adicione a nota: "Mediante aplicação da Regra da Totalização prevista no Art. 403 da IN 128/2022 e no Acordo Internacional pertinente").
      TEMPO QUE PODE SER CONTABILIZADO COMO CARÊNCIA: [X] meses
      (Adicione a nota: "O tempo de seguro estrangeiro é validado para fins de carência conforme o Art. 405 da IN 128/2022").
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
      Apresente estritamente esta tabela com as conclusões e a Fundamentação Legal Obrigatória:
      TIPO DE DOCUMENTO
      DATA DE EMISSÃO
      EM NOME DE
      CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
      [Ex: Form. SSA / Contrato]
      [Data]
      [Nome]
      [Ex 1: Documento comprova vínculo e seguro social no país acordante. Permite a totalização para elegibilidade e carência conforme Art. 404 e 405 da IN 128/2022. / Ex 2: Vínculo comprovado. Aplica-se a regra da totalização (Art. 403 da IN 128), alertando-se para o cálculo proporcional do benefício (Art. 404, §1º).]

      INSTRUÇÕES DE TOM E COMPORTAMENTO
      Atenção à Proporcionalidade: Sempre que validar um tempo estrangeiro, mencione na tabela ou na nota do tempo que o benefício resultante será proporcional (pró-rata).
      Não invente acordos: Se o documento for de um país sem acordo com o Brasil (ex: alguns países da Ásia/Oceania), informe na Viabilidade que "Não há Acordo Internacional vigente que permita a totalização", resultando em Viabilidade NULA para fins de INSS (embora o tempo exista).
    `;

    const files: Buffer[] = [];

    dto.files.forEach((fileBuffer) => {
      files.push(fileBuffer.buffer);
    });

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction,
          promptFiles: files,
        }),
        // {
        //   type: 'object',
        //   properties: {
        //     tipo: {
        //       type: 'string',
        //       enum: [
        //         'Tempo rural',
        //         'Serviço Militar',
        //         'Serviço Público',
        //         'CTPS fora do CNIS',
        //         'Aluno-Aprendiz',
        //         'Trabalho no Exterior',
        //         'Trabalho Informal',
        //         'Sentença Trabalhista',
        //       ],
        //       description: 'Tipo do período analisado.',
        //     },
        //     nome: {
        //       type: 'string',
        //       description: 'Nome do segurado, retorne vazio se não houver.',
        //     },
        //     empresa: {
        //       type: 'string',
        //       description:
        //         'Nome da empresa ou instituição, retorne vazio se não houver.',
        //     },
        //     periodoInicio: {
        //       type: 'string',
        //       description:
        //         'Data de início do período, formato YYYY-MM-DD. Retorne vazio se não houver.',
        //     },
        //     periodoFim: {
        //       type: 'string',
        //       description:
        //         'Data de fim do período, formato YYYY-MM-DD. Retorne vazio se não houver.',
        //     },
        //     viabilidade: {
        //       type: 'string',
        //       enum: ['Alta', 'Média', 'Baixa'],
        //       description: 'Viabilidade do reconhecimento.',
        //     },
        //     reconhecimentoINSS: {
        //       type: 'string',
        //       enum: ['Provável', 'Parcial', 'Improvável'],
        //       description:
        //         'Análise do INSS, se é provável, parcial ou improvável.',
        //     },
        //     impactoCarencia: {
        //       type: 'boolean',
        //       description:
        //         'Indica se há impacto na carência. Será true ou false.',
        //     },
        //     reconhecimentoJudicial: {
        //       type: 'string',
        //       enum: ['Favorável', 'Desfavorável', 'Sim', 'Não'],
        //       description: 'Análise judicial do vínculo.',
        //     },
        //     tempoContribuicao: {
        //       type: 'string',
        //       description:
        //         'Tempo de contribuição reconhecido. Ex. 2 anos e 3 meses e 20 dias.',
        //     },
        //     observacaoTecnica: {
        //       type: 'string',
        //       description:
        //         'Observações técnicas sobre a análise realizada com todos os detalhes.',
        //     },
        //   },
        //   required: [
        //     'tipo',
        //     'nome',
        //     'empresa',
        //     'periodoInicio',
        //     'periodoFim',
        //     'viabilidade',
        //     'reconhecimentoINSS',
        //     'impactoCarencia',
        //     'reconhecimentoJudicial',
        //     'tempoContribuicao',
        //     'observacaoTecnica',
        //   ],
        // },
      )) ?? '';

    const retirementPlanningRgpsAnalysisResultEntity =
      new RetirementPlanningRgpsAnalysisResultEntity({
        analysisType: AnalysisTypeEnum.WORK_ABROAD,
        response: result,
        retirementPlanningRgps: retirementPlanningRgpsEntity,
      });

    const retirementPlanningRgpsAnalysisResult =
      this.retirementPlanningRgpsAnalysisResultCommandRepositoryGateway.createRetirementPlanningRgpsAnalysisResult(
        retirementPlanningRgpsAnalysisResultEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRgpsAnalysisResult,
    ]);

    await transactions.commit();

    return AnalyzeRetirementPlanningRgpsCnisResponseDto.build({
      retirementPlanningRgpsAnalysisResultId:
        retirementPlanningRgpsAnalysisResultEntity.id,
      result,
    });
  }
}
