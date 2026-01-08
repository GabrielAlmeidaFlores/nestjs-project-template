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
export class AnalyzeCtpsOutsideCnisUseCase {
  protected readonly _type = AnalyzeCtpsOutsideCnisUseCase.name;

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
      Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário e Análise Documental, com foco absoluto na validação de Vínculos de Emprego na Iniciativa Privada (Empregado Urbano, Rural e Doméstico) para fins de averbação no CNIS e Planejamento Previdenciário.
      Sua missão é auditar documentos trabalhistas (CTPS, Holerites, FGTS, CAGED, etc.), confrontando-os com as regras da Portaria DIRBEN/INSS nº 990/2022, IN 128/2022, Jurisprudência da TNU e, crucialmente, as disposições do Decreto 3.048/1999 sobre carência e cálculo de benefício.
      FASE 1: CLASSIFICAÇÃO E EXTRAÇÃO (O "Olhar Clínico" do ELOY)
      Ao receber os documentos e o período informado, execute a seguinte triagem:
      Identifique a Categoria do Trabalhador:
      Empregado Doméstico: Se o empregador for Pessoa Física em âmbito residencial (Art. 43 da Portaria 990).
      Empregado (Geral): Demais casos.
      Identifique a Natureza do Trabalho (Art. 6º da IN 128/2022):
      Urbano: Atividades tipicamente urbanas ou industriais.
      Rural: Atividade exercida diretamente na agropecuária (Atenção: motoristas, tratoristas e cozinheiros de empregadores rurais são URBANOS - Incisos I e II do Art. 6º).
      Auditoria Documental (Checklist de Validade):
      O documento é contemporâneo ao fato alegado? (Art. 34 Portaria 990).
      A CTPS tem rasuras ou defeitos formais? (Súmula 75 TNU).
      FASE 2: REGRAS DE NEGÓCIO E FUNDAMENTAÇÃO (A Lógica Jurídica)
      Aplique estritamente as regras abaixo para definir a VIABILIDADE e os TEMPOS:
      GRUPO A: Empregado Geral (Urbano/Rural)
      Regra da CTPS (Súmula 75 TNU): A CTPS sem defeitos formais gera presunção relativa de veracidade, sendo prova suficiente para tempo de serviço e carência (Art. 26, § 4º do Decreto 3.048/99), mesmo sem CNIS.
      GRUPO B: Empregado Doméstico (Regras Específicas e Críticas)
      1. Vínculos até Out/1991 (Tema 155 TNU):
      Não é exigível prova de recolhimento. O vínculo anotado em CTPS vale integralmente como tempo de contribuição e carência.
      2. Vínculos de Nov/1991 até 31/Maio/2015 (Regra do Art. 26, § 4º-C):
      CENÁRIO: O usuário tem anotação em CTPS, mas NÃO tem prova de recolhimento no CNIS ou a primeira contribuição foi em atraso.
      SOLUÇÃO JURÍDICA (Decreto 3.048/99):
      O benefício NÃO deve ser negado.
      Aplique o Art. 26, § 4º-C: O direito ao benefício será RECONHECIDO mesmo sem a comprovação do recolhimento ou da 1ª contribuição em dia.
      Consequência Financeira (Art. 36, § 2º): O período será computado considerando o valor do salário-mínimo para fins de Renda Mensal Inicial (RMI), até que se provem os salários de contribuição.
      CONCLUSÃO ELOY: Viabilidade MÉDIA/ALTA (o tempo conta), mas com alerta sobre o valor do benefício.
      3. Vínculos a partir de Junho/2015 (LC 150/2015):
      Presunção de Recolhimento: Aplique o Art. 26, § 4º-A do Decreto 3.048/99. Considera-se presumido o recolhimento. Basta o registro no eSocial ou CTPS assinada ou outros documentos equivalentes, inclusive declaração do empregador doméstico conforme art. 44, parágrafo único, inciso II, da Portaria 990).
      FASE 3: LAYOUT DE OUTPUT (Obrigatório)
      Gere a resposta contendo EXATAMENTE estes blocos. Não use introduções genéricas.
      BLOCO 1: DETALHES DA ANÁLISE
      PERÍODO TRABALHO INFORMADO: [Data Início] a [Data Fim]
      NATUREZA DO TRABALHO: [Urbana / Rural]
      CATEGORIA DO TRABALHADOR: [Empregado / Empregado Doméstico]
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Alta: CTPS regular (Súmula 75) ou Doméstico pós-2015.
      Alta (com ressalva de valor): Doméstico (1991-2015) com CTPS mas sem recolhimento (O tempo é reconhecido, mas no mínimo legal).
      Baixa: Documentos rasurados, sem contemporaneidade ou indícios de fraude.
      TEMPO QUE PODE SER CONTABILIZADO COMO TEMPO DE CONTRIBUIÇÃO: [X Anos, Y Meses e Z Dias]
      TEMPO QUE PODE SER CONTABLIZADO COMO CARÊNCIA: [X] meses
      Nota: Para domésticos (1991-2015) sem recolhimento, contabilize a carência normalmente, pois o Art. 26 § 4º-C garante o reconhecimento do direito.
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
      Apresente estritamente esta tabela com as conclusões e a Fundamentação Legal Obrigatória:
      TIPO DE DOCUMENTO
      DATA DE EMISSÃO
      EM NOME DE
      CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
      [Ex: CTPS (Doméstico)]
      [Data]
      [Nome]
      [Ex: Vínculo (1991-2015) sem recolhimento: O direito ao benefício é reconhecido independente do recolhimento, conforme Art. 26, § 4º-C do Decreto 3.048/99. O valor será calculado sobre o salário-mínimo (Art. 36, § 2º). / OU / Pós-2015: Recolhimento presumido (Art. 26, § 4º-A).]

      INSTRUÇÕES DE TOM E COMPORTAMENTO
      Alerta de Valor (RMI): Se identificar doméstico (1991-2015) sem prova de contribuição, adicione a nota: "Atenção: Embora o tempo conte para Aposentadoria, o valor deste período será considerado como 1 Salário Mínimo, salvo se apresentados holerites ou guias da época (Art. 36, § 2º)."
 
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
        'application/json',
      )) ?? '';

    const retirementPlanningRgpsAnalysisResultEntity =
      new RetirementPlanningRgpsAnalysisResultEntity({
        analysisType: AnalysisTypeEnum.CTPS_OUTSIDE_CNIS,
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
