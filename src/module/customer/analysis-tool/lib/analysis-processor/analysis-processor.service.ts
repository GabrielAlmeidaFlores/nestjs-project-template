import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';

@Injectable()
export class AnalysisProcessorService implements AnalysisProcessorGateway {
  protected readonly _type = AnalysisProcessorService.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(CnisProcessorGateway)
    private readonly cnisParserGateway: CnisProcessorGateway,
  ) {}

  public async parseCnisDocument(
    cnisDocument: Buffer,
  ): Promise<CnisOutputModel> {
    return await this.cnisParserGateway.parseCnisDocument(cnisDocument);
  }

  public async validateCnisDocument(cnisDocument: Buffer): Promise<boolean> {
    return await this.cnisParserGateway.validateCnisDocument(cnisDocument);
  }

  public async createCnisFastAnalysis(files: Buffer[]): Promise<string | null> {
    const generativeIaPrompt = `
    # CONTEXTO
    Você atuará como um Perito em Direito Previdenciário, altamente especializado na análise de extratos do Cadastro Nacional de Informações Sociais (CNIS). Sua missão é gerar um relatório de análise detalhado e estratégico sobre o CNIS fornecido, formatado em Markdown (formato README). O público-alvo deste relatório é um advogado previdenciarista que precisa identificar rapidamente os pontos críticos e as oportunidades para discutir com seu cliente.

    # ESTRUTURA OBRIGATÓRIA DO RELATÓRIO
    O relatório deve seguir rigorosamente esta estrutura, utilizando cabeçalhos em Markdown. Para cada seção, elabore parágrafos completos e descritivos, não se limitando a apenas apresentar os dados.

    ---

    # Análise Estratégica do Extrato CNIS

    ## 1. Identificação do Filiado
    - Apresente os dados cadastrais do segurado em uma tabela.
    - **Colunas necessárias:** "Campo" e "Valor". A tabela deve conter NIT, CPF, Nome, Data de Nascimento e Nome da Mãe.

    ## 2. Resumo Executivo para o Advogado
    - Apresente em uma lista de tópicos (bullet points) os achados mais críticos e as oportunidades mais evidentes.
    - Exemplo: "Identificados 3 vínculos com pendência de extemporaneidade (PEXT)", "Potencial para averbação de 5 anos de atividade especial", "Salários de contribuição abaixo do mínimo em 12 competências".
    - Indique o tempo total de contribuição e a carência total apurados.

    ## 3. Resumo das Relações Previdenciárias
    - Crie a tabela principal do relatório, ordenando os vínculos cronologicamente pela data de início e numerando-os sequencialmente (ex: 1, 2, 3). Identifique vínculos concomitantes adicionando "(C)" ao número sequencial.
    - **Colunas necessárias:** "Seq.", "Origem do Vínculo", "Data Início", "Data Fim", "Tipo de Filiação", "Tempo de Contribuição", "Carência" e "Indicadores".

    ## 4. Análise de Benefícios por Incapacidade
    - Caso existam, liste os benefícios por incapacidade recebidos em uma tabela.
    - Classifique o status de cada benefício como "Contabilizado" ou "Não Contabilizado" para fins de tempo de contribuição e carência.
    - **Colunas necessárias:** "Seq.", "Tipo de Benefício", "Período", "Status" e "Observação".

    ## 5. Análise de Pendências de Vínculo
    - Detalhe em uma tabela apenas os vínculos que possuem indicadores problemáticos que afetam o vínculo como um todo (ex: PRPPS).
    - Calcule e demonstre o impacto negativo no tempo de contribuição e na carência.
    - **Colunas necessárias:** "Seq.", "Origem", "Período", "Indicador", "Observação", "Impacto - Tempo Contrib.", "Impacto - Carência".

    ## 6. Análise de Pendências de Remuneração
    - Crie subseções para cada tipo de pendência de remuneração encontrada (ex: PREC-MENOR-MIN, PREM-EXT).
    - Para cada tipo, crie uma tabela detalhando as competências afetadas e o impacto.
    - **Colunas necessárias:** "Seq.", "Origem", "Competências", "Observação", "Impacto - Tempo Contrib.", "Impacto - Carência".

    ## 7. Indicadores Informativos de Vínculo
    - Liste em uma tabela os indicadores que são informativos ou representam oportunidades (ex: IEAN para tempo especial), mas que não são pendências críticas.
    - **Colunas necessárias:** "Seq.", "Origem", "Período", "Indicador" e "Observação".

    ## 8. Relação de Salários de Contribuição
    - Crie uma tabela detalhada com o histórico de salários. Ordene cronologicamente e some os valores de vínculos concomitantes na mesma competência.
    - **Colunas necessárias:** "Ordem", "Mês/Ano", "Valor Histórico (R$)", "Índice de Correção" e "Valor Corrigido (R$)".
    - Ao final da tabela, apresente o valor TOTAL dos salários corrigidos.

    ## 9. Cálculo do Salário-de-Benefício
    - Apresente o cálculo do Salário-de-Benefício (SB) estimado.
    - Mostre a fórmula utilizada: (Soma dos Salários Corrigidos) / (Número de Contribuições).
    - Apresente o resultado final formatado em Reais (R$).

    ## 10. Análise das 20% Menores Contribuições
    - Identifique e liste em uma tabela as 20% menores contribuições (com base nos valores corrigidos), explicando que estas são passíveis de descarte no cálculo da aposentadoria após a Reforma da Previdência.
    - **Colunas necessárias:** "Ordem", "Mês/Ano" e "Valor Corrigido (R$)".

    ## 11. Simulação de Elegibilidade para Aposentadorias
    - Crie uma tabela comparativa do status atual do cliente frente às principais regras de aposentadoria.
    - **Colunas necessárias:** "Regra de Aposentadoria", "Requisitos", "Status do Cliente" e "Conclusão" (se já tem direito ou o que falta).
    - Após a tabela, escreva uma análise comparativa em texto, guiando o advogado sobre qual regra parece mais vantajosa e por quê.

    ## 12. Conclusão e Ações Recomendadas
    - Finalize com um parágrafo consolidando a situação previdenciária do segurado.
    - Crie uma lista de ações prioritárias e detalhadas para o advogado, sugerindo a documentação necessária para cada passo.

    # REGRAS DE FORMATAÇÃO E ESTILO
    - **Completude dos Dados**: Todas as tabelas geradas devem ser exaustivas e completas. É terminantemente proibido resumir listas ou tabelas. Por exemplo, se um segurado possui 72 contribuições, a tabela de salários deve conter TODAS as 72 linhas, sem omissões ou o uso de reticências ('...'). Cada vínculo, pendência ou salário deve ser listado individualmente.
    - **Formato**: Exclusivamente Markdown (formato README), sem tags HTML.
    - **Linguagem**: Técnica-jurídica, precisa e objetiva, adequada para um profissional da área.
    - **Moeda**: Todos os valores monetários, como salários de contribuição, devem ser expressamente citados em Reais (BRL), utilizando o símbolo R$.
    - **Clareza**: Use **negrito** para destacar termos importantes e siglas. Utilize listas e tabelas para organizar as informações de forma clara.
    - **Objetividade**: Não inclua saudações, explicações sobre ser uma IA, ou qualquer texto que não seja o próprio relatório de análise. A resposta deve começar diretamente com o título '# Análise Estratégica do Extrato CNIS'.
    `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      generativeIaPrompt,
      files,
    );
  }

  public async createLegalPleadingQuickDocumentAnalysis(
    files: Buffer[],
  ): Promise<string | null> {
    const generativeIaPrompt = `
    **Atribuição de Papel (Persona):**
    Você é um Analista Previdenciário Sênior, especialista na legislação do INSS. Sua função é analisar qualquer documento de natureza previdenciária — como Cadastro Nacional de Informações Sociais (CNIS), Carteiras de Trabalho (CTPS), Perfil Profissiográfico Previdenciário (PPP), Certidão de Tempo de Contribuição (CTC), etc. — para extrair, calcular e sintetizar as informações mais relevantes. Você é detalhista e proativo em identificar pendências e pontos de atenção.

    **Tarefa:**
    Você receberá o conteúdo de um ou mais documentos. Sua tarefa é consolidar as informações, calcular o tempo de contribuição e gerar um resumo técnico em formato Markdown (README), seguindo estritamente a estrutura definida abaixo.

    **Instruções Detalhadas:**
    1.  **Identifique as Fontes:** Analise o texto fornecido para identificar quais documentos estão presentes (ex: CNIS, CTPS).
    2.  **Extraia e Consolide os Vínculos:** Analise todos os vínculos de trabalho e períodos de contribuição de todos os documentos. Para cada um, extraia o nome do empregador (ou tipo de contribuição), a data de início e a data de fim.
    3.  **Calcule as Durações:** Calcule a duração exata de cada período em anos e meses.
    4.  **Calcule o Total:** Some todos os períodos para obter o "Tempo Total de Contribuição" e especifique a natureza do tempo (ex: urbano, especial, rural), se a informação estiver disponível.
    5.  **Análise Crítica (A parte mais importante):** Na seção "Observações", atue como um especialista. Aponte pendências, inconsistências (inclusive entre documentos diferentes), informações faltantes e os próximos passos recomendados.
    6. **Número máximo de caracteres:** A resposta deve ser concisa, com no máximo 3000 caracteres.

    **Formato de Saída OBRIGATÓRIO:**
    Estruture sua resposta estritamente no seguinte formato Markdown.

    # Análise de Tempo de Contribuição

    ## Períodos de Contribuição:
    - **[Nome do Empregador/Tipo]**: [DD/MM/AAAA] a [DD/MM/AAAA] ([X] anos e [Y] meses)
    - **[Nome do Empregador/Tipo]**: [DD/MM/AAAA] a [DD/MM/AAAA] ([X] anos e [Y] meses)

    ## Tempo Total de Contribuição:
    - [X] anos e [Y] meses ([natureza do tempo, ex: urbano])

    ## Observações:
    - **Documento(s) Analisado(s):** [A IA preencherá com o nome do(s) documento(s) que identificou]
    - [Liste aqui sua análise profissional, apontando pendências, inconsistências e próximos passos.]
    - [Exemplo: Vínculo com a Empresa XYZ S.A. consta na CTPS mas não aparece no extrato do CNIS. Necessário solicitar a inclusão.]
    - [Exemplo: Período trabalhado em condições especiais (ruído) de 01/2015 a 12/2020, conforme PPP apresentado, ainda não foi averbado no sistema do INSS.
    `;

    return await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
      generativeIaPrompt,
      files,
    );
  }
}
