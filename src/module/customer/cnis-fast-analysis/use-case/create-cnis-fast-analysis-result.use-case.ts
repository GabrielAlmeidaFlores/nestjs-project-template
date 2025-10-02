import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { CnisFastAnalysisResultCommandRepositoryGateway } from '@module/customer/cnis-fast-analysis/domain/repository/cnis-fast-analysis-result/command/cnis-fast-analysis-result.command.repository.gateway';
import { CnisFastAnalysisEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CreateCnisFastAnalysisResultResponseDto } from '@module/customer/cnis-fast-analysis/dto/response/create-cnis-fast-analysis-result.response.dto';
import { CnisDocumentRequiredError } from '@module/customer/cnis-fast-analysis/error/cnis-document-required.error';
import { CnisFastAnalysisNotFoundError } from '@module/customer/cnis-fast-analysis/error/cnis-fast-analysis-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/cnis-fast-analysis/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/cnis-fast-analysis/lib/file-processor/file-processor.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateCnisFastAnalysisResultUseCase {
  protected readonly _type = CreateCnisFastAnalysisResultUseCase.name;

  public constructor(
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(CnisFastAnalysisResultCommandRepositoryGateway)
    private readonly cnisFastAnalysisResultCommandRepositoryGateway: CnisFastAnalysisResultCommandRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<CreateCnisFastAnalysisResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisQueryResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByIdWithRelationsOrFail(
        cnisFastAnalysisId,
        CnisFastAnalysisNotFoundError,
      );

    if (cnisFastAnalysisQueryResult.cnisDocument === null) {
      throw new CnisDocumentRequiredError();
    }

    const clientDataBuffer = Buffer.from(
      JSON.stringify(cnisFastAnalysisQueryResult.cnisFastAnalysisClient),
      'utf-8',
    );
    const cnisDocumentBuffer =
      await this.fileProcessorGateway.getCnisDocumentBuffer(
        cnisFastAnalysisQueryResult.cnisDocument,
      );
    const cnisDocumentData =
      await this.fileProcessorGateway.parseCnisDocument(cnisDocumentBuffer);

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

    const cnisAiAnalysis =
      await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        generativeIaPrompt,
        [clientDataBuffer, cnisDocumentBuffer],
      );

    let clientLastAffiliationDate: Date | null = null;

    cnisDocumentData.socialSecurityRelations?.forEach(
      (socialSecurityRelation) => {
        if (
          socialSecurityRelation.socialSecurityAffiliationInfo.dataFim ===
          undefined
        ) {
          return;
        }

        if (clientLastAffiliationDate === null) {
          clientLastAffiliationDate =
            socialSecurityRelation.socialSecurityAffiliationInfo.dataFim ??
            null;
          return;
        }

        if (
          socialSecurityRelation.socialSecurityAffiliationInfo.dataFim >
          clientLastAffiliationDate
        ) {
          clientLastAffiliationDate =
            socialSecurityRelation.socialSecurityAffiliationInfo.dataFim;
        }
      },
    );

    const cnisFastAnalysisResult = new CnisFastAnalysisResultEntity({
      clientLastAffiliationDate,
      cnisAiAnalysis,
      clientBirthDate:
        cnisDocumentData.affiliateIdentification?.dataDeNascimento ?? null,
      clientName: cnisDocumentData.affiliateIdentification?.nome ?? null,
      clientFederalDocument:
        cnisDocumentData.affiliateIdentification?.cpf !== undefined
          ? new FederalDocument(cnisDocumentData.affiliateIdentification.cpf)
          : null,
    });

    const cnisFastAnalysisClient = new CnisFastAnalysisClientEntity({
      ...cnisFastAnalysisQueryResult.cnisFastAnalysisClient,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      ...cnisFastAnalysisQueryResult,
      cnisFastAnalysisClient,
      cnisFastAnalysisResult,
      cnisDocument: cnisFastAnalysisQueryResult.cnisDocument,
      createdBy: cnisFastAnalysisQueryResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const createCnisFastAnalysisResultTransaction =
      this.cnisFastAnalysisResultCommandRepositoryGateway.createCnisFastAnalysisResult(
        cnisFastAnalysisResult,
      );
    const updateCnisFastAnalysisTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis(
        cnisFastAnalysis.id,
        cnisFastAnalysis,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      createCnisFastAnalysisResultTransaction,
      updateCnisFastAnalysisTransaction,
    ]);
    await transaction.commit();

    const response = CreateCnisFastAnalysisResultResponseDto.build({});

    if (cnisFastAnalysisResult.clientName !== null) {
      response.clientName = cnisFastAnalysisResult.clientName;
    }

    if (cnisFastAnalysisResult.clientFederalDocument !== null) {
      response.clientFederalDocument =
        cnisFastAnalysisResult.clientFederalDocument;
    }

    if (cnisFastAnalysisResult.clientBirthDate !== null) {
      response.clientBirthDate = cnisFastAnalysisResult.clientBirthDate;
    }

    if (cnisFastAnalysisResult.clientLastAffiliationDate !== null) {
      response.clientLastAffiliationDate =
        cnisFastAnalysisResult.clientLastAffiliationDate;
    }

    if (cnisFastAnalysisResult.cnisAiAnalysis !== null) {
      response.cnisAiAnalysis = cnisFastAnalysisResult.cnisAiAnalysis;
    }

    return response;
  }
}
