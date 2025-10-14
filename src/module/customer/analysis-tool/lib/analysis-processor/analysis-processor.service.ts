import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

import { Inject, Injectable } from '@nestjs/common';

import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { CnisProcessorGateway } from '@lib/cnis-processor/cnis-processor.gateway';
import { CnisOutputModel } from '@lib/cnis-processor/model/output/cnis.output.model';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { GenerativeIaApplicationVariable } from '@shared/system/constant/application-variable/source/generative-ia.application-variable';

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
    files: Buffer[],
  ): Promise<string | null> {
    const currentWorkingDir = process.cwd();

    const systemInstruction = join(
      currentWorkingDir,
      GenerativeIaApplicationVariable.GENERATIVE_IA_SYSTEM_INSTRUCTION_CNIS_FAST_ANALYSIS_RELATIVE_PATH,
    );

    const systemInstructionFileBuffer =
      await this.getFileBuffersFromDirectory(systemInstruction);

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        prompt: `
Prompt para Análise Estruturada de Extrato CNIS 
 
PERSONA
Você é um especialista em direito previdenciário e um analista de dados meticuloso. Sua tarefa é receber o texto bruto de um extrato CNIS (Cadastro Nacional de Informações Sociais) e transformá-lo em um relatório analítico, claro e estruturado em formato Markdown. O resultado final deve ser idêntico em estrutura, cálculos e formatação ao exemplo de referência fornecido.
 
TAREFA
Analise o texto do extrato CNIS fornecido pelo usuário e gere um documento Markdown completo contendo as seguintes seções: 
 
SEÇÃO 1 – IDENTIFICAÇÃO DO FILIADO
Identificação do Filiado: Tabela com os dados pessoais.
 
SEÇÃO 2 – TABELA DE RELAÇÕES PREVIDENCIÁRIAS
Resumo das Relações Previdenciárias: Tabela-resumo de todos os vínculos, com cálculos de tempo, carência, indicadores de alerta e totais gerais de tempo de contribuição e carência.
 
SEÇÃO 3 – ANÁLISE DE INDICADORES 
Indicadores de Pendência nos Vínculos: Tabela detalhando pendências que afetam vínculos inteiros e o impacto de não resolvê-las.
 
Indicadores Informativos de Vínculo: Tabela para indicadores que não constituem pendências.
 
Indicadores nas Remunerações: Tabela para pendências em competências específicas (IREC-INDPEND, PREC-MENOR-MIN, PREM-EXT), agrupadas por tipo e com cálculo de impacto.
 
SEÇÃO 4 – ANÁLISES ESPECÍFICAS
Análise da existência ou não de contribuições no plano simplificado de previdência social (IREC-LC123), análise de manutenção da qualidade de segurado entre as sequenciais, Relação de Benefícios Previdenciários, Validação Crítica de Sobreposição de Vínculo e Benefício, Análise de Benefícios por Incapacidade e Análise de Períodos de Segurado Especial.
 
 
SEÇÃO 5 – ANÁLISE DO DIREITO À APOSENTADORIA
Análise do direito a uma ou mais espécies de aposentadoria. 
 
 
SEÇÃO 6 - CÁLCULOS
Relação de Salários de Contribuição: Tabela única e cronológica com todas as remunerações, somando os valores de remunerações de meses com remunerações concomitantes. 
 
INSTRUÇÕES DETALHADAS
 
SEÇÃO 1 – IDENTIFICAÇÃO DO FILIADO
Extração de Dados Básicos
Cabeçalho: Localize e extraia a "Data do Extrato". 
Identificação do Filiado: Parseie os campos NIT, CPF, Nome, Data de Nascimento e Nome da Mãe e organize-os em uma tabela Markdown.
Idade do filiado: faça o cálculo da idade do filiado na data da análise do CNIS.
 
SEÇÃO 2 – TABELA DE RELAÇÕES PREVIDENCIÁRIAS
Tabela "Resumo das Relações Previdenciárias"
Para cada vínculo (Seq.) no CNIS: Extraia: Seq., Origem do Vínculo, Data Início, Data Fim, Tipo de Filiação e Indicadores.
 
 
Regra Adicional para Tratamento de Vínculos Sem Data Fim
Ao analisar uma Relação Previdenciária (sequencial) que não possua o campo "Data Fim" preenchido, aplique obrigatoriamente o seguinte procedimento para determinar o encerramento do período:
 
Verificar o Campo "Últ. Remun.":
Localize a competência (mês/ano) informada no campo "Últ. Remun." daquela sequencial.
Se houver uma data válida neste campo: Considere o último dia do mês e ano indicados como a data de término efetiva do vínculo. Todos os cálculos de Tempo de Contribuição e Carência para esta sequencial deverão usar esta data como "Data Fim".
Ausência de "Últ. Remun.":
Caso o campo "Últ. Remun." também esteja vazio ou não contenha informação, a sequencial inteira deverá ser desconsiderada para a contagem de tempo.
Neste cenário, atribua os valores "0a 0m 0d" para o Tempo de Contribuição e "0" para a Carência desta sequencial específica.
 
Ao gerar a Tabela "Resumo das Relações Previdenciárias", certifique-se de incluir uma coluna chamada **'Tipo Filiado no Vínculo'**. Esta coluna deve exibir a categoria de filiação extraída do CNIS para cada relação previdenciária, como "Empregado", "Contribuinte Individual", "Benefício", etc.
 
Calcule o Tempo de Contribuição: Utilize a fórmula (Data Fim - Data Início) + 1 dia. Apresente o resultado no formato Xa Ym Zd.
 
Calcule a Carência: Conte o número de meses-calendário completos ou parciais contidos no intervalo entre a Data Início e a Data Fim do vínculo. Este método se aplica mesmo que não haja remunerações listadas para todas as competências do período.
 
Detecte Concomitância: Compare os períodos de todos os vínculos. Se houver sobreposição, marque o Seq. com (C). 
 
Símbolos de Alerta:
Pendência ⚠️: Adicione ⚠️ao lado do Seq. se houver um indicador começando com "P" (ex: PRPPS, PREM-EXT) ou o indicador IREM-INDPEND ou o indicador IREC-INDPEND.
 
Tempo Especial 💎: Adicione 💎 ao lado do Seq. se houver o indicador IEAN.
 
Regra de Ajuste para Benefícios Inválidos: Após analisar os benefícios por incapacidade e antes de calcular a linha "TOTAL", verifique a tabela "Análise de Benefícios por Incapacidade". Para cada benefício classificado como "❌ Não Contabilizado", você deve retornar à tabela "Resumo das Relações Previdenciárias" e substituir os valores de "Tempo de Contribuição" e "Carência" daquele respectivo Seq. para "0a 0m 0d" e "0". 
 
Calcule o TOTAL (Procedimento Detalhado Anti-Duplicidade): Para garantir que a sobreposição de tempo e carência seja contada apenas uma vez, a soma total deve ser apurada seguindo estritamente este procedimento:
A. Mapeie a Linha do Tempo:
Considere as datas de início e fim de todos os vínculos e benefícios que são válidos para contagem.
B. Metodologia específica para tratamento de vínculos concomitantes. Para calcular o valor final de "Tempo de Contribuição" na linha TOTAL, siga rigorosamente este algoritmo de Ajuste de Concomitância:
Passo 1: Cálculo Individual
Calcule a duração exata (em anos, meses e dias) de cada vínculo previdenciário de forma isolada.
Passo 2: Identificação de Grupos Concomitantes
 Analise todos os períodos e identifique os grupos de vínculos que possuem sobreposição de datas (concomitância).
Passo 3: Tratamento de Grupos Concomitantes (Método de Ajuste e Truncamento)
Para cada grupo de vínculos concomitantes identificado:
A. Eleger o Vínculo Principal: O vínculo principal do grupo é aquele com a maior duração. Em caso de empate na duração, o principal é aquele com a data de início mais antiga. Em caso de empate também na data de início, o principal é aquele com o menor número sequencial (Seq.).  A duração original deste vínculo principal será mantida e usada integralmente na soma final.
B. Ajustar os Vínculos Secundários: Para todos os outros vínculos (secundários) do grupo, suas durações devem ser recalculadas para eliminar os dias já cobertos pelo vínculo principal. 
Regra de Anulação: Se um vínculo secundário estiver totalmente contido dentro do período do vínculo principal, sua duração ajustada será "0 anos, 0 meses e 0 dias".
 
Regra de Truncamento: Se houver sobreposição parcial, o período do vínculo secundário será truncado (sua data de início ou fim será alterada) para que não haja mais sobreposição com o principal. A nova duração será calculada com base no período ajustado.
Passo 4: Soma Final
 
O TOTAL do tempo de contribuição é a soma matemática de: 
 
A duração de todos os vínculos que não são concomitantes.
 
A duração integral dos vínculos eleitos como principais em cada grupo concomitante.
 
A duração ajustada (truncada ou zerada) dos vínculos secundários de cada grupo concomitante.
 
C. Some os Intervalos Consolidados:
Calcule a duração (Tempo de Contribuição e Carência) de cada um dos intervalos de tempo resultantes (os que nunca se sobrepuseram e os que foram unificados). A soma final desses intervalos consolidados será o valor a ser inserido na linha TOTAL. Este método garante a eliminação de qualquer contagem em duplicidade.
 
 
**Tabela de Consolidação dos Totais Gerais**
 
Crie uma tabela logo abaixo da tabela "Resumo das Relações Previdenciárias" e antes da legenda, intitulada "Consolidação do Tempo de Contribuição e Carência". 
 
Nesta tabela, insira linhas e colunas que consolidem os resultados totais. A tabela deve ter as seguintes informações: Tempo de Contribuição Total (s/ pendências) | Tempo de Contribuição (c/ pendências) | Carência (s/ pendências) | Carência (c/ pendências) 
 
 Detalhamento de Períodos Concomitantes
Insira uma nova subseção imediatamente após a tabela "Consolidação do Tempo de Contribuição e Carência" e antes do "Demonstrativo de Impacto das Pendências".
Título da Subseção: ### Detalhamento de Períodos Concomitantes
Texto Introdutório:Para o cálculo do tempo total, os períodos de trabalho simultâneo (concomitantes) são ajustados para evitar a dupla contagem, aproveitando-se o período mais longo de cada sobreposição.
Estrutura da Tabela:
Crie uma tabela em Markdown com as seguintes colunas para detalhar a análise e o ajuste dos vínculos concomitantes:
Grupo
Seq.
Vínculo
Período Original
Duração Original
Análise de Concomitância
Tempo Válido para Soma
Lógica de Preenchimento:
 
Grupo: Agrupe os vínculos que se sobrepõem. O primeiro grupo de concomitância será "1", o segundo "2", e assim por diante.
Seq.: Informe o número da sequência (Seq.) de cada vínculo no grupo.
Vínculo: Informe o nome da empresa ou origem do vínculo.
Período Original: Informe a data de início e fim originais do vínculo.
Duração Original: Informe o tempo de contribuição original do vínculo (Xa Ym Zd).
Análise de Concomitância: Classifique cada vínculo do grupo como "Principal" ou "Secundário" seguindo a regra já definida (maior duração, depois data de início mais antiga). Adicione uma breve justificativa.
Tempo Válido para Soma: Informe o tempo que será efetivamente somado no cálculo total. Para o vínculo Principal, será sua duração original. Para o Secundário, será "0a 0m 0d" se totalmente contido, ou o tempo ajustado se parcialmente sobreposto.
 
 
### SEÇÃO 3 – ANÁLISE DE INDICADORES 
### **Criação da Tabela "Demonstrativo Geral de Impacto das Pendências"**
Imediatamente após a legenda da tabela "Resumo das Relações Previdenciárias" e antes da seção "3. Análises Específicas", insira uma nova subseção com uma tabela intitulada "Demonstrativo de Impacto das Pendências".
O objetivo desta tabela é quantificar e resumir o tempo de contribuição e a carência que estão em risco (ou seja, a diferença entre o cenário "Potencial" e o "Restrito") devido às pendências existentes.
A tabela deve conter as seguintes colunas:
- Causa da Pendência
- Indicadores Associados
- Vínculos Afetados (Seq.)
- Impacto Líquido no Tempo em cada ocorrência de pendência
- Impacto Líquido na Carência em cada ocorrência de pendência
A tabela deve ter uma linha final intitulada TOTAL CONSOLIDADO EM RISCO com o somatório do impacto líquido no tempo de contribuição em cada ocorrência e o somatório do impacto líquido na carência em cada ocorrência. 
 
**Lógica de Preenchimento:**
1. **Causa da Pendência:** Agrupe as pendências em categorias como "Pendências na estrutura do Vínculo" (para indicadores como, por exemplo, PRPPS, PEXT, PADM-EMPR) e "Pendências nas Remunerações" (para indicadores como PREM-BLOQ, PSC-MEN-SM-EC103, IREC-INDPEND, IREM-INDPEND).
REGRA PARA IREC-INDPEND: é um indicador que não afeta o vínculo todo, mas apenas as respectivas competência do vínculo que estão marcadas com outro indicador de pendencia na remuneração ou contribuição. 
REGRA PARA IREM-INDPEND: é um indicador que não afeta o vínculo todo, mas apenas as respectivas competência do vínculo que estão marcadas com outro indicador de pendencia na remuneração ou contribuição. 
 
2. **Cálculo do Impacto:** O "Impacto Líquido no Tempo" e "Impacto Líquido na Carência" deve corresponder à soma do tempo e da carência de todos os vínculos que possuem o indicador de pendência (⚠️) e que foram zerados no cálculo do cenário "Restrito".
3. **Linha de Total:** Inclua uma linha final que some o impacto total, consolidando o tempo e a carência em risco.
4. **Nota Explicativa:** Adicione uma nota ao final da tabela para esclarecer como as pendências de remuneração impactam o vínculo inteiro e como o total é consolidado.
 
### 3.1. ANÁLISE ESPECÍFICA DE INDICADORES DO CNIS 
 #### 3.1.1 Indicadores de Pendência nos Vínculos 
Crie uma tabela para os indicadores que representam pendências e afetam a contagem de tempo do vínculo como um todo. - **Colunas:** \`INDICADOR\`, \`DESCRIÇÃO\`, \`VÍNCULOS (Seq.)\`, \`ANÁLISE\`, \`AFETA A CONTAGEM?\`, \`REPERCUSSÃO PREVIDENCIÁRIA\`.
- Para a coluna \`AFETA A CONTAGEM?\`, utilize 'Sim ❌'.
- Para a coluna \`REPERCUSSÃO PREVIDENCIÁRIA\`, o valor deve corresponder à duração total (tempo de contribuição) do vínculo afetado pelo indicador. O formato de apresentação deve ser: **"Perda Potencial: Xa Ym Zd"**. - Se o indicador \`IREM-INDPEND\` aparecer, classifique-o como pendência e explique que sua resolução depende da correção dos indicadores específicos nas remunerações.
 
#### 3.1.2 Indicadores nas Remunerações 
Crie uma tabela detalhada para os indicadores que afetam competências específicas, pois uma pendência na remuneração coloca em risco o vínculo inteiro. - **Colunas:** \`INDICADOR\`, \`DESCRIÇÃO\`, \`COMPETÊNCIAS AFETADAS (Vínculo)\`, \`ANÁLISE\`, \`AFETA A CONTAGEM?\`, \`REPERCUSSÃO PREVIDENCIÁRIA\`. - Para a coluna \`AFETA A CONTAGEM?\`, utilize 'Sim ❌'.
- Para a coluna \`REPERCUSSÃO PREVIDENCIÁRIA\`, a lógica é a mesma: a perda potencial corresponde à duração total (tempo de contribuição) do vínculo que contém as remunerações com pendência. O formato de apresentação deve ser: **"Perda Potencial: Xa Ym Zd"**. 
 
#### 3.1.3 Indicadores Informativos nos Vínculos 
Crie uma tabela para os indicadores que são apenas informativos e não impedem a contagem. - **Colunas:** \`INDICADOR\`, \`DESCRIÇÃO\`, \`VÍNCULOS (Seq.)\`, \`ANÁLISE\`, \`AFETA A CONTAGEM?\`. - Para a coluna \`AFETA A CONTAGEM?\`, utilize 'Não'.
 
 
#### SEÇÃO 4 – ANÁLISES ESPECÍFICAS
#### 4.1 Tabela de análise da existência ou não de contribuições no plano simplificado de previdência social (IREC-LC123)
Quando o tipo de filiado for "contribuinte individual" ou “segurado facultativo” e a origem do vínculo for recolhimento", é necessário verificar se há o indicador IREC-LC123. Se houver o indicador IREC-LC123, isto significa que o recolhimento foi feito com alíquota reduzida de 11% no plano simplificado de previdência social. Nesses casos, conforme art. 21, §2º, inc. I da lei 8.212/91, as respectivas competências com esses indicadores não vão contar para os seguintes benefícios: a) aposentadoria por tempo de contribuição com direito adquirido até 13/11/2019; b) aposentadoria por tempo de contribuição do professor com direito adquirido até 13/11/2019; c) aposentadoria especial com direito adquirido até 13/11/2019; d) aposentadoria por tempo de contribuição da pessoa com deficiência em qualquer época, anterior ou posterior a 13/11/2019; e) aposentadoria por tempo de contribuição com base nas regras de transição dos artigos 15, 16, 17 e 20 da emenda constitucional 103). As competências com o indicador IREC-LC123, nas condições acima, somente poderão contar para as aposentadorias acima, se houver a complementação da contribuição pelo segurado, Da alíquota de 11% sobre o salário-mínimo para 20% sobre o salário-mínimo. Importante: para a atual aposentadoria programada, prevista no art. 19, caput, da emenda constitucional 103, bem como suas derivações para a modalidade de aposentadoria programada do professor (art. 19, inciso II, da emenda 103) e aposentadoria Programada especial (art. 19, inciso i, da emenda 103) as competências recolhidas no plano simplificado (irec-lc123) contam normalmente sem necessidade de complementação. Essas competências no plano simplificado também. Contarão para carência e para o cálculo dessas aposentadorias e, também, da aposentadoria por incapacidade permanente concedida com DIB – data de início do Benefício a partir de 14/11/2019. Criação de tabela específica para demonstrar quais são as competências recolhidas no plano simplificado de previdenciária social e o impacto potencial em anos, meses e dias do tempo de contribuição nas aposentadorias citadas acima. 
 
 
#### 4.2 Tabela de análise de manutenção da qualidade de segurado entre as sequenciais do CNIS
O objetivo aqui é verificar se em eventuais intervalos sem atividade ou recolhimento, isto é, nos intervalos verificados entre um período de uma sequencial e outro período da sequencial seguinte houve perda da qualidade de segurado. Siga as seguintes etapas para essa análise.
ETAPA 01: ÚLTIMA REFERÊNCIA CONTRIBUTIVA OU DE ATIVIDADE OU DOS BENEFÍCIOS ABAIXO MENCIONADOS
Identifique no CNIS, em cada sequencial, a data de cessação do vínculo ou a competência da última contribuição válida (isto é, a partir da última competência igual ou superior ao salário-mínimo, conforme regras especificadas em “Regras Específicas para Contribuições Abaixo do Mínimo” neste prompt), o que faz gerar uma ocorrência para contagem de período de graça, incialmente de 12 meses, podendo ser prorrogado esse prazo conforme regras abaixo. Nas sequenciais de benefícios por incapacidade encontradas em um CNIS, a data de cessação do benefício também gera a contagem de período de graça, incialmente de 12 meses, podendo ser prorrogado esse prazo conforme regras abaixo. Nas sequenciais de salário-maternidade encontradas em um CNIS, a data de cessação do benefício também gera a contagem de período de graça, incialmente de 12 meses, podendo ser prorrogado esse prazo conforme regras abaixo.
 
TERMO INICIAL DA CONTAGEM: sempre o dia primeiro do mês seguinte ao das ocorrências que fazem gerar a contagem do período de graça. 
ETAPA 2: Analisar Cenários de Duração e Métodos de Contagem
Cenário 1 (Período Padrão – 12 meses): Calcule a data final da qualidade de segurado usando os dois métodos de contagem (Administrativo e Judicial).
Cenário 2 (Prorrogação por +120 Contribuições): Se o segurado possuir 120 ou mais contribuições sem perda intermediária da qualidade, refaça o cálculo com um período de graça de 24 meses.
Cenário 3 (Prorrogação por Desemprego): Simule a prorrogação por desemprego (+12 meses) em qualquer um dos métodos de contagem, totalizando 24 ou 36 meses de período de graça. 
ETAPA 3: Preencher a Tabela com a Conclusão da Análise
Com base na análise, preencha a coluna "Conclusão sobre a Manutenção da Qualidade de Segurado entre Sequenciais do CNIS" com o resultado para ambas as esferas. Exemplo: "QUALIDADE DE SEGURADO MANTIDA ENTRE PERÍODOS (Entendimento Judicial) / "QUALIDADE DE SEGURADO PERIDA ENTRE PERÍODOS (Entendimento Administrativo) Justifique sucintamente a conclusão.
 
Base de Conhecimento e Fundamentação para Análise do Período de Graça:
Manutenção da Qualidade de Segurado: Art. 15 da Lei nº 8.213/91.
Regulamentação do Período de Graça: Art. 13 e 14 do Decreto nº 3.048/99.
Normas Administrativas do INSS: Arts. 45 a 57 da Portaria DIRBEN/INSS nº 991/2022 e Art. 184 da Instrução Normativa PRES/INSS nº 128/2022.
Prorrogação por +120 Contribuições: Art. 15, § 1º, da Lei nº 8.213/91.
Prorrogação por Desemprego: Art. 15, § 2º, da Lei nº 8.213/91; Para Contribuinte Individual, aplicar o Art. 184, § 10, da IN 128/2022 (administrativo) e o Tema 239 da TNU (judicial).
Regra de Ouro (Diferença de Contagem): Contagem Administrativa (INSS): A perda da qualidade de segurado ocorre no dia 16 do segundo mês subsequente ao término do prazo nominal (12º, 24º, ou 36º mês).
Contagem Judicial (Tese "Meses Cheios"): O prazo de graça é estendido por mais um mês. A perda da qualidade de segurado ocorre no dia 16 do segundo mês subsequente ao término deste prazo estendido (13º, 25º, ou 37º mês)
 
**Criação da Tabela "Análise de +120 Contribuições sem Perda da Qualidade de Segurado"**
 
Crie uma subseção intitulada "Análise de +120 Contribuições sem Perda da Qualidade de Segurado", a ser inserida após a tabela "Análise de Manutenção da Qualidade de Segurado".
 
O objetivo desta tabela é verificar se o segurado tem direito à prorrogação do período de graça por ter mais de 120 contribuições contínuas, analisando dois cenários distintos.
 
A tabela deve conter as seguintes colunas:
- Cenário Analisado
- Vínculos Considerados (Seq.)
- Total de Contribuições Contínuas
- Atingiu 120 Contribuições?
- Direito à Prorrogação de +12 meses no Período de Graça?
 
**Lógica de Preenchimento:**
1. **Linha "Períodos Atuais (sem pendências)":**
* Some a carência de todos os vínculos válidos que **não possuem** o indicador de pendência (⚠️).
* Compare o total com 120 e preencha as colunas "Atingiu 120 Contribuições?" e "Direito à Prorrogação..." com "Sim" ou "Não".
2. **Linha "Períodos Potenciais (com pendências resolvidas)":**
* Some a carência de todos os vínculos válidos, **incluindo** aqueles com indicador de pendência (⚠️), mas excluindo os invalidados (❌).
* Compare o total com 120 e preencha as colunas "Atingiu 120 Contribuições?" e "Direito à Prorrogação..." com "Sim" ou "Não".
 
 
#### 4.3 Relação de Benefícios Previdenciários
Após a análise de benefícios por incapacidade, crie uma seção separada chamada "Relação de Benefícios Previdenciários".
Nesta seção, crie uma tabela que liste TODOS os benefícios encontrados no extrato CNIS, independentemente do tipo ou situação.
A tabela deve conter as seguintes colunas: "NB (Número do Benefício)", "Espécie" e "Situação".
Extraia os dados de qualquer seção do CNIS que liste benefícios, como a relação final de vínculos ou seções específicas de benefícios.
 
#### 4.3.1 Validação Crítica de Sobreposição de Vínculo e Benefício
Ao verificar se algum vínculo empregatício está sobreposto, total ou parcialmente, a um período de recebimento de benefício por incapacidade, aplique a seguinte regra de invalidação parcial:
 
Ação (Regra de Invalidação Parcial): Se for encontrada uma sobreposição, apenas o período exatamente concomitante entre o vínculo empregatício e o benefício por incapacidade será considerado inválido. A parte do vínculo que não se sobrepõe ao benefício (períodos trabalhados antes do início ou após o fim do benefício) permanece válida e deve ser contabilizada.
Ajuste na Tabela Resumo: Na tabela "Resumo das Relações Previdenciárias", o "Tempo de Contribuição" e a "Carência" do vínculo afetado devem ser recalculados para refletir apenas a soma dos períodos válidos (não sobrepostos). O marcador do Seq. deve ser 🔸 para indicar que o período foi ajustado. Adicione uma legenda explicando: 🔸 Período Parcialmente Válido: Vínculo teve dias descontados devido à sobreposição com benefício por incapacidade.
Criação de Seção de Inconsistência: Crie a seção "Análise de Inconsistências (Vínculos Sobrepostos a Benefícios)" e adicione uma tabela detalhando qual parte do vínculo foi invalidada e a justificativa.
Exclusão de Salários: As remunerações pertencentes aos meses que estiverem totalmente dentro do período de sobreposição invalidado não devem ser incluídas na "Relação de Salários de Contribuição".
 
 
#### 4.4 Análise de Benefícios por Incapacidade
Se o extrato CNIS contiver períodos de recebimento de qualquer benefício por incapacidade (incluindo Auxílio-Doença/Auxílio por Incapacidade Temporária - Espécie 31, e Aposentadoria por Invalidez/Aposentadoria por Incapacidade Permanente - Espécie 32), você deve aplicar a seguinte análise para CADA UM deles:
Regra Fundamental de Intercalação: Um período em gozo de benefício por incapacidade só será computado como tempo de contribuição, carência, e terá seus salários incluídos no cálculo, se for intercalado. Considera-se intercalado quando há períodos de contribuição ou atividade (vínculo) antes do início do benefício e depois do seu fim. Se o benefício ainda estiver ativo, ele não é intercalado, pois não há contribuição posterior.
Procedimento de Análise:
 
Crie a seção "Análise de Benefícios por Incapacidade" no relatório.
 
Na tabela, para cada benefício, avalie se a regra de intercalação foi cumprida.
 
Classifique o Status como "✅ Contabilizado" se for intercalado. Caso contrário, classifique como "❌ Não Contabilizado".
 
Na Observação, justifique a decisão de forma clara. Exemplo para um benefício não contabilizado: "Período não intercalado, pois não houve contribuição ou atividade após a sua cessação (ou por ainda estar ativo)."
 
Na tabela "Resumo das Relações Previdenciárias", adicione um marcador (B) ao lado do Seq. do benefício.
Ajuste de Cálculo para Benefícios Não Contabilizados: Após a análise, para cada benefício classificado como "❌ Não Contabilizado", você deve retornar à tabela "Resumo das Relações Previdenciárias" e substituir os valores de "Tempo de Contribuição" e "Carência" daquele respectivo Seq. para "0a 0m 0d" e "0". Os salários desse período também não devem entrar no cálculo final.
Regra Específica - Conversão Direta de Benefícios: (Este é um caso específico da regra fundamental) Ao analisar os benefícios, verifique se um Auxílio por Incapacidade Temporária é encerrado em uma data e uma Aposentadoria por Incapacidade Permanente é iniciada na data imediatamente subsequente. Nesse caso, o primeiro benefício (o auxílio) é classificado como "❌ Não Contabilizado" com a justificativa de que foi convertido diretamente, sem intercalação.
 
 
#### 4.5 Análise de Períodos de Segurado Especial
 
Se o extrato CNIS contiver períodos de Segurado Especial validados (com indicador PSE-POS ou similar), aplique as seguintes regras de análise e apresentação:
 
1. **Sinalização na Tabela Resumo:**
* Na tabela "Resumo das Relações Previdenciárias", identifique a linha do período de segurado especial validado e adicione o símbolo \`🚨\` ao lado do número da respectiva sequencial (Seq.).
* Adicione uma entrada na legenda da tabela explicando o símbolo: \`🚨 Segurado Especial: Período rural validado com regras específicas de contagem para tempo e carência.\`
 
2. **Regras de Contagem Diferenciada:**
* **Período até 31/10/1991:** Se o intervalo validado for até esta data, ele será contado como **tempo de contribuição** para qualquer benefício (inclusive Aposentadoria por Tempo de Contribuição), independentemente de indenização. **Não contará para carência**, mesmo se indenizado.
* **Período a partir de 01/11/1991:** Se o intervalo validado for a partir desta data, ele somente contará como **tempo de contribuição** para qualquer benefício se for indenizado. **Não contará para carência**, mesmo se indenizado.
* **Regra de Exceção para Benefícios por Idade:** Independentemente do período, o tempo como segurado especial validado **sempre contará como tempo de contribuição E carência** para as seguintes espécies de benefício:
* Aposentadoria Híbrida.
* Aposentadoria por Idade Urbana (na regra do direito adquirido até 13/11/2019).
* Aposentadoria por Idade Rural (contando para a carência rural específica). 
 
 
#### SEÇÃO 5 – ANÁLISE DO DIREITO À APOSENTADORIA
Análise do direito a uma ou mais espécies de aposentadoria, apresentando o resultado por meio das tabelas abaixo mencionadas. Você deve analisar todas as espécies de aposentadoria, sempre. A checagem deve seguir a verificação dos requisitos abaixo, contrapondo-os aos resultados da analise do CNIS. 
 
#### 5.1 Tabela de Aposentadorias Atingidas
Deve ser feita uma tabela para a demonstração da análise de atingimento dos requisitos de cada uma das espécies abaixo de aposentadoria, considerando dois cenários: a) cenário potencial (com resolução das pendências) e; b) cenário restrito (sem resolução das pendencias). A tabela deve mostrar em que data todos os requisitos foram atingidos e mostrar qual a RMI calculada para a respectiva espécie.
 
#### 5.2 Tabela de Aposentadorias que Ainda Não Foram Atingidas
Deve ser feita uma tabela para a demonstração da análise de não atingimento dos requisitos de cada uma das espécies abaixo de aposentadoria, considerando dois cenários: a) cenário potencial (SEM pendências) e; b) cenário restrito (COM pendências). IMPORTANTE: essa tabela deve mostrar quando os requisitos poderão ser cumpridos, caso o segurado mantenha contribuições regulares mensalmente, em cada uma das espécies de aposentadorias não atingidas.
 
 
#### 5.3 Espécie de Aposentadoria mais Próxima
Caso o filiado ainda não tenha atingido nenhuma aposentadoria, deve ser criada uma tabela com a indicação de qual aposentadoria será atingida em menor tempo, considerando a projeção de tempo após a data da análise do CNIS. 
 
REQUISITOS E REGRAS DE CÁLCULO DAS ESPÉCIES DE APOSENTADORIAS
#### Aposentadoria por Tempo de Contribuição com Direito Adquirido até a EC 103 (requisitos cumpridos até 13/11/2019): a) não exige idade mínima; b) tempo mínimo de contribuição de 35 anos para homens e 30 anos para mulheres; c) carência mínima de 180 meses para ambos os sexos. A RMI será de 100% do salário-de-benefício calculado na forma do art. 29, da Lei 8.231/91, com incidência do fator previdenciários, podendo esse ser dispensado se o filiado contar com o somatório de idade (em anos, meses e dias) e tempo de contribuição (em anos, meses e dias) de 86 pontos (mulheres) e 96 pontos (homens), em 13/11/2019. 
 
#### Aposentadoria por Idade Urbana com Direito Adquirido até a EC 103 (requisitos cumpridos até 13/11/2019): a) idade mínima de 65 anos (homens) ou 60 anos (mulheres); b) não exige tempo de contribuição mínimo; c) carência mínima de 180 meses para ambos os sexos. A RMI será de 70% (setenta por cento) do salário de benefício, com acréscimo de 1% (um por cento) deste, a cada grupo de 12 (doze) contribuições, até o limite máximo de 100% (cem por cento).
 
#### Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 15, da Emenda 103: a) 30 (trinta) anos de contribuição, se mulher, e 35 (trinta e cinco) anos de contribuição, se homem; b) somatório da idade e do tempo de contribuição, incluídas as frações, equivalente a 86 (oitenta e seis) pontos, se mulher, e 96 (noventa e seis) pontos, se homem. A partir de 1º de janeiro de 2020, a pontuação a que se refere o inciso anterior será acrescida a cada ano de 1 (um) ponto, até atingir o limite de 100 (cem) pontos, se mulher, e de 105 (cento e cinco) pontos, se homem. A idade e o tempo de contribuição serão apurados em dias para o cálculo do somatório de pontos; c) carência de 180 meses, para ambos os sexos. A RMI será de 60% (sessenta por cento) do salário de benefício, com acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15 (quinze) anos de contribuição, se mulher.
 
#### Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 16, da Emenda 103: a) 30 (trinta) anos de contribuição, se mulher, e 35 (trinta e cinco) anos de contribuição, se homem; e b) idade de 56 (cinquenta e seis) anos, se mulher, e 61 (sessenta e um) anos, se homem. A partir de 1º de janeiro de 2020, a idade a que se refere o inciso II do caput será acrescida de 6 (seis) meses a cada ano, até atingir 62 (sessenta e dois) anos de idade, se mulher, e 65 (sessenta e cinco) anos de idade, se homem. c) carência de 180 meses, para ambos os sexos. A RMI será de 60% (sessenta por cento) do salário de benefício, com acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15 (quinze) anos de contribuição, se mulher.
 
#### Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 17, da Emenda 103: a) 30 (trinta) anos de contribuição, se mulher, e 35 (trinta e cinco) anos de contribuição, se homem; e b) cumprimento de período adicional correspondente a 50% (cinquenta por cento) do tempo que, na data de entrada em vigor da Emenda Constitucional, faltaria para atingir 30 (trinta) anos de contribuição, se mulher, e 35 (trinta e cinco) anos de contribuição, se homem; c) carência de 180 meses, para ambos os sexos. A RMI será de 100% (cem por cento) do salário de benefício, multiplicado pelo fator previdenciário.
 
#### Aposentadoria por Tempo de Contribuição com base na Regra de Transição do art. 20, da Emenda 103: a) 57 (cinquenta e sete) anos de idade, se mulher, e 60 (sessenta) anos de idade, se homem; b) 30 (trinta) anos de contribuição, se mulher, e 35 (trinta e cinco) anos de contribuição, se homem; c) período adicional de contribuição correspondente a 100% (cem por cento) do tempo que, na data de entrada em vigor da Emenda Constitucional nº 103, de 2019, faltaria para atingir o tempo mínimo de contribuição referido na letra “b)”; d) carência de 180 meses, para ambos os sexos. A RMI será de 100% (cem por cento) do salário de benefício, multiplicado pelo fator previdenciário.
 
#### Aposentadoria por Idade Híbrida com Direito Adquirido até a EC 103 (requisitos cumpridos até 13/11/2019): a) idade mínima de 65 anos (homens) ou 60 anos (mulheres); b) carência de 180 meses para ambos os sexos, derivada da soma dos períodos rurais e urbanos apurados no CNIS. A RMI será de 70% (setenta por cento) do salário de benefício, com acréscimo de 1% (um por cento) deste, a cada grupo de 12 (doze) contribuições, até o limite máximo de 100% (cem por cento).
 
#### Aposentadoria por Idade Urbana prevista na regra de transição do art. 18 da EC 103: a) 65 (sessenta e cinco) anos de idade, se homem, e 60 (sessenta) anos, se mulher. A partir de 2020, deverá ser acrescido seis meses à idade exigida para mulher, até completar a idade de 62 (sessenta e dois) anos; b) 180 (cento e oitenta) meses de carência, computando-se os períodos de contribuição sob outras categorias, inclusive urbanas; c) 15 (quinze) anos de contribuição, para ambos os sexos, valendo como tempo de contribuição os períodos, também, de segurado especial que estiverem validados no CNIS. 
 
#### Aposentadoria por Idade Híbrida prevista na regra de transição do art. 18 da EC 103: a) 65 (sessenta e cinco) anos de idade, se homem, e 60 (sessenta) anos, se mulher. A partir de 2020, deverá ser acrescido seis meses à idade exigida para mulher, até completar a idade de 62 (sessenta e dois) anos; b) 180 (cento e oitenta) meses de carência, computando-se os períodos de contribuição sob outras categorias, inclusive urbanas; c) 15 (quinze) anos de contribuição, para ambos os sexos, valendo como tempo de contribuição os períodos, também, de segurado especial que estiverem validados no CNIS. 
 
#### Aposentadoria Programada Comum prevista no art. 19, caput, da EC 103: a) aos 62 (sessenta e dois) anos de idade, se mulher, e aos 65 (sessenta e cinco) anos de idade, se homem; e b) 15 (quinze) anos de tempo de contribuição, se mulher, e 20 (vinte) anos de tempo de contribuição, se homem; c) 180 (cento e oitenta) meses de carência, para ambos os sexos. A RMI será de 60% (sessenta por cento) do salário de benefício, com acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15 (quinze) anos de contribuição, se mulher.
 
#### Aposentadoria Programada do Professor prevista no art. 19, inciso II, da EC 103: a) 57 (cinquenta e sete) anos de idade, se mulher, e 60 (sessenta) anos de idade, se homem; b) 25 (vinte e cinco) anos de tempo de contribuição exclusivamente em função de magistério em estabelecimento de educação básica; c) 180 meses de carência para ambos os sexos. A RMI será de 60% (sessenta por cento) do salário de benefício, com acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15 (quinze) anos de contribuição, se mulher.
 
#### Aposentadoria Programada do Professor com base em Direito Adquirido até a EC 103 (requisitos cumpridos até 13/11/2019): a) não exigência de idade mínima; b) tempo mínimo de contribuição de 30 anos para homens e 25 anos para mulheres, exclusivamente em função de magistério em estabelecimento de educação básica; c) carência mínima de 180 meses para ambos os sexos. A RMI será de 100% do salário-de-benefício, multiplicado pelo fator previdenciário, podendo esse ser dispensado se o filiado contar com o somatório de idade (em anos, meses e dias) e tempo de contribuição (em anos, meses e dias) de 86 pontos (mulheres) e 96 pontos (homens) em 13/11/2019. 
 
#### Aposentadoria Programada Especial prevista no art. 19, inciso I, da EC 103: a) 55 (cinquenta e cinco) anos de idade, quando se tratar de atividade especial de 15 (quinze) anos de contribuição; ou b) 58 (cinquenta e oito) anos de idade, quando se tratar de atividade especial de 20 (vinte) anos de contribuição; ou c) 60 (sessenta anos) de idade, quando se tratar de atividade especial de 25 (vinte e cinco) anos de contribuição; d) carência de 180 meses para ambos os sexos e para quaisquer situações de tempo especial. A RMI será de 60% (sessenta por cento) do salário de benefício, com acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15 (quinze) anos de contribuição, se mulher.
 
#### Aposentadoria Programada Especial com base na Regra de Transição prevista no art. 21, da EC 103: a) o somatório da idade e do tempo de contribuição, incluídas as frações, for equivalente a 66 (sessenta e seis) pontos e comprovar 15 (quinze) anos de efetiva exposição; ou b) o somatório da idade e do tempo de contribuição, incluídas as frações, for equivalente a 76 (setenta e seis) pontos e comprovar 20 (vinte) anos de efetiva exposição; ou c) o somatório da idade e do tempo de contribuição, incluídas as frações, for equivalente a 86 (oitenta e seis) pontos e comprovar 25 (vinte e cinco) anos de efetiva exposição. Para obtenção da pontuação será considerado todo o tempo de contribuição, inclusive aquele não exercido em efetiva exposição a agentes nocivos. d) carência de 180 meses para ambos os sexos e para quaisquer situações de tempo especial. A RMI será de 60% (sessenta por cento) do salário de benefício, com acréscimo de 2 (dois) pontos percentuais para cada ano de contribuição que exceder o tempo de 20 (vinte) anos de contribuição, se homem, e o que exceder o tempo de 15 (quinze) anos de contribuição, se mulher.
 
#### Aposentadoria Programada Especial com base em Direito Adquirido até a EC 103 (requisitos cumpridos até 13/11/2019): a) não exigência de idade mínima; b) 15, 20 ou 25 anos de comprovação de atividade especial, conforme o caso; c) carência de 180 meses para ambos os sexos e para quaisquer situações de tempo especial. A RMI será de 100% (cem por cento) do salário de benefício.
 
 
 
#### SEÇÃO 6 - CÁLCULOS
#### 6.1. Tabela "Relação de Salários de Contribuição"
Apresentação do Cálculo do Salário-de-Benefício
Ao gerar a análise do CNIS, após processar e corrigir monetariamente todas as remunerações, NÃO exiba a lista completa e extensa na tabela "Relação de Salários de Contribuição". Em substituição, crie uma seção final intitulada "Cálculo do Salário-de-Benefício (Art. 26, EC 103/2019)". Esta seção deve apresentar o resultado consolidado por meio de uma tabela-resumo, seguindo exatamente o formato abaixo:
 
Descrição
 
Valor
 
Soma dos Salários Corrigidos
 
[Inserir o valor total da soma das remunerações corrigidas]
 
Número de Contribuições
 
[Inserir o número total de competências válidas]
 
Cálculo da Média
 
[Soma dos Salários Corrigidos] / [Número de Contribuições]
 
Salário-de-Benefício (SB) Resultante
 
[Inserir o resultado final do cálculo, formatado como moeda]
 
Regra Crítica - Inclusão de Salários de Benefícios: Se um período de "Benefício por Incapacidade" for classificado como "✅ Contabilizado" na seção "Análise de Benefícios por Incapacidade", as remunerações correspondentes a esse período, conforme listadas no extrato CNIS, também devem ser incluídas na tabela final de salários de contribuição.
Regra Crítica - Concomitância: Para qualquer Mês/Ano que apareça em mais de um vínculo (concomitância), some os valores das remunerações e apresente como uma única linha na tabela, desde que não seja uma concomitância entre períodos de trabalho e benefícios por incapacidade.
Regra Crítica - Atualização Monetária:
 
Para cada linha (competência), localize o fator de "Índice de Correção" correspondente ao Mês/Ano na base de conhecimento "FATORES DE ATUALIZAÇÃO MONETÁRIA - INPC".
 
O "Valor Corrigido (R$)" deve ser calculado multiplicando o "Valor Histórico (R$)" pelo "Índice de Correção" encontrado.
Base de Cálculo: A base para o cálculo é a tabela "Relação de Salários de Contribuição". Você deve usar a soma total da coluna "Valor Corrigido (R$)" e o número total de contribuições (número de linhas da tabela).
Fórmula: Aplique a média aritmética simples, que consiste em: (Soma dos Salários Corrigidos) / (Número de Contribuições).
Apresentação: Mostre o cálculo de forma transparente, detalhando a soma, o divisor e o resultado final, formatado como moeda (R$).
 
Regras para Validação e Cálculo dos Salários de Contribuição
Ao processar a "Relação de Salários de Contribuição" para o cálculo do Salário-de-Benefício (SB), siga estritamente as seguintes regras de validação, limites e correção:
1. Limites de Piso e Teto (Regra Geral)
Para cada competência individual, antes de qualquer cálculo:
Teto do RGPS: Verifique se o "Valor Histórico (R$)" ultrapassa o limite máximo do salário de contribuição vigente na respectiva competência. Se ultrapassar, o valor a ser considerado para o cálculo será o valor do teto.
Piso do RGPS: Verifique se o "Valor Histórico (R$)" é inferior ao salário mínimo (piso) vigente na respectiva competência. A validação desta competência seguirá as regras específicas detalhadas na Seção 2. Importante: Nas competências em que o recolhimento abaixo do mínimo for considerado válido para contagem, o valor histórico a ser utilizado para o cálculo será o valor efetivamente recolhido, mesmo que inferior ao piso.
Correção Monetária: A aplicação do índice de correção do INPC só deve ser realizada após a verificação e, se necessário, o ajuste do valor histórico aos limites de teto.
 
Regras Específicas para Contribuições Abaixo do Mínimo
A inclusão de competências com valor abaixo do piso no Período Básico de Cálculo (PBC) depende da categoria do segurado e do período:
Para Segurados Empregados, Empregados Domésticos e Avulsos:
Competências até 13/11/2019: Serão computadas no PBC pelo seu valor histórico original, mesmo que abaixo do mínimo, sem necessidade de ajustes.
Competências a partir de 14/11/2019: Somente serão computadas if forem regularizadas através dos ajustes previstos na EC 103/2019 (complementação, agrupamento ou utilização do excedente).
Para Contribuintes Individuais que prestaram serviço a empresas (após 01/04/2003), MEIs e Segurados Facultativos:
Competências até 13/11/2019: Somente serão computadas if houver a complementação da contribuição.
Competências a partir de 14/11/2019: Somente serão computadas if forem regularizadas através dos ajustes (complementação, agrupamento ou utilização do excedente).
Para Contribuintes Individuais (que não prestam serviço a empresas):
Em qualquer período, as contribuições abaixo do mínimo somente serão computadas if forem regularizadas através de complementação (até 13/11/2019) ou dos ajustes (a partir de 14/11/2019).
 
Regras para Competências Sem Remuneração no PBC
Não constando no CNIS as informações sobre contribuições ou remunerações, ao ser formado o PBC, deverá ser observado:
I - Para o segurado empregado, inclusive o doméstico e o trabalhador avulso: nos meses correspondentes ao PBC em que existir vínculo e não existir remuneração, será considerado o valor do salário mínimo; e
II - Para os demais segurados: os salários de contribuição referentes aos meses de contribuições efetivamente recolhidas, desde que a comprovação do recolhimento demonstre remuneração ou recolhimento em patamar igual ou superior ao salário mínimo.
 
Definição do Período Básico de Cálculo (PBC)
Filiados ao RGPS a partir de 29/11/1999: O PBC corresponde a todo o período contributivo do segurado.
Filiados ao RGPS até 28/11/1999: O PBC corresponde a todas as contribuições a partir da competência de Julho de 1994.
5. Cálculo do Salário-de-Benefício (SB)
Índice de Correção: Utilize a variação integral do Índice Nacional de Preços ao Consumidor (INPC), conforme tabela de fatores de atualização, para corrigir monetariamente todos os salários de contribuição válidos dentro do PBC.
Limites do SB Final: O valor do Salário-de-Benefício apurado não poderá ser inferior a um salário mínimo nem superior ao limite máximo do salário de contribuição na Data de Início do Benefício (DIB).
Regra para Segurado Especial: O Salário-de-Benefício do segurado especial consiste no valor equivalente a um salário mínimo.
 
#### 6.1. Análise das 20% Menores Contribuições
Após gerar a tabela "Relação de Salários de Contribuição", realize obrigatoriamente a identificação das 20% menores contribuições.
Cálculo do Percentual: Determine o número total de contribuições válidas (o número de linhas da tabela de salários) e calcule 20% desse valor, arredondando para o número inteiro mais próximo.
Identificação: Ordene a tabela de salários com base nos "Valores Corrigidos", do menor para o maior, e identifique o número de contribuições correspondente aos 20% menores.
Apresentação: Crie uma nova seção no relatório chamada "Análise das 20% Menores Contribuições". Nesta seção, apresente uma tabela que liste claramente as contribuições identificadas (por exemplo, com as colunas Ordem, Mês/Ano e Valor Corrigido).
 
#### 6.2. Cálculo do Salário-de-Benefício (Art. 29, Lei 8.213/91)
Após a seção 6, crie a subseção "6.1. CÁLCULO DO SALÁRIO-DE-BENEFÍCIO CONFORME ART. 29, DA LEI 8.213/91 – FATOS GERADORES ATÉ 13/11/2019".
Nesta subseção, explique que o cálculo se refere à regra anterior à Reforma da Previdência.
Em seguida, crie uma tabela e realize o seguinte cálculo:
1.  **Período Básico de Cálculo (PBC):** Considere apenas as contribuições de Julho de 1994 até Outubro de 2019.
2.  **Total de Contribuições no PBC:** Conte o número total de meses com remuneração dentro deste período.
3.  **80% Maiores Salários:** Calcule 80% do total de contribuições encontradas no passo anterior (arredonde para o inteiro mais próximo).
4.  **Soma:** Ordene os salários corrigidos do PBC do maior para o menor e some a quantidade correspondente aos 80% calculados.
5.  **Média:** Divida a soma obtida pelo número de contribuições utilizadas (o valor de 80%).
6.  **Apresentação:** Apresente todos esses dados em uma tabela clara com o resultado final nomeado "Salário-de-Benefício (SB) Resultante (Regra Antiga)".
 
Formatação Final
 
O documento de saída deve ser um único arquivo Markdown.
 
Utilize a formatação de tabelas do Markdown (| Cabeçalho |).
 
Inclua todos os títulos, subtítulos, notas de rodapé e legendas exatamente como no documento de referência.
 
Todo o texto (cabeçalhos, observações, etc.) deve estar em português.

Forneça apenas o relatório, sem incluir explicações adicionais, comentários e variáveis.

--- 

Para a seção "6.2. Cálculo do Salário-de-Benefício (Regra Antiga)":

Calcule o valor final do benefício.

Primeiro, o cálculo se baseia nas regras que valiam antes da Reforma da Previdência de 2019.

O processo começa juntando todos os seus salários de contribuição a partir de julho de 1994.

Depois, cada um desses salários é corrigido monetariamente. Isso significa que o valor de cada salário antigo é atualizado para o valor de hoje, para compensar a inflação.

A etapa mais importante vem agora: o sistema identifica quais são os 20% menores salários de toda essa lista e os descarta. Eles simplesmente não são usados na conta.

Em seguida, calcula-se a média usando apenas os 80% maiores salários que restaram. A soma desses salários maiores é dividida pela quantidade de meses correspondente. O resultado dessa média é o "Salário-de-Benefício".

Por fim, para chegar ao valor final do benefício, esse "Salário-de-Benefício" ainda é multiplicado pelo Fator Previdenciário, que é um índice que leva em conta a sua idade, tempo de contribuição e expectativa de vida.
        `,
        promptFiles: files,
        systemInstruction: systemInstructionFileBuffer,
      }),
    );
  }

  public async getCnisSimplifiedAnalysis(
    files: Buffer[],
  ): Promise<string | null> {
    const prompt = `
      FAÇA AGORA UMA MENSAGEM DIDÁTICA PARA EXPLICAR AO CLIENTE O RESULTADO DA ANÁLISE. DEVE SER EXPLICADO PRINCIPALMENTE: A) AS PENDENCIAS ENCONTRADAS NO CNIS E COMO EU COMO ADVOGADO DELA PODEREI RESOLVER; B) O TEMPO COM PENDENCIAS E SEM PENDENCIAS; C) A ANALISE DO DIREITO ÀS APOSENTADORIAS; D) A DATA MAIS PROXIMA PARA SE APOSENTAR SE AS PENDENCIAS FOREM RESOLVIDAS; E) O VALOR ESTIMADO DA APOSENTADORIA, CONSIDERANDO AS REGRAS DE CALCULO APLICAVEIS A RESPECTIVAS ESPECIE.
      Forneça apenas o relatório, sem incluir explicações adicionais, comentários e variáveis
      `;

    return await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
      GenerateResponseInputModel.build({
        prompt,
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingQuickDocumentAnalysis(
    files: Buffer[],
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
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingCompleteAnalysis(
    files: Buffer[],
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
        promptFiles: files,
      }),
    );
  }

  public async getLegalPleadingSimplifiedAnalysis(
    files: Buffer[],
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
        promptFiles: files,
      }),
    );
  }

  private async getFileBuffersFromDirectory(
    directoryPath: string,
  ): Promise<Buffer<ArrayBufferLike>[]> {
    try {
      const filenames = await readdir(directoryPath);

      const filePromises = filenames.map(async (filename) => {
        const filePath = join(directoryPath, filename);

        const buffer = await readFile(filePath);

        return buffer;
      });

      const filesWithBuffers = await Promise.all(filePromises);

      return filesWithBuffers;
    } catch {
      return [];
    }
  }
}
