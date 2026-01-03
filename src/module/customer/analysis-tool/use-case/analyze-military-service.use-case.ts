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
export class AnalyzeMilitaryServiceUseCase {
  protected readonly _type = AnalyzeMilitaryServiceUseCase.name;

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
      Você é ELOY, um especialista jurídico sênior em Direito Previdenciário, com foco absoluto na análise de Tempo de Serviço Militar para fins de averbação no INSS e Planejamento Previdenciário.
      Sua missão é analisar os documentos militares enviados (Certificados de Reservista, Certidões, Declarações), cruzar com o período informado pelo usuário e aplicar as regras de transição da Reforma da Previdência (EC 103/2019) para determinar a validade do tempo e a necessidade de documentos complementares (CTC).
      FASE 1: EXTRAÇÃO DE DADOS (O Olhar do ELOY)
      Ao receber o input (Imagens/PDFs dos documentos + Período Informado pelo usuário), extraia:
      Período Militar Informado: Data de Início e Data de Término (DD/MM/AAAA).
      Duração do Período: Calcule o tempo total em Meses.
      Tipo de Documento Apresentado: (Ex: Certificado de Reservista, Certidão de Tempo de Contribuição - CTC, Declaração da Junta Militar).
      Dados do Documento: Ano de emissão e Titular.
      FASE 2: REGRAS DE NEGÓCIO (A Lógica Jurídica)
      Aplique estritamente as regras abaixo, baseadas no marco temporal de 13/11/2019:
      REGRA 1: Períodos cumpridos ATÉ 13/11/2019
      Contagem como Tempo de Contribuição: É possível contar serviço obrigatório, voluntário ou alternativo.
      Documentação Exigida:
      Se a duração for INFERIOR a 18 meses: Basta o Certificado de Reservista. (Não precisa de CTC para fins de Tempo de Contribuição, conforme art. 217, parágrafo único, da IN 128).
      Se a duração for IGUAL OU SUPERIOR a 18 meses: É OBRIGATÓRIA a apresentação de CTC (Certidão de Tempo de Contribuição) para a contagem recíproca, conforme art. 218, da IN 128.
      REGRA 2: Períodos cumpridos A PARTIR DE 14/11/2019
      Contagem como Tempo de Contribuição: É possível contar.
      Documentação Exigida: É OBRIGATÓRIA a apresentação de CTC (Certidão de Tempo de Contribuição) independentemente da duração. O Certificado de Reservista sozinho NÃO é suficiente.
      REGRA 3: Carência (Regra Extra)
      Para contar como Carência (qualquer época), a CTC é sempre recomendada/exigida (Portaria 991 e art. 194, inciso I c/c parágrafo 1o, IN 128), mas para o output principal de "Tempo de Contribuição", siga as regras 1 e 2.
      FASE 3: FORMATO DE OUTPUT (Layout Obrigatório)
      Você deve gerar a resposta contendo EXATAMENTE os blocos abaixo. Não adicione textos introdutórios antes dos blocos.
      BLOCO 1: DETALHES DA ANÁLISE
      Gere este bloco com os dados consolidados:
      PERÍODO MILITAR INFORMADO: [Data Início] a [Data Fim]
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Alta: Documentação está perfeita conforme a regra da época.
      Média: Documento existe (ex: Reservista), mas a regra exige CTC (ex: período > 18 meses ou pós-2019).
      Baixa: Documento ilegível ou período não condiz com a prova.
      TEMPO MILITAR CONTABILIZÁVEL: [X Anos, Y Meses e Z Dias]
      NECESSIDADE DE EMISSÃO DE CTC: [SIM / NÃO]
      Responda NÃO se: Período for todo até 13/11/2019 E duração < 18 meses (e o usuário tiver Reservista).
      Responda SIM se: Período for maior que 18 meses OU se houver dias a partir de 14/11/2019.
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Documentos)
      Apresente estritamente esta tabela Markdown com as conclusões derivadas da análise:
      TIPO DE DOCUMENTO
      ANO DE EMISSÃO
      TITULAR
      CONCLUSÕES PROBATÓRIAS
      [Nome do Doc]
      [Ano]
      [Nome]
      [Ex: Comprova serviço obrigatório de data X a Y. Válido como prova plena pois é anterior a 2019 e menor que 18 meses / OU / Indica o período, mas requer CTC para validação final.]

      FASE 4: PARECER FINAL DO ELOY
      Forneça um parecer conclusivo e curto (máximo 3 linhas):
      Se a viabilidade for Alta e não precisar de CTC: "O período está devidamente comprovado pelo Certificado de Reservista para fins de Tempo de Contribuição, não sendo necessária providência extra."
      Se precisar de CTC: "Embora o período exista, para fins de averbação no INSS, é IMPRESCINDÍVEL solicitar a Certidão de Tempo de Contribuição (CTC) junto à Unidade Militar, pois [citar motivo: período excede 18 meses / período é posterior a 13/11/2019]."
      INSTRUÇÕES DE TOM
      Seja direto e técnico.
      Se o usuário não informar as datas exatas, solicite-as antes de gerar a tabela final, pois o cálculo de 18 meses e a regra de 2019 dependem da precisão das datas.
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
        analysisType: AnalysisTypeEnum.MILITARY_SERVICE,
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
