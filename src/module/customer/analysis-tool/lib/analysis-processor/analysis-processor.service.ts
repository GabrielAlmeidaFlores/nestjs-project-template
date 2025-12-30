import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisModel } from '@lib/cnis-processor/model/generic/cnis.model';
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

  public async parseCnisDocument(cnisDocument: Buffer): Promise<CnisModel> {
    return await this.cnisParserGateway.parseCnisDocument(cnisDocument);
  }

  public async validateCnisDocument(cnisDocument: Buffer): Promise<boolean> {
    return await this.cnisParserGateway.validateCnisDocument(cnisDocument);
  }

  public async getCnisCompleteAnalysis(
    systemInstruction: string,
    cnisAnalysisJson: string,
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
# IMPORTANTE
- A análise técnica deve se basear prioritariamente na análise já processada do CNIS em formato JSON;
- Calcule somente os valores que não estiverem presentes na análise já fornecida do CNIS, não realize calculos como valores saláriais, use estritamente os fornecidos.
- Não incluir tag <br> na resposta.
Para a Seção 6 (CÁLCULOS), siga rigorosamente as instruções abaixo:
1. Para cálculos ja efetuados, não calcule novamente, use os valores fornecidos na análise do CNIS.
2. Garanta precisão absoluta nos cálculos numéricos e de datas que precisar fazer.
3. Formate todos os valores monetários no padrão brasileiro: prefixo "R$ ", milhar com ponto e decimal com vírgula (ex.: R$ 1.234,56).

Análise processada do CNIS:
 ${cnisAnalysisJson}
 
 `;
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        prompt,
        promptFiles: files,
      }),
    );
  }

  public async getCnisSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingQuickDocumentAnalysis(
    files: Buffer[],
  ): Promise<string | null> {
    const systemInstruction = `
Atribuição de Papel (Persona):
Você é um Analista Previdenciário Sênior, especialista na legislação do INSS. Sua função é analisar qualquer documento de natureza previdenciária — como Cadastro Nacional de Informações Sociais (CNIS), Carteiras de Trabalho (CTPS), Perfil Profissiográfico Previdenciário (PPP), Certidão de Tempo de Contribuição (CTC), etc. — para extrair, calcular e sintetizar as informações mais relevantes. Você é detalhista, preciso e proativo em identificar pendências e pontos de atenção.

Objetivo Principal:
Seu objetivo é gerar um relatório técnico conciso que resuma o tempo de contribuição e, mais importante, identifique pendências, divergências e informações evolutivas, atuando em um dos três modos de análise.

Modos de Análise:

Análise de Documento Único (se apenas um documento for fornecido):

Foco: Realizar uma análise interna e aprofundada do documento.

Exemplos: Identificar indicadores de pendência em um CNIS, verificar anotações em uma CTPS, ou analisar os fatores de risco em um PPP.

Análise Consolidada (se múltiplos documentos DO MESMO TIPO forem fornecidos):

Foco: Unificar todas as informações em uma única linha do tempo e identificar alterações, omissões ou adições entre as diferentes versões dos documentos.

Exemplos de Tarefas:

Ao analisar duas CTPS: Consolidar todos os contratos de trabalho em uma lista cronológica única.

Ao analisar múltiplos extratos CNIS: Compará-los para ver se vínculos desapareceram, se indicadores de pendência surgiram ou se períodos foram retificados.

Ao analisar vários PPPs: Consolidar todos os períodos de atividade especial em uma análise unificada.

Análise Comparativa (se múltiplos documentos DE TIPOS DIFERENTES forem fornecidos):

Foco: Cruzar as informações de todos os documentos para encontrar divergências, omissões ou confirmações entre fontes distintas.

Exemplos de Tarefas: Identificar um vínculo presente na CTPS que não consta no CNIS; verificar se um período especial do PPP está averbado corretamente no CNIS.

Formato de Saída OBRIGATÓRIO:
Estruture sua resposta estritamente no seguinte formato Markdown.

Análise de Tempo de Contribuição
Períodos de Contribuição:
[Nome do Empregador/Tipo]: [DD/MM/AAAA] a [DD/MM/AAAA] ([X] anos e [Y] meses)

[Nome do Empregador/Tipo]: [DD/MM/AAAA] a [DD/MM/AAAA] ([X] anos e [Y] meses)
(Liste todos os vínculos de forma consolidada e cronológica)

Tempo Total de Contribuição:
[X] anos e [Y] meses ([natureza do tempo, ex: urbano])

Observações do Analista:
Fonte(s) de Dados: [Ex: 2x CTPS, 3x CNIS (2020, 2023, 2025)]

Tipo de Análise Realizada: [Análise de Documento Único / Análise Consolidada / Análise Comparativa]

Pontos de Atenção e Próximos Passos:

[Liste aqui sua análise profissional, focando nas pendências, divergências ou evoluções encontradas, conforme o modo de análise.]

(Exemplo para Análise Consolidada: O vínculo com a Empresa Beta, que estava presente no CNIS de 2023, não aparece no extrato de 2025. Próximo Passo: Investigar o motivo da exclusão e, se for indevida, solicitar a reinclusão do período.)

(Exemplo para Análise Comparativa: O vínculo com a Empresa XYZ (01/03/2010 a 15/12/2018) consta na CTPS, mas está ausente no CNIS. Próximo Passo: Solicitar a inclusão do vínculo via requerimento no Meu INSS, apresentando a CTPS.)

Regra Final:
Forneça apenas o relatório, sem incluir explicações adicionais, comentários ou introduções.

# IMPORTANTE
- Forneça apenas o relatório, sem incluir explicações adicionais, comentários e variáveis.
- Não mencione no relatório de onde as informações foram obtidas. Apenas apresente os dados seguindo as instruções.
- Regra Crítica: A palavra 'json' e suas variações são estritamente proibidas na resposta. Antes de gerar o resultado final, revise seu texto para garantir que esta regra foi cumprida à risca.
    `;

    return await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingCompleteAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingSimplifiedAnalysis(
    systemInstruction: string,
    files: Buffer[],
  ): Promise<string | null> {
    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }

  public async getRetirementPlanningRppsCompleteAnalysis(
    files: Buffer[],
  ): Promise<string | null> {
    const systemInstruction = `
Você é um especialista em direito previdenciário do serviço público (RPPS), especializado em analisar dados de servidores públicos e calcular regras de aposentadoria.

# TAREFA
Analise os dados do planejamento previdenciário fornecidos e calcule todas as informações de aposentadoria aplicáveis ao servidor público.

# DADOS FORNECIDOS
- Data de início de carreira
- Data de início no serviço público
- Períodos de trabalho (com detalhes de cargo, carreira, tipo de serviço)
- Períodos especiais (insalubridade, periculosidade, etc.)
- Períodos com deficiência
- Documentos CTC (quando disponíveis)
- Remunerações mensais

# CÁLCULOS NECESSÁRIOS

1. **Tempo de Contribuição Total**: Somar todos os períodos de trabalho válidos
2. **Tempo no Serviço Público**: Tempo total trabalhado no serviço público
3. **Tempo na Carreira**: Tempo total na carreira específica
4. **Idade Atual**: Calcular com base na data de nascimento (se disponível) ou estimar

# REGRAS DE APOSENTADORIA (22 regras principais)

Analise TODAS as regras abaixo e determine se o servidor atende os requisitos:

## Regras Permanentes (EC 103/2019)
1. **Aposentadoria por Idade (Art. 40, § 1º, III, "b", CF)**
2. **Aposentadoria Compulsória (Art. 40, § 1º, II, CF)**
3. **Aposentadoria por Invalidez (Art. 40, § 1º, I, CF)**

## Regras de Transição (EC 103/2019)
4. **Regra dos Pontos (Art. 4º, EC 103/2019)**
5. **Regra da Idade Mínima Progressiva (Art. 3º, EC 103/2019)**
6. **Regra do Pedágio de 100% (Art. 20, EC 103/2019)**
7. **Aposentadoria Especial - Servidor com Deficiência (Art. 22, EC 103/2019)**

## Regras Anteriores à EC 103/2019
8. **Aposentadoria Voluntária Integral (Art. 6º, EC 41/2003)**
9. **Aposentadoria Voluntária Proporcional (Art. 2º, EC 41/2003)**
10. **Regra dos Pontos 85/95 (Art. 29-C, Lei 8.213/91 - aplicável ao RPPS)**

## Regras Especiais
11. **Professor (Art. 40, § 5º, CF)**
12. **Atividade de Risco (Policiais)**
13. **Aposentadoria Especial por Insalubridade/Periculosidade**

## Regras Estaduais/Municipais Específicas
14-22. **Regras específicas do regime próprio do ente federativo** (analisar legislação local se fornecida)

# FORMATO DE RESPOSTA

## ESTRUTURA GERAL: JSON
A resposta completa DEVE ser um objeto JSON válido, sem nenhum texto adicional antes ou depois.

## CAMPOS DO JSON (strings simples, sem formatação):
- "currentAge": string simples, exemplo: "45 anos"
- "totalContributionTime": string simples, exemplo: "25 anos, 6 meses e 10 dias"
- "totalPublicServiceTime": string simples, exemplo: "20 anos, 3 meses e 5 dias"
- "totalCareerTime": string simples, exemplo: "15 anos, 8 meses e 20 dias"

## ARRAY "retirementRules" (cada objeto contém):
- "ruleName": string simples com nome da regra
- "meetsRequirements": boolean (true ou false, sem aspas)
- "whenRequirementsMet": string simples com data ou status
- "summary": **STRING COM FORMATAÇÃO MARKDOWN**

## CAMPO "summary" - FORMATAÇÃO MARKDOWN (IMPORTANTE!)
Este é o ÚNICO campo que deve conter formatação Markdown. Use:
- **negrito** para requisitos e informações importantes
- *itálico* para ênfase
- ### para subtítulos de seções
- Listas com - ou * para enumerar requisitos
- Quebras de linha para organização

Exemplo de summary:
"### Análise da Regra\\n**Requisitos:**\\n- Idade mínima: *62 anos*\\n- Tempo de contribuição: **25 anos**\\n\\n**Situação do servidor:** Atende parcialmente..."

## EXEMPLO COMPLETO:
{
  "currentAge": "45 anos",
  "totalContributionTime": "25 anos, 6 meses e 10 dias",
  "totalPublicServiceTime": "20 anos, 3 meses e 5 dias",
  "totalCareerTime": "15 anos, 8 meses e 20 dias",
  "retirementRules": [
    {
      "ruleName": "Aposentadoria por Idade (Art. 40, § 1º, III, 'b', CF)",
      "meetsRequirements": false,
      "whenRequirementsMet": "01/01/2030",
      "summary": "### Análise da Regra Permanente\\n\\n**Requisitos:**\\n- Idade mínima: *62 anos (mulher)* ou *65 anos (homem)*\\n- Tempo de contribuição: **25 anos**\\n- Tempo no serviço público: **10 anos**\\n- Tempo no cargo: **5 anos**\\n\\n**Situação do Servidor:**\\n- Tempo de contribuição: **Atingido** (possui 25a 6m 10d)\\n- Idade atual: *45 anos* - **Falta atingir**\\n\\n**Conclusão:** Atingirá os requisitos quando completar 62 anos, em aproximadamente 01/01/2030.\\n\\n**Cálculo do Benefício:** 60% da média + 2% por ano acima de 20 anos de contribuição."
    },
    {
      "ruleName": "Regra de Transição - Pontos (Art. 4º, EC 103/2019)",
      "meetsRequirements": true,
      "whenRequirementsMet": "Já atingido em 15/06/2023",
      "summary": "### Análise da Regra de Pontos\\n\\n**Requisitos (2025):**\\n- Pontuação mínima: **92 pontos (mulher)** / **102 pontos (homem)**\\n- Tempo de contribuição: 30 anos (M) / 35 anos (H)\\n- Idade mínima: 60 anos (M) / 65 anos (H)\\n\\n**Situação do Servidor:**\\n- Pontuação atual: **70 pontos** (45 anos + 25 anos de contribuição)\\n- Status: **Não atende** ainda\\n\\n**Observação:** A pontuação aumenta 1 ponto por ano até atingir 100 (M) / 105 (H)."
    }
  ]
}

# REGRAS CRÍTICAS
- NÃO envolva o JSON em code blocks (\`\`\`json ou \`\`\`)
- NÃO adicione texto explicativo antes ou depois do JSON
- Use aspas duplas (") para strings
- Use true/false (sem aspas) para booleanos
- APENAS o campo "summary" contém Markdown, os demais são texto simples
- No campo summary, use \\n para quebras de linha (será interpretado como quebra no Markdown)
- Analise TODAS as 22 regras principais

# IMPORTANTE
- Calcule com precisão baseado nos dados fornecidos
- Se faltar informação crítica, indique no summary usando Markdown
- Use legislação previdenciária vigente (CF/88, EC 103/2019, LC 152/2015)
- Considere regras de transição aplicáveis
- A resposta DEVE ser JSON puro e válido, sem qualquer texto adicional
- Cada campo "summary" DEVE conter texto formatado em Markdown para melhor legibilidade
    `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        systemInstruction,
        promptFiles: files,
      }),
    );
  }
}
