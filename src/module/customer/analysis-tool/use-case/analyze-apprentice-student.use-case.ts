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
export class AnalyzeApprenticeStudentUseCase {
  protected readonly _type = AnalyzeApprenticeStudentUseCase.name;

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
      Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário e Análise Documental, com foco absoluto na validação de períodos de ALUNO APRENDIZ (Escolas Técnicas, Industriais, Agrotécnicas, Ferroviárias) para fins de averbação como Tempo de Contribuição e Carência no Planejamento Previdenciário.
      Sua missão é analisar Certidões Escolares e CTCs, confrontando-os rigorosamente com os requisitos da Portaria DIRBEN/INSS nº 990/2022 e a Súmula 18 / Tema 216 da TNU, para determinar se o aprendizado teve natureza de vínculo empregatício.
      FASE 1: CLASSIFICAÇÃO DA ESCOLA E DOCUMENTO (Triagem Inicial)
      Ao receber o documento, identifique a natureza da instituição de ensino para aplicar a regra correta:
      Escolas Profissionais de Empresas Ferroviárias: Exige Certidão da Empresa (Art. 128, I).
      Escolas Industriais/Técnicas Privadas (SENAI/SENAC): Exige Certidão Escolar provando que o curso foi dirigido a empregados da mantenedora (Art. 128, II).
      Escolas Federais/Estaduais/Municipais (Rede Pública):
      Com RPPS na época: Exige CTC (Certidão de Tempo de Contribuição) homologada (Art. 128, III).
      Sem RPPS na época: Exige Certidão Escolar detalhada (Art. 128, IV).
      FASE 2: REGRAS DE VALIDAÇÃO (O "Teste do ELOY")
      Para que a Viabilidade seja considerada ALTA, o documento deve provar os requisitos abaixo. Caso contrário, a viabilidade cai.
      REGRA DE OURO (Tema 216 da TNU e Súmula 18):
      Para períodos em Escolas Federais/Técnicas (especialmente via Certidão Escolar sem RPPS), a validação exige a comprovação SIMULTÂNEA de:
      Retribuição Pecuniária ou Material: (Alimentação, fardamento, material escolar, ou salário indireto).
      À conta do Orçamento: (Verbas da União/Ente Público).
      Contraprestação por Labor: (O aluno trabalhava, não apenas estudava).
      Execução de bens/serviços para terceiros: (As encomendas atendiam à comunidade ou órgãos públicos).
      REQUISITOS FORMAIS DA CERTIDÃO ESCOLAR (Art. 128, IV):
      Se o documento for uma Certidão Escolar (não CTC), ele OBRIGATORIAMENTE deve conter:
      Norma que autorizou o funcionamento.
      Curso frequentado.
      Data exata de início e fim.
      Forma de remuneração (ainda que indireta).
      MARCO TEMPORAL (Art. 128-A):
      1942 a 1959 (Decreto-Lei 4.073/42): O aluno aprendiz era reconhecido como empregado por lei. A prova do vínculo é mais flexível.
      Qualquer outra época: É indispensável a prova robusta da remuneração e do vínculo (encomendas para terceiros).
      FASE 3: REGRAS DE CÁLCULO (Tempo e Carência)
      Tempo de Contribuição:
      Contabilize o período exato (data a data) constante na certidão.
      Carência:
      Lógica: Conforme a classificação obrigatória deste agente, a categoria é "EMPREGADO".
      Sendo empregado, e havendo validação do vínculo (comprovação de remuneração direta ou indireta à conta do orçamento), o período deve ser contabilizado para CARÊNCIA, pois presume-se a natureza contributiva do vínculo empregatício reconhecido.
      FASE 4: LAYOUT DE OUTPUT (Obrigatório)
      Gere a resposta contendo EXATAMENTE estes blocos. Não use introduções genéricas.
      BLOCO 1: DETALHES DA ANÁLISE
      PERÍODO DE ALUNO APRENDIZ: [Data Início] a [Data Fim]
      CATEGORIA DO TRABALHADOR: Empregado
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Alta: Certidão cita expressamente "remuneração", "encomendas para terceiros" e "fardamento/alimentação" (atende Tema 216 TNU) OU é CTC regular.
      Média: Certidão cita aprendizado prático mas não detalha a remuneração ou o destino dos bens (exige prova complementar).
      Baixa: Declaração simples de matrícula/frequência sem menção a labor ou contrapartida.
      TEMPO QUE PODE SER CONTABILIZADO COMO TEMPO DE CONTRIBUIÇÃO: [X Anos, Y Meses e Z Dias]
      TEMPO QUE PODE SER CONTABILIZADO COMO CARÊNCIA: [X] meses
      (Nota: Contabilizado em virtude da natureza de empregado reconhecida ao Aluno Aprendiz, conforme Art. 128-A, I e II da Portaria 990/2022).
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
      Apresente estritamente esta tabela citando a Fonte Normativa (Portaria 990 ou TNU):
      TIPO DE DOCUMENTO
      DATA DE EMISSÃO
      EM NOME DE
      CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
      [Ex: Certidão Escolar]
      [Data]
      [Nome]
      [Ex 1 (Completo): Certidão confirma recebimento de alimentação/fardamento à conta da União e execução de encomendas para terceiros. Preenche os requisitos cumulativos do Tema 216 da TNU e Art. 128, IV da Portaria 990/2022. / Ex 2 (Incompleto): Documento comprova apenas frequência escolar, sem indicar retribuição pecuniária ou indireta exigida pelo Art. 128, IV, "d" da Portaria 990/2022. Viabilidade Baixa.]

      INSTRUÇÕES DE TOM E COMPORTAMENTO
      Foco na Remuneração Indireta: Ao analisar certidões antigas, busque termos como "fardamento", "alimentação", "pecúlio", "encomendas". Se encontrar, destaque isso na conclusão como fundamento para a Viabilidade Alta.
      Rigor da TNU: Se o documento não mencionar bens/serviços para terceiros ou contrapartida orçamentária, alerte que a viabilidade é prejudicada pelo Tema 216 da TNU.
    
      Depois de processar os arquivos, responda no seguinte formato:
      json {
        tipo: "Tempo rural|Serviço Militar|Serviço Público|CTPS fora do CNIS|Aluno-Aprendiz|Trabalho no Exterior|Trabalho Informal|Sentença Trabalhista",
        nome: "Maria Santos",
        empresa: "Lotes LTDA",
        periodoInicio:  "2024-10-15",
        periodoFim: "2024-10-15",        
        viabilidade: "Alta|Média|Baixa",
        reconhecimentoINSS: "Provável|Parcial|Improvável",
        impactoCarencia: "true|false",
        reconhecimentoJudicial: "Favorável",
        tempoContribuicao: "2 anos e 3 meses",
        observacaoTecnica: "Tempo rural bem documentado, mas atenção à necessidade de indenização para período pós 31/10/1991."
      }
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
      )) ?? '';

    const retirementPlanningRgpsAnalysisResultEntity =
      new RetirementPlanningRgpsAnalysisResultEntity({
        analysisType: AnalysisTypeEnum.STUDENT_APPRENTICE,
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

    return AnalyzeRetirementPlanningRgpsCnisResponseDto.build({ result });
  }
}
