import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
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

  public async getCnisCompleteAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null> {
    const prompt = `
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
      GenerateResponseInputModel.build({
        prompt,
        documents,
      }),
    );
  }

  public async getCnisSimplifiedAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null> {
    const prompt = `
      FAÇA AGORA UMA MENSAGEM DIDÁTICA PARA EXPLICAR AO CLIENTE O RESULTADO DA ANÁLISE. DEVE SER EXPLICADO PRINCIPALMENTE: A) AS PENDENCIAS ENCONTRADAS NO CNIS E COMO EU COMO ADVOGADO DELA PODEREI RESOLVER; B) O TEMPO COM PENDENCIAS E SEM PENDENCIAS; C) A ANALISE DO DIREITO ÀS APOSENTADORIAS; D) A DATA MAIS PROXIMA PARA SE APOSENTAR SE AS PENDENCIAS FOREM RESOLVIDAS; E) O VALOR ESTIMADO DA APOSENTADORIA, CONSIDERANDO AS REGRAS DE CALCULO APLICAVEIS A RESPECTIVAS ESPECIE. FAÇA EM UM NOVO CANVAS.
    `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        prompt,
        documents,
      }),
    );
  }

  public async getLegalPleadingQuickDocumentAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null> {
    const prompt = `
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
      GenerateResponseInputModel.build({
        prompt,
        documents,
      }),
    );
  }

  public async getLegalPleadingCompleteAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null> {
    const prompt = `
    # CONTEXTO
    Você atuará como um Assistente Jurídico Sênior, especialista em Direito Previdenciário brasileiro. Sua missão é analisar todos os arquivos fornecidos para identificar os dados do caso e os documentos comprobatórios, a fim de gerar uma análise estratégica completa e a minuta de uma peça processual. O público-alvo é o advogado responsável pelo caso.

    # INSTRUÇÕES
    1.  **Análise de Arquivos**: Examine CUIDADOSAMENTE todos os arquivos anexados. Um deles conterá os dados estruturados do caso (informações do cliente, fatos, objetivos, etc.) e os demais serão documentos comprobatórios (CNIS, laudos, CTPS, etc.).
    2.  **Extração de Dados**: Extraia todas as informações relevantes dos arquivos para construir a análise e a peça processual.
    3.  **Estrutura da Resposta**: Siga RIGOROSAMENTE a estrutura definida abaixo, em formato Markdown.

    # ESTRUTURA OBRIGATÓRIA DA RESPOSTA
    Sua resposta deve seguir rigorosamente a estrutura abaixo, em formato Markdown. Elabore o conteúdo de cada seção de forma detalhada e completa.

    ---

    # Análise Estratégica e Minuta de Peça Processual

    ## 1. Resumo Executivo para o Advogado
    - Apresente em uma lista de tópicos (bullet points) os achados mais críticos da análise.
    - Destaque os **pontos fortes** e **pontos fracos** da tese jurídica.
    - Sugira a principal **linha de argumentação** a ser seguida.
    - Liste eventuais **documentos faltantes** que sejam cruciais para o sucesso da demanda.
    - Indique o **nome da ação** mais apropriada com base nos fatos e objetivos.

    ## 2. Análise Detalhada dos Documentos Anexados
    - Crie uma tabela analisando cada documento fornecido.
    - **Colunas necessárias:** "Tipo do Documento", "Pontos de Destaque no Documento", e "Relevância Estratégica para o Caso".

    ## 3. Minuta da Peça Processual
    - Gere um rascunho completo e bem fundamentado da peça processual, incluindo Endereçamento, Qualificação, Nome da Ação, Fatos, Direito, Pedidos, Valor da Causa e Fechamento.

    ## 4. Recomendações e Próximos Passos
    - Forneça uma lista de ações práticas para o advogado. Exemplo: "1. Coletar procuração do cliente.", "2. Protocolar a ação no sistema eletrônico competente.".

    # REGRAS DE FORMATAÇÃO E ESTILO
    - **Formato**: Exclusivamente Markdown.
    - **Linguagem**: Técnica-jurídica, formal e precisa.
    - **Objetividade**: A resposta deve começar diretamente com o título '# Análise Estratégica e Minuta de Peça Processual'.
    `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        prompt,
        documents,
      }),
    );
  }

  public async getLegalPleadingSimplifiedAnalysis(
    documents: (Buffer | string)[],
  ): Promise<string | null> {
    const prompt = `
    # INSTRUÇÃO
    GERE UM TEXTO DIDÁTICO PARA EXPLICAR AO CLIENTE FINAL O RESULTADO DA ANÁLISE DO SEU CASO. COM BASE NOS ARQUIVOS FORNECIDOS, O TEXTO DEVE EXPLICAR OBRIGATORIAMENTE OS SEGUINTES PONTOS:

    A) **O MOTIVO DO PROCESSO:** Explique de forma simples por que será iniciada uma ação judicial. Qual foi o problema com o INSS?

    B) **A ESTRATÉGIA DO ADVOGADO:** Descreva como o advogado planeja resolver o problema na Justiça. Quais são os principais argumentos e provas?

    C) **O DIREITO DO CLIENTE:** Resuma qual é o principal direito que está sendo buscado no processo (ex: direito a um benefício específico, revisão de um cálculo, etc.).

    D) **PRÓXIMOS PASSOS E TEMPO ESTIMADO:** Informe o que acontecerá a seguir e dê uma estimativa geral de quanto tempo um processo como este costuma levar.

    E) **O RESULTADO ESPERADO:** Explique o que o cliente pode ganhar caso o processo seja bem-sucedido, como o valor estimado do benefício e a possibilidade de receber valores atrasados.

    # REGRAS E ESTILO
    - **Linguagem**: Use uma linguagem extremamente simples e didática.
    - **Tom**: Seja objetivo, claro e tranquilizador.
    - **Formato**: Gere um texto corrido e bem estruturado, respondendo a cada ponto solicitado. Não inclua saudações, despedidas ou qualquer interação. Apenas o resultado da análise.
    `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        prompt,
        documents,
      }),
    );
  }
}
