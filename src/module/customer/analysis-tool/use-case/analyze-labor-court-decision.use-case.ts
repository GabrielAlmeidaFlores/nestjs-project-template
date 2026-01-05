import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-analysis-result/command/retirement-planning-rgps-analysis-result.repository.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-type';
import { AnalyzeRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/dto/request/analyze-retirement-planning-rgps-cnis.request.dto';
import { AnalyzeRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/dto/response/analyze-retirement-planning-rgps-cnis.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';

@Injectable()
export class AnalyzeLaborCourtDecisionUseCase {
  protected readonly _type = AnalyzeLaborCourtDecisionUseCase.name;
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
      Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário e Análise Processual. Seu foco é a análise de SENTENÇAS TRABALHISTAS para fins de averbação do tempo de serviço no INSS.
      Sua missão é auditar cópias de processos trabalhistas (Sentenças, Acordos, Certidões de Objeto e Pé, Início de Prova Material), confrontando-os rigorosamente com a IN 128/2022 e o Tema 1188 do STJ, para determinar se o reconhecimento do vínculo na esfera trabalhista produz efeitos na esfera previdenciária.
      FASE 1: CLASSIFICAÇÃO DA NATUREZA DA DECISÃO (O "Filtro" do ELOY)
      Ao receber os documentos, identifique imediatamente a natureza da decisão judicial:
      Sentença Homologatória de Acordo (Pura): As partes apenas fizeram um acordo e o juiz homologou sem instrução probatória.
      Sentença de Mérito (Instruída): Houve litígio, produção de provas (documental/testemunhal) e decisão fundamentada do juiz reconhecendo o vínculo.
      Ação de Reintegração: Determina o retorno do empregado ao trabalho (Art. 173 da IN 128).
      Complementação de Remuneração: O vínculo já existia, a ação foi apenas para verbas salariais (Art. 172, IV da IN 128).
      FASE 2: REGRAS DE NEGÓCIO E FUNDAMENTAÇÃO (A Lógica Jurídica)
      Aplique estritamente as regras abaixo para definir a VIABILIDADE:
      REGRA 1: O "Início de Prova Material" (Tema 1188 STJ e Art. 172 IN 128)
      A Regra de Ouro: A sentença trabalhista, por si só, NÃO produz efeitos previdenciários (Art. 172, caput).
      Acordos Homologatórios: Se for um acordo, a viabilidade é BAIXA, EXCETO se houver no processo trabalhista "elementos probatórios contemporâneos aos fatos alegados" (Tema 1188 STJ).
      Prova Testemunhal Exclusiva: Não é admitida para validar o tempo (Art. 172, §3º implícito c/c Súmula 149 STJ). É necessário documento contemporâneo.
      REGRA 2: Efeitos dos Recolhimentos (Art. 172, § 3º)
      O simples recolhimento de guia GPS (código 1708/2909) decorrente do acordo trabalhista NÃO garante a contagem do tempo se não houver prova material da existência do vínculo. O INSS não está vinculado a acordos feitos sem sua participação se não houver prova do fato gerador (o trabalho).
      REGRA 3: Exceções de Viabilidade Alta (Art. 172, IV e Art. 173)
      Reintegração: Se a sentença determinou reintegração, NÃO se exige início de prova material adicional, desde que comprovado o vínculo anterior (Art. 173, II).
      Complementação Salarial: Se a ação foi apenas para aumentar salário de um vínculo já anotado/existente, NÃO se exige prova material do vínculo (Art. 172, IV).
      FASE 3: REGRAS DE CÁLCULO (Tempo e Carência)
      Tempo de Contribuição:
      Contabilize apenas o período expressamente reconhecido na sentença E que esteja amparado por início de prova material (se acordo) ou instrução probatória (se mérito).
      Carência:
      Categoria Empregado: Se o vínculo for validado (Viabilidade Média/Alta), o tempo conta para carência, pois a responsabilidade tributária é do empregador.
      Recolhimentos da Reclamatória: Os valores recolhidos na reclamatória contam para o cálculo da RMI (Renda Mensal), mas a contagem dos meses para carência depende da validação da existência do vínculo (Início de Prova Material).
      FASE 4: LAYOUT DE OUTPUT (Obrigatório)
      Gere a resposta contendo EXATAMENTE estes blocos. Não use introduções genéricas.
      BLOCO 1: DETALHES DA ANÁLISE
      PERIODO DE TRABALHO RECONHECIDO EM SENTENÇA TRABALHISTA: [Data Início] a [Data Fim]
      CATEGORIA DO TRABALHADOR: Empregado
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Alta: Sentença de Mérito com instrução ou Acordo acompanhado de provas documentais contemporâneas (holerites da época, cartões de ponto, livro de registro).
      Média: Acordo com provas indiciárias fracas ou apenas testemunhal forte.
      Baixa: Acordo homologatório simples, sem qualquer documento da época dos fatos (apenas declaração das partes).
      TEMPO QUE PODE SER CONTABILIZADO COMO TEMPO DE CONTRIBUIÇÃO: [X Anos, Y Meses e Z Dias]
      TEMPO QUE PODE SER CONTABLIZADO COMO CARÊNCIA: [X] meses
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
      Apresente estritamente esta tabela com as conclusões e a Fundamentação Legal Obrigatória (IN 128/2022 ou Tema 1188 STJ):
      TIPO DE DOCUMENTO
      DATA DE EMISSÃO
      EM NOME DE
      CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
      [Ex: Sentença Homologatória / Ata de Audiência]
      [Data]
      [Nome]
      [Ex 1 (Viabilidade Baixa): Sentença meramente homologatória de acordo, desacompanhada de início de prova material contemporâneo. Não produz efeito previdenciário conforme Tema 1188 do STJ e Art. 172, I e II da IN 128/2022. / Ex 2 (Viabilidade Alta): Sentença homologatória acompanhada de cópia do Livro de Registro e Holerites da época juntados no processo trabalhista. Válido como prova material conforme Tema 1188 do STJ.]
    
      INSTRUÇÕES DE TOM E COMPORTAMENTO
      Rigor com o Tema 1188: Se o usuário apresentar apenas a "Sentença de Homologação de Acordo" sem mencionar provas anexas, você DEVE classificar como Viabilidade Baixa e alertar que "A sentença trabalhista homologatória de acordo, por si só, não constitui início de prova material".
      Imparcialidade: Você analisa a prova, não o mérito da justiça social. Se não houver prova material, a regra é a não averbação.
    
      `;

    const files: Buffer[] = [];

    dto.files.forEach((fileBuffer) => {
      files.push(fileBuffer.buffer);
    });

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFilesWithContract(
        GenerateResponseInputModel.build({
          systemInstruction,
          promptFiles: files,
        }),
        {
          type: 'object',
          properties: {
            tipo: {
              type: 'string',
              enum: [
                'Tempo rural',
                'Serviço Militar',
                'Serviço Público',
                'CTPS fora do CNIS',
                'Aluno-Aprendiz',
                'Trabalho no Exterior',
                'Trabalho Informal',
                'Sentença Trabalhista',
              ],
              description: 'Tipo do período analisado.',
            },
            nome: {
              type: 'string',
              description: 'Nome do segurado, retorne vazio se não houver.',
            },
            empresa: {
              type: 'string',
              description:
                'Nome da empresa ou instituição, retorne vazio se não houver.',
            },
            periodoInicio: {
              type: 'string',
              description:
                'Data de início do período, formato YYYY-MM-DD. Retorne vazio se não houver.',
            },
            periodoFim: {
              type: 'string',
              description:
                'Data de fim do período, formato YYYY-MM-DD. Retorne vazio se não houver.',
            },
            viabilidade: {
              type: 'string',
              enum: ['Alta', 'Média', 'Baixa'],
              description: 'Viabilidade do reconhecimento.',
            },
            reconhecimentoINSS: {
              type: 'string',
              enum: ['Provável', 'Parcial', 'Improvável'],
              description:
                'Análise do INSS, se é provável, parcial ou improvável.',
            },
            impactoCarencia: {
              type: 'boolean',
              description:
                'Indica se há impacto na carência. Será true ou false.',
            },
            reconhecimentoJudicial: {
              type: 'string',
              enum: ['Favorável', 'Desfavorável', 'Sim', 'Não'],
              description: 'Análise judicial do vínculo.',
            },
            tempoContribuicao: {
              type: 'string',
              description:
                'Tempo de contribuição reconhecido. Ex. 2 anos e 3 meses e 20 dias.',
            },
            observacaoTecnica: {
              type: 'string',
              description:
                'Observações técnicas sobre a análise realizada com todos os detalhes.',
            },
          },
          required: [
            'tipo',
            'nome',
            'empresa',
            'periodoInicio',
            'periodoFim',
            'viabilidade',
            'reconhecimentoINSS',
            'impactoCarencia',
            'reconhecimentoJudicial',
            'tempoContribuicao',
            'observacaoTecnica',
          ],
        },
      )) ?? '';

    const retirementPlanningRgpsAnalysisResultEntity =
      new RetirementPlanningRgpsAnalysisResultEntity({
        analysisType: AnalysisTypeEnum.LABOR_JUDGMENT,
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
