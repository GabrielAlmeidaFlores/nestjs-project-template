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
}
