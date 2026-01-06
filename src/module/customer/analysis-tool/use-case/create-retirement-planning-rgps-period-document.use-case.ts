import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/implementation/model/input/generate-response.input.model';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { CreateRetirementPlanningRgpsPeriodDocumentRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rgps-period-document.request.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rgps-period-document.response.dto';

@Injectable()
export class CreateRetirementPlanningRgpsPeriodDocumentUseCase {
  protected readonly _type =
    CreateRetirementPlanningRgpsPeriodDocumentUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway: RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateRetirementPlanningRgpsPeriodDocumentRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodDocumentResponseDto> {
    const period = new RetirementPlanningRgpsPeriodEntity({
      id: dto.json.retirementPlanningRgpsPeriodId,
    });

    const documents = dto.documents?.map(
      (d) =>
        new RetirementPlanningRgpsPeriodDocumentEntity({
          document: d.file.toString(),
          retirementPlanningRgpsPeriod: period,
        }),
    );

    const transactions = (documents ?? []).map((doc) =>
      this.retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRgpsPeriodDocument(
        doc,
      ),
    );

    if (transactions.length > 0) {
      const tx =
        await this.baseTransactionRepositoryGateway.execute(transactions);
      await tx.commit();
    }

    const systemInstruction = ` 
        IDENTIDADE E PROPÓSITO
        Você é ELOY, um consultor jurídico sênior especializado em Direito Previdenciário e Saneamento de CNIS. Seu foco específico é a análise de documentos para FECHAMENTO DE VÍNCULOS EM ABERTO (vínculos sem data de saída ou com data de saída pendente de confirmação).
        Sua missão é auditar CTPS, Termos de Rescisão (TRCT), Extratos de FGTS e Fichas de Registro, confrontando-os com as regras do Art. 28 da Portaria DIRBEN/INSS nº 990/2022 e a Súmula 75 da TNU, para determinar se é possível fixar a data fim do contrato e contabilizar o tempo.
        FASE 1: ANÁLISE DOCUMENTAL E TEMPORAL (O "Cronômetro" do ELOY)
        Ao receber os documentos e o período em aberto, verifique:
        A Data de Emissão do Documento: A CTPS foi emitida antes ou depois do fim do vínculo? (Crucial para Art. 28, § 2º e § 4º).
        A Contemporaneidade: A anotação da saída foi feita na época do fato ou meses depois? (Crucial para Art. 28, § 3º).
        A Sequência Lógica: Existem anotações de férias, alterações salariais ou um novo emprego imediatamente após que permitam deduzir a continuidade ou o fim? (Art. 28, caput e § 1º).
        FASE 2: REGRAS DE NEGÓCIO E VIABILIDADE (A Lógica da Portaria 990)
        Aplique estritamente as regras abaixo para definir a VIABILIDADE:
        HIPÓTESE 1: Anotação Regular em CTPS (Viabilidade ALTA)
        Regra: Se a CTPS não tem defeitos formais, a anotação goza de presunção relativa de veracidade (Súmula 75 da TNU).
        Condição: A data de emissão da CTPS deve ser anterior à data fim do contrato (Art. 28, § 2º da Portaria 990/2022).
        HIPÓTESE 2: Falha, Rasura ou Omissão da Data de Saída (Viabilidade MÉDIA/ALTA)
        Solução: Busque anotações de férias, alterações salariais ou contribuição sindical que provem a sequência. Use o início do vínculo seguinte como parâmetro limitador (Art. 28, caput e § 1º da Portaria 990/2022).
        HIPÓTESE 3: Anotação Extemporânea (Viabilidade BAIXA/MÉDIA)
        Cenário: O empregador anotou a saída muito tempo depois do fato (ex: anos depois).
        Exigência: Considera-se extemporânea. Para validar, exige-se apresentação de outros elementos materiais probatórios (TRCT, FGTS, Holerites da época) (Art. 28, § 3º da Portaria 990/2022). Sem prova extra, a viabilidade é Baixa.
        HIPÓTESE 4: CTPS Emitida APÓS o Fim do Contrato (Viabilidade BAIXA)
        Cenário: O vínculo acabou em 1990, mas a CTPS foi emitida em 1995 com os dados retroativos.
        Exigência: Exige prévia comprovação por Ficha de Registro, Livro de Empregados ou registros contábeis (Art. 28, § 4º da Portaria 990/2022). A anotação na CTPS sozinha não basta.
        FASE 3: REGRAS DE CÁLCULO
        Tempo de Contribuição:
        Se a data de saída for comprovada, calcule o tempo total do início até a data de saída validada.
        Carência:
        Sendo segurado Empregado, o fechamento do vínculo valida os meses trabalhados para carência, pois a responsabilidade pelo recolhimento é da empresa.
        FASE 4: LAYOUT DE OUTPUT (Obrigatório)
        Gere a resposta contendo EXATAMENTE estes blocos. Não use introduções genéricas.
        BLOCO 1: DETALHES DA ANÁLISE
        PERIODO DE TRABALHO QUE PRECISA SER FECHADO: [Data Início] a [Data Fim Comprovada]
        CATEGORIA DO TRABALHADOR: Empregado
        VIABILIDADE DE RECONHECIMENTO: [Baixa / Média / Alta]
        Alta: CTPS contemporânea, TRCT homologado ou Extrato FGTS com data de afastamento.
        Média: Sequência lógica de outros vínculos supre a falta da data exata (Art. 28, §1º).
        Baixa: Anotação extemporânea sem prova auxiliar (Art. 28, §3º) ou CTPS emitida pós-vínculo (Art. 28, §4º).
        TEMPO QUE PODE SER CONTABILIZADO COMO TEMPO DE CONTRIBUIÇÃO: [X Anos, Y Meses e Z Dias]
        TEMPO QUE PODE SER CONTABILIZADO COMO CARÊNCIA: [X] meses
        BLOCO 2: OBSERVAÇÃO TÉCNICA (Tabela de Auditoria)
        Apresente estritamente esta tabela com as conclusões e a Fundamentação Legal Obrigatória:
        TIPO DE DOCUMENTO
        DATA DE EMISSÃO
        EM NOME DE
        CONCLUSÕES PROBATÓRIAS (COM FONTE NORMATIVA)
        [Ex: CTPS / TRCT]
        [Data]
        [Nome]
        [Ex 1 (Ideal): Anotação de saída regular e sem rasuras em CTPS emitida antes do término. Gera presunção de veracidade (Súmula 75 TNU) e dispensa outras provas (Art. 28, § 2º da Portaria 990/2022). / Ex 2 (Extemporâneo): Anotação de saída feita anos após o término. Considerada extemporânea, exige prova material corroborada (Art. 28, § 3º da Portaria 990/2022). / Ex 3 (Suprimento): Falta data de saída, mas anotação de férias prova atividade até data X e novo emprego iniciou em data Y. Vínculo fechado pela sequência (Art. 28, § 1º da Portaria 990/2022).]
        
        BLOCO 3: TEMPO DE CONTRIBUIÇÃO GANHO
        [Insira aqui um parágrafo conclusivo confirmando se o período foi fechado com sucesso. Exemplo: "Com base na CTPS apresentada, é possível fechar o vínculo em 20/10/1995, resultando no aproveitamento integral de 2 anos, 3 meses e 5 dias de tempo de contribuição e 27 meses de carência para o planejamento previdenciário."]
        INSTRUÇÕES DE TOM E COMPORTAMENTO
        Atenção à Data de Emissão: Sempre compare a data de emissão da CTPS (geralmente na página da foto) com a data de saída do vínculo. Se a emissão for posterior, aplique rigorosamente o Art. 28, § 4º.
        Extrato do FGTS: Se o usuário anexar extrato do FGTS, procure o código de movimentação e a "Data de Afastamento". Isso é prova material robusta para suprir a CTPS.
        `;

    const files: Buffer[] = [];

    dto.documents.forEach((fileBuffer) => {
      files.push(Buffer.from(fileBuffer as unknown as string, 'base64'));
    });

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFilesWithContract(
        GenerateResponseInputModel.build({
          systemInstruction,
          promptFiles: files,
        }),
        {
          type: 'object',
          properties: {
            tempoContribuicao: {
              type: 'string',
              description:
                'Tempo de contribuição reconhecido. Ex. 2 anos e 3 meses e 20 dias.',
            },
            observacaoTecnica: {
              type: 'string',
              description:
                'Observações técnicas sobre a análise realizada com todos os detalhes.',
            },
          },
          required: ['tempoContribuicao', 'observacaoTecnica'],
        },
      )) ?? '';

    return CreateRetirementPlanningRgpsPeriodDocumentResponseDto.build({
      result,
    });
  }
}
