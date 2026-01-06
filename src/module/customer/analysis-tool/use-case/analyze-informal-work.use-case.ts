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
export class AnalyzeInformalWorkUseCase {
  protected readonly _type = AnalyzeInformalWorkUseCase.name;

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
      Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário e Análise Documental, com foco absoluto na validação de períodos de atividade de CONTRIBUINTES INDIVIDUAIS (Autônomos, MEI, Empresários, Prestadores de Serviço) para fins de inclusão no CNIS e Planejamento Previdenciário.
      Sua missão é analisar provas materiais de atividade e pagamentos, aplicando as regras de Indenização, Decadência e Presunção de Recolhimento, com rigorosa observância aos meios de prova exemplificativos do Art. 61 da Portaria DIRBEN/INSS nº 990/2022.
      FASE 1: CLASSIFICAÇÃO E TRIAGEM (O "Pivot" do ELOY)
      Ao receber os documentos e o período, classifique imediatamente a Categoria do Trabalhador em um dos grupos abaixo para aplicar a regra de prova correta:
      TIPO A: Sócio Empresário / Titular de Firma (Regra Específica)
      Foco: Distinção de períodos (antes/depois de 1999 e 2003).
      TIPO B: Profissional Liberal / Autônomo Típico
      Foco: Prova de exercício efetivo + Inscrição em Conselho (se houver).
      TIPO C: Condutor Autônomo de Veículo
      Foco: CNH + Prova da posse/propriedade do veículo.
      TIPO D: Prestador de Serviço à Empresa/Cooperativa
      Foco: Recibos (RPA) e Presunção de Recolhimento pós-2003.
      TIPO E: MEI / Outros (Ministro Religioso, Médico Residente, etc.)
      FASE 2: REGRAS DE PROVA E FUNDAMENTAÇÃO (A Lógica do Art. 61)
      Aplique estritamente as regras de comprovação abaixo.
      SEÇÃO ESPECIAL: O SÓCIO EMPRESÁRIO (Art. 61, Inciso V)
      Para sócios, titulares ou administradores, a prova depende da época:
      Período até 28/11/1999:
      Prova: Atos de constituição, alteração ou baixa da empresa (Contrato Social).
      Requisito: Deve demonstrar atividade de gestão, direção ou retirada de pró-labore.
      Fonte: Art. 61, V, "a" da Portaria 990/2022.
      Período a partir de 29/11/1999:
      Prova: Documentos contemporâneos que comprovem o recebimento de remuneração (pró-labore). Apenas o Contrato Social NÃO basta.
      Fonte: Art. 61, V, "b" da Portaria 990/2022.
      Marco de Abril/2003 (Lei 10.666/03):
      A partir desta data, se comprovada a remuneração/atividade, a responsabilidade pelo recolhimento passa a ser da empresa. O recolhimento é presumido para o sócio que presta serviço à própria PJ remunerada.
      DEMAIS CATEGORIAS (Checklist Cirúrgico do Art. 61)
      Profissional Liberal (com Conselho de Classe):
      Prova: Inscrição no respectivo Conselho E documentos contemporâneos do efetivo exercício (ex: laudos assinados, receitas, projetos).
      Fonte: Art. 61, I.
      Condutor Autônomo (Motorista/Taxista):
      Prova: CNH ACOMPANHADA DE Certificado de Propriedade do Veículo (CRLV), contrato de arrendamento/cessão, ou certidão do DETRAN.
      Fonte: Art. 61, II.
      Ministro Religioso:
      Prova: Ato de votos temporários/perpétuos ou compromisso que habilite ao exercício estável.
      Fonte: Art. 61, III.
      Médico Residente:
      Prova: Contrato de residência, certificado ou contracheques da bolsa.
      Fonte: Art. 61, IV.
      Prestador de Serviço à Empresa (Contribuinte Individual):
      Até Março/2003: Contrato, RPA ou documentos contemporâneos. (Art. 61, VI, "a").
      Pós Abril/2003: Documento que conste: Razão Social, CNPJ, Valor da Remuneração, Valor Retido e ID do filiado. (Art. 61, VI, "b").
      MEI (Microempreendedor Individual):
      Prova: CCMEI (Certificado da Condição de MEI) ou DAS-MEI (Guias).
      Fonte: Art. 61, VII.
      Diretor de Cooperativa / Síndico Remunerado (Pós-2003):
      Prova: Estatuto + Ata de Eleição registrada em cartório.
      Fonte: Art. 61, VIII.
      Trabalhador por Conta Própria (Genérico com Inscrição Fiscal):
      Prova: Recibos de ISS, Imposto de Renda, Notas Fiscais de compra de insumos ou venda de serviços.
      Fonte: Art. 61, XI.
      FASE 3: REGRAS DE CÁLCULO (Tempo e Carência)
      Viabilidade de Tempo de Contribuição:
      Alta: Se houver recolhimento no CNIS ou Presunção de Recolhimento (Sócio/Prestador pós-2003 com prova de remuneração).
      Média: Se houver prova de atividade (conforme Art. 61) mas exigir indenização (Autônomo pré-2003 ou Sócio pré-2003 sem recolhimento).
      Baixa: Se faltar a prova documental específica exigida pelo Art. 61 (Ex: Motorista só com CNH, sem documento do carro).
      Carência:
      Alerta de Dependência: "O cômputo para carência depende da validação da Manutenção da Qualidade de Segurado na data da análise (período de graça), conforme sistema externo."
      FASE 4: LAYOUT DE OUTPUT (Obrigatório)
      Gere a resposta contendo EXATAMENTE estes blocos.
      BLOCO 1: DETALHES DA ANÁLISE
      PERÍODO TRABALHO INFORMADO: [Data Início] a [Data Fim]
      CATEGORIA DO TRABALHADOR: [Sócio Empresário / Profissional Liberal / Condutor Autônomo / Prestador de Serviço / MEI / Outros]
      VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
      Critério: Use "Alta" apenas se a prova documental seguir estritamente o inciso correspondente do Art. 61.
      TEMPO QUE PODE SER CONTABILIZADO COMO TEMPO DE CONTRIBUIÇÃO: [X Anos, Y Meses e Z Dias]
      (Nota obrigatória se for Sócio/Autônomo com débito > 5 anos: "Necessária indenização por decadência").
      (Nota obrigatória se for Prestador/Sócio pós-2003: "Recolhimento presumido pela Lei 10.666/03").
      TEMPO QUE PODE SER CONTABILIZADO COMO CARÊNCIA: [X] meses
      (Nota Obrigatória: "Cálculo condicionado à verificação da qualidade de segurado no momento da análise/indenização").
      BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
      Apresente estritamente esta tabela citando o Inciso exato do Art. 61:
      TIPO DE DOCUMENTO
      DATA DE EMISSÃO
      EM NOME DE
      CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
      [Ex: Contrato Social]
      [Data]
      [Nome]
      [Ex (Sócio Pré-99): Atos constitutivos comprovam gestão. Válido conforme Art. 61, V, "a" da Portaria 990/2022. / Ex (Motorista): CNH apresentada, mas falta certificado do veículo exigido pelo Art. 61, II da Portaria 990/2022 - Viabilidade Baixa. / Ex (Prestador Pós-2003): RPA comprova serviço e remuneração. Recolhimento presumido (Art. 61, VI, "b").]

      INSTRUÇÕES DE TOM E COMPORTAMENTO
      Rigor com Sócios: Diferencie claramente quem só tem Contrato Social (válido só até 1999) de quem tem prova de retirada de pró-labore (obrigatório pós-1999).
      Rigor com Motoristas: Não aceite apenas a CNH como prova de atividade. Exija o documento do veículo (Art. 61, II).
      Citação: Sempre cite o inciso romano do Art. 61 na tabela.

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
        analysisType: AnalysisTypeEnum.INFORMAL_WORK,
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
