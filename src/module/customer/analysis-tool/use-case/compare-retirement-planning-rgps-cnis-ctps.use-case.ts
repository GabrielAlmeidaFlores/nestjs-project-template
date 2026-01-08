import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { CompareRetirementPlanningRgpsCnisCtpsRequestDto } from '@module/customer/analysis-tool/dto/request/compare-retirement-planning-rgps-cnis-ctps.request.dto';
import { CompareRetirementPlanningRgpsCnisCtpsResponseDto } from '@module/customer/analysis-tool/dto/response/compare-retirement-planning-rgps-cnis-ctps.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';

@Injectable()
export class CompareRetirementPlanningRgpsCnisCtpsUseCase {
  protected readonly _type = CompareRetirementPlanningRgpsCnisCtpsUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(RetirementPlanningRgpsResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsResultCommandRepositoryGateway: RetirementPlanningRgpsResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CompareRetirementPlanningRgpsCnisCtpsRequestDto,
  ): Promise<CompareRetirementPlanningRgpsCnisCtpsResponseDto> {
    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        dto.json.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const systemInstruction = `Prompt de Sistema: "Eloy - Comparador Avançado CTPS x CNIS"
        1. IDENTIDADE E FUNÇÃO
        Você é o Eloy, um especialista sênior em Direito Previdenciário Brasileiro e análise de documentos. Sua função exclusiva é realizar o cruzamento de dados entre a Carteira de Trabalho e Previdência Social (CTPS) e o Extrato CNIS, identificando inconsistências com precisão matemática e jurídica.
        2. OBJETIVO DA TAREFA
        Analisar arquivos PDF (CTPS e CNIS), extrair dados de vínculos, datas e remunerações, compará-los e gerar dois outputs:
        Um Relatório Técnico Visual (Markdown) para leitura humana.
        Um Objeto JSON Estruturado para integração de sistemas (SaaS Agiliza Previ).
        3. PROCEDIMENTO DE ANÁLISE
        Passo A: Extração de Dados
        CTPS: Identifique Empregador, Categoria (considere "Empregado" como padrão se não explícito), Data de Admissão, Data de Saída e alterações salariais anotadas.
        CNIS: Identifique Empregador (ou responsável), Data Início, Data Fim e Remunerações.
        Passo B: Lógica de Comparação e Classificação
        Para cada vínculo na CTPS, verifique o correspondente no CNIS:
        Análise de Vínculos Faltantes:
        O vínculo existe na CTPS mas não existe no CNIS? -> Classificar para Tabela 1.
        Cálculo: Estime o Tempo de Contribuição (anos/meses/dias) e a Carência (meses) que o segurado ganharia com a averbação.
        Regra: Divergência é sempre FAVORÁVEL (Sim).
        Análise de Datas (Início e Fim):
        As datas são diferentes? -> Classificar para Tabela 2.
        Compare a duração total do vínculo na CTPS vs. CNIS.
        Cálculo de Diferença: (Tempo CNIS) - (Tempo CTPS).
        Regra de Favorabilidade:
        Se CNIS > CTPS (CNIS dá mais tempo): Divergência FAVORÁVEL (Sim). Manter CNIS.
        Se CNIS < CTPS (CNIS dá menos tempo): Divergência DESFAVORÁVEL (Não). Averbar CTPS.
        Análise de Remunerações:
        Há diferença significativa entre o salário anotado na CTPS e o Salário de Contribuição no CNIS para a mesma competência? -> Classificar para Tabela 3.
        Regra:
        CNIS > CTPS: Favorável.
        CNIS < CTPS ou Inexistente: Desfavorável (Risco de RMI menor).
        4. REGRAS DE FORMATAÇÃO VISUAL (MARKDOWN)
        Gere o relatório visual em Markdown. Para cada seção (1, 2 e 3), verifique se existem dados.
        Seção 1: Vínculos Faltantes
        SE houver vínculos faltantes, gere esta tabela:
        | ORIGEM DO VÍNCULO | CATEGORIA | DATA INÍCIO | DATA FIM | TEMPO DE CONTRIBUIÇÃO | CARÊNCIA | DIVERGÊNCIA FAVORÁVEL? |
        | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
        | [Nome] | [Categoria] | [Data] | [Data] | [Tempo] | [Meses] | ✅ SIM. Não consta do CNIS. Período deve ser averbado. |
        SE NÃO houver, escreva:
        ✅ Nenhum vínculo faltante identificado. Todos os registros da CTPS constam no CNIS.
        Seção 2: Divergências de Datas
        SE houver divergências, gere esta tabela:
        | ORIGEM DO VÍNCULO | CATEGORIA | CTPS (INÍCIO) | CTPS (FIM) | CNIS (INÍCIO) | CNIS (FIM) | TEMPO DE CONTRIBUIÇÃO | CARÊNCIA | DIVERGÊNCIA FAVORÁVEL? |
        | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
        | [Nome] | [Categoria] | [Data] | [Data] | [Data] | [Data] | [Dif Tempo] | [Dif Carência] | [Indicador] |
        Para a coluna DIVERGÊNCIA FAVORÁVEL?, use:
        ✅ SIM. A data de [Início/Fim/Ambas] está divergente de modo favorável. Deve ser mantida no CNIS.
        ❌ NÃO. A divergência diminui o tempo. Data da CTPS deve ser averbada no CNIS.
        SE NÃO houver, escreva:
        ✅ Nenhuma divergência de datas identificada. As datas de admissão e saída na CTPS coincidem com as do CNIS.
        Seção 3: Divergências de Remunerações
        SE houver divergências, gere esta tabela:
        | ORIGEM DO VÍNCULO | CATEGORIA | COMPETÊNCIA (Mês/Ano) | VALOR ANOTADO (CTPS) | VALOR NO CNIS | STATUS |
        | :--- | :--- | :--- | :--- | :--- | :--- |
        | [Nome] | [Categoria] | [MM/AAAA] | R$ [Valor] | R$ [Valor] | [Status] |
        Para a coluna STATUS, use:
        ✅ DIVERGÊNCIA FAVORÁVEL. Valor no CNIS é superior.
        ⚠️ DIVERGÊNCIA DESFAVORÁVEL. Recolhimento a menor ou inexistente.
        SE NÃO houver, escreva:
        ✅ Nenhuma divergência salarial crítica identificada.
        5. REGRAS DE FORMATAÇÃO JSON (SISTEMA)
        Imediatamente após o relatório visual, crie uma seção chamada # JSON ESTRUTURADO PARA OS DEVS.
        Gere um bloco de código JSON válido contendo os mesmos dados.
        Regras do JSON:
        Datas no formato ISO 8601 (YYYY-MM-DD) sempre que possível, ou DD/MM/YYYY.
        Se não houver itens em uma categoria, retorne um array vazio [].
        is_favoravel deve ser booleano (true ou false).
        Schema do JSON:
        {
          "segurado": {
            "nome": "Nome do Segurado",
            "identificacao": "CPF ou NIT"
          },
          "analise_vinculos_faltantes": [
            {
              "origem_vinculo": "Nome Empresa",
              "categoria": "Empregado",
              "data_inicio": "DD/MM/AAAA",
              "data_fim": "DD/MM/AAAA",
              "tempo_contribuicao_estimado": "String (ex: 1 ano, 2 meses)",
              "carencia_estimada": "Int (meses)",
              "is_favoravel": true,
              "mensagem": "Não consta do CNIS. Período deve ser averbado."
            }
            // ... repita para cada item ou deixe array vazio []
          ],
          "analise_divergencia_datas": [
            {
              "origem_vinculo": "Nome Empresa",
              "categoria": "Empregado",
              "ctps_inicio": "DD/MM/AAAA",
              "ctps_fim": "DD/MM/AAAA",
              "cnis_inicio": "DD/MM/AAAA",
              "cnis_fim": "DD/MM/AAAA",
              "diferenca_tempo": "String (+ ou - tempo)",
              "diferenca_carencia": "String (+ ou - meses)",
              "is_favoravel": boolean,
              "mensagem": "Texto explicativo do status"
            }
            // ... repita para cada item ou deixe array vazio []
          ],
          "analise_divergencia_remuneracao": [
            {
              "origem_vinculo": "Nome Empresa",
              "categoria": "Empregado",
              "competencia": "MM/AAAA",
              "valor_ctps": "Decimal ou String formatada",
              "valor_cnis": "Decimal ou String formatada",
              "is_favoravel": boolean,
              "mensagem": "Texto explicativo"
            }
            // ... repita para cada item ou deixe array vazio []
          ],
          "resumo_geral": "Texto corrido das recomendações finais."
        }
        
        
        6. ESTRUTURA FINAL DO OUTPUT
        Título: # Relatório de Análise Comparativa: CTPS vs. CNIS
        Dados do Segurado
        Seção 1 (Tabela Visual ou Msg OK)
        Seção 2 (Tabela Visual ou Msg OK)
        Seção 3 (Tabela Visual ou Msg OK)
        Resumo e Recomendações (Texto)
        Título: # JSON ESTRUTURADO PARA OS DEVS
        Bloco de código JSON.
        `;

    if (retirementPlanningRgps.cnisDocument === null) {
      throw new RetirementPlanningRgpsNotFoundError();
    }

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      retirementPlanningRgps.cnisDocument,
    );
    const files: Buffer[] = [cnisDocumentBuffer];

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
          type: 'array',
          items: {
            type: 'object',
            properties: {
              tipo: {
                type: 'string',
                description:
                  'Tipo de vínculo analisado, neste caso sempre será VINCULO_FALTANTE_CNIS',
              },
              empresa: {
                type: 'string',
                description:
                  'Nome da empresa empregadora, retorne vazio se não houver.',
              },
              periodoInicio: {
                type: 'string',
                description:
                  'Data de início do vínculo, retorne vazio se não houver, formate em AAAA/MM/DD, ex: 2020/01/15.',
              },
              periodoFim: {
                type: 'string',
                description:
                  'Data de término do vínculo, retorne vazio se não houver, formate em AAAA/MM/DD, ex: 2020/01/15, e caso não tenha data de saída, informe "".',
              },
              viabilidade: {
                type: 'string',
                enum: ['BAIXA', 'MÉDIA', 'ALTA'],
                description: 'Viabilidade do reconhecimento.',
              },
              reconhecimentoINSS: {
                type: 'string',
                enum: ['PROVÁVEL', 'PARCIAL', 'IMPROVÁVEL'],
                description: 'Análise do INSS.',
              },
              impactoCarencia: {
                type: 'boolean',
                description: 'Indica se há impacto na carência.',
              },
              reconhecimentoJudicial: {
                type: 'string',
                enum: ['FAVORÁVEL', 'DESFAVORÁVEL', 'INDEFINIDO'],
                description: 'Análise judicial do vínculo.',
              },
              tempoContribuicao: {
                type: 'string',
                description: 'Tempo de contribuição reconhecido.',
              },
              observacaoTecnica: {
                type: 'string',
                description:
                  'Observações técnicas, retorne vazio se não houver.',
              },
              contribuicaoMedia: {
                type: 'string',
                description:
                  'Valor da contribuição média mensal, retorne vazio se não houver.',
              },
              status: {
                type: 'boolean',
                description:
                  'Indica se o vínculo é favorável ou não para o segurado, considerando todos os aspectos analisados.',
              },
              tipoDeTrabalho: {
                type: 'string',
                enum: ['URBANO', 'RURAL'],
                description:
                  'Tipo de trabalho realizado no vínculo, se aplicável. Por padrão retorne URBANO.',
              },
              competenciaAbaixoDoMinimo: {
                type: 'boolean',
                description:
                  'Indica se há competências com valor de contribuição abaixo do mínimo legal, considerando o ano de referência é o sálario mínimo vigente na época do Brasil.',
              },
              categoria: {
                type: 'string',
                enum: [
                  'AUTONOMO',
                  'MEI',
                  'CONTRIBUINTE_INDIVIDUAL',
                  'TRABALHADOR_AVULSO',
                  'TEMPORARIO',
                  'ESTAGIARIO',
                  'APRENDIZ',
                  'SERVIDOR_PUBLICO',
                  'TRABALHADOR_RURAL',
                  'SEGURADO_ESPECIAL',
                  'MILITAR',
                ],
                description:
                  'Categoria do vínculo, que encontra-se no CTPS que não consta no CNIS.',
              },
              carencia: {
                type: 'string',
                description:
                  'Número de meses distinto de carência que o vínculo representa, retorne 0 se não houver. Considere carência como o número de meses que o vínculo contribui para a aposentadoria. Exemplo: Se o vínculo é de 6 meses, retorne 6.',
              },
            },
            required: [
              'tipo',
              'empresa',
              'periodoInicio',
              'periodoFim',
              'viabilidade',
              'reconhecimentoINSS',
              'impactoCarencia',
              'reconhecimentoJudicial',
              'tempoContribuicao',
              'observacaoTecnica',
              'contribuicaoMedia',
              'status',
              'tipoDeTrabalho',
              'competenciaAbaixoDoMinimo',
              'categoria',
              'carencia',
            ],
          },
        },
        'application/json',
      )) ?? '';

    const updatedRetirementPlanningRgpsResult =
      new RetirementPlanningRgpsResultEntity({
        ...retirementPlanningRgps.retirementPlanningRgpsResult,
        compareCnisCtps: result,
        compareCnisCtpsRaw: result,
      });

    if (!retirementPlanningRgps.retirementPlanningRgpsResult) {
      throw new RetirementPlanningRgpsNotFoundError();
    }

    const retirementPlanningRgpsResult =
      this.retirementPlanningRgpsResultCommandRepositoryGateway.updateRetirementPlanningRgpsResult(
        retirementPlanningRgps.retirementPlanningRgpsResult.id,
        updatedRetirementPlanningRgpsResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRgpsResult,
    ]);

    await transactions.commit();

    return CompareRetirementPlanningRgpsCnisCtpsResponseDto.build({
      result,
      compareCnisCtpsRaw:
        updatedRetirementPlanningRgpsResult.compareCnisCtpsRaw ?? 'N/A',
    });
  }
}
