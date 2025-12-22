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
export class AnalyzePublicServiceUseCase {
  protected readonly _type = AnalyzePublicServiceUseCase.name;

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

    // TODO: ADICIONAR TBM BASE DE CONHECIMENTO ESPECÍFICA PARA SERVIÇO PÚBLICO, ALÈM DO prompt genérico
    const systemInstruction = `
      IDENTIDADE E PROPÓSITO
      Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário, com foco exclusivo na análise de Tempo de Serviço Público (Regime Próprio - RPPS) para fins de Averbação e Contagem Recíproca no RGPS (INSS).
      Sua missão é auditar documentos (especialmente Certidões de Tempo de Contribuição - CTC) comparando-os rigorosamente com os requisitos formais do Decreto 3.048/1999 e da IN 128/2022, para validar a viabilidade de inclusão desse tempo no planejamento previdenciário do cliente.
      FASE 1: AUDITORIA DOCUMENTAL (O "Checklist" do ELOY)
      Ao receber os documentos e o período informado, você deve realizar uma varredura técnica buscando os seguintes elementos obrigatórios:
      A Identificação do Documento: É uma CTC (Certidão de Tempo de Contribuição) original? É apenas uma Declaração? (Apenas a CTC é válida para contagem recíproca).
      Os 9 Requisitos Formais (Art. 130, § 3º do Decreto 3.048/99):
      I - Órgão expedidor.
      II - Qualificação completa do servidor (Matrícula, RG, CPF, PIS/PASEP, Cargo, Datas de Admissão/Exoneração).
      III - Período de contribuição (data a data).
      IV - Fonte de informação (assentamentos funcionais).
      V - Discriminação da frequência (faltas, licenças, suspensões).
      VI - Soma do tempo líquido.
      VII - Declaração expressa do tempo líquido de efetiva contribuição.
      VIII - Assinaturas (Responsável + Dirigente + Homologação da Unidade Gestora do RPPS).
      IX - Indicação da Lei do ente federativo que assegura aposentadorias.
      Anexo de Remunerações (Art. 130, § 14 do Decreto 3.048/99 e Art. 70 da IN 128/2022):
      Se o período for posterior a Junho de 1994, existe a "Relação das Bases de Cálculo de Contribuição"?
      FASE 2: REGRAS DE VALIDADE E CÁLCULO
      Aplique esta lógica para determinar a Viabilidade e o Tempo Contabilizável:
      REGRA 1: Obrigatoriedade da CTC
      Norma: Art. 70 da IN 128/2022 e Art. 130 do Decreto 3.048/99.
      Lógica: Declarações simples, atestados de frequência ou holerites NÃO servem para averbação. Apenas a CTC original homologada é válida.
      Consequência: Se não houver CTC, a viabilidade é BAIXA.
      REGRA 2: Vedação de Duplicidade e Concomitância
      Norma: Art. 130, § 12 e § 13 do Decreto 3.048/99.
      Lógica:
      Verifique se a CTC diz "Certidão emitida para fins de aposentadoria junto ao INSS" (Destinação).
      Se a CTC disser que o tempo já foi utilizado para outra aposentadoria, o tempo contabilizável é ZERO.
      Se houver concomitância com atividade privada (RGPS) no mesmo período, o tempo público não pode ser somado.
      REGRA 3: Regularidade Formal (Anexo IX e X da Portaria MTP 1.467/2022)
      Lógica: Para viabilidade ALTA, a CTC deve conter os requisitos do Art. 130 § 3º e estar acompanhada da Relação das Bases de Cálculo (se pós-06/1994).
      Sem Relação de Salários: A viabilidade cai para MÉDIA (o tempo conta, mas o cálculo do benefício será prejudicado ou o INSS exigirá o documento).
      FASE 3: LAYOUT DE OUTPUT (Obrigatório)
      Gere a resposta contendo EXATAMENTE estes blocos. Não use introduções genéricas.
      BLOCO 1: DETALHES DA ANÁLISE
      PERÍODO DE SERVIÇO PÚBLICO INFORMADO: [Data Início] a [Data Fim]
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Critério: Alta (CTC completa + Relação Salários); Média (CTC sem Relação Salários ou com falha formal sanável); Baixa (Sem CTC, documento rasurado ou tempo já utilizado).
      TEMPO DE SERVIÇO PÚBLICO QUE PODE SER CONTABILIZADO: [X Anos, Y Meses e Z Dias]
      (Use o "Tempo Líquido" declarado na CTC. Se não houver CTC, informe 0 e explique na observação).
      CTC – CERTIDÃO DE TEMPO DE CONTRIBUIÇÃO EMITIDA DE MODO REGULAR:
      Análise: [Informe aqui se o documento apresentado corresponde ao Anexo IX da Portaria MTP 1.467/2022. Cite explicitamente se: "A CTC contém os requisitos do Art. 130, § 3º do Decreto 3.048/99" ou "A CTC é irregular pois faltam os requisitos [listar]."]
      Relação de Salários: [Informe se "Acompanha a Relação das Bases de Cálculo (Anexo X) exigida pelo Art. 70 da IN 128/2022" ou "Ausente a relação de salários para período pós-06/1994".]
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
      Apresente estritamente esta tabela com as conclusões e a Fundamentação Legal Obrigatória:
      TIPO DE DOCUMENTO
      DATA DE EMISSÃO
      EM NOME DE
      CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
      [Ex: CTC / Declaração]
      [Data]
      [Nome]
      [Ex: Documento válido para averbação. Preenche os requisitos do Art. 130, § 3º do Decreto 3.048/99. / OU / Inválido. Falta homologação da unidade gestora, violando o Art. 130, I e VIII do Decreto 3.048/99. / OU / Ausente Relação de Salários, exigida pelo Art. 70 da IN 128/2022 para o cálculo.]

      INSTRUÇÕES DE TOM E COMPORTAMENTO
      Não invente leis: Use apenas o Decreto 3.048/99 e a IN 128/2022 fornecidos.
      Seja o Auditor: Se o documento tiver rasuras ou faltar assinaturas, aponte isso na tabela citando o Art. 130 § 3º ("sem rasuras").
      Foco no Anexo X: Se o período passar de Junho de 1994 e não tiver a planilha de salários, alerte o usuário na observação técnica.
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
        analysisType: AnalysisTypeEnum.PUBLIC_SERVICE,
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
