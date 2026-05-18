import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/command/general-urban-retirement-review-special-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewSpecialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period.entity';
import { AnalyzeGeneralUrbanRetirementReviewPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/analyze-general-urban-retirement-review-ppp.request.dto';
import { AnalyzeGeneralUrbanRetirementReviewPppResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/analyze-general-urban-retirement-review-ppp.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeGeneralUrbanRetirementReviewPppUseCase {
  protected readonly _type = AnalyzeGeneralUrbanRetirementReviewPppUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway: GeneralUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzeGeneralUrbanRetirementReviewPppRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementReviewPppResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementReview =
      await this.generalUrbanRetirementReviewQueryRepositoryGateway.findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
        dto.json.generalUrbanRetirementReviewId,
        GeneralUrbanRetirementReviewNotFoundError,
      );

    const generalUrbanRetirementReviewEntity =
      new GeneralUrbanRetirementReviewEntity({
        ...generalUrbanRetirementReview,
      });

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_SPECIAL_PERIOD_PPP_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_SPECIAL_PERIOD_PPP_ANALYSIS,
        organizationMember.id,
      );

    const files: Buffer[] = [];
    dto.files.forEach((fileBuffer) => {
      files.push(fileBuffer.buffer);
    });

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: files,
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  nome: {
                    type: 'string',
                    description: 'Nome do segurado analisado.',
                  },
                  cargo: {
                    type: 'string',
                    description:
                      'Cargo ou função exercida no vínculo, retorne vazio se não houver.',
                  },
                  tipo: {
                    type: 'string',
                    description:
                      'Tipo de vínculo analisado, neste caso sempre será "Análise de PPP".',
                  },
                  empresa: {
                    type: 'string',
                    description:
                      'Nome da empresa empregadora, retorne vazio se não houver.',
                  },
                  periodoInicio: {
                    type: 'string',
                    description:
                      'Data de início do vínculo, retorne vazio se não houver, formate em AAAA/MM/DD, ex: 2020/01/15.',
                  },
                  periodoFim: {
                    type: 'string',
                    description:
                      'Data de término do vínculo, retorne vazio se não houver, formate em AAAA/MM/DD, ex: 2020/01/15, e caso não tenha data de saída, informe "".',
                  },
                  viabilidade: {
                    type: 'string',
                    enum: ['BAIXA', 'MÉDIA', 'ALTA'],
                    description: 'Viabilidade do reconhecimento.',
                  },
                  reconhecimentoINSS: {
                    type: 'string',
                    enum: ['PROVÁVEL', 'PARCIAL', 'IMPROVÁVEL'],
                    description: 'Análise do INSS.',
                  },
                  impactoCarencia: {
                    type: 'boolean',
                    description: 'Indica se há impacto na carência.',
                  },
                  reconhecimentoJudicial: {
                    type: 'string',
                    enum: ['FAVORÁVEL', 'DESFAVORÁVEL', 'INDEFINIDO'],
                    description: 'Análise judicial do vínculo.',
                  },
                  tempoContribuicao: {
                    type: 'string',
                    description: 'Tempo de contribuição reconhecido.',
                  },
                  observacaoTecnica: {
                    type: 'string',
                    description:
                      'Observações técnicas, retorne vazio se não houver.',
                  },
                  contribuicaoMedia: {
                    type: 'string',
                    description:
                      'Valor da contribuição média mensal, retorne 0 se não houver.',
                  },
                  status: {
                    type: 'boolean',
                    description:
                      'Indica se o vínculo é favorável ou não para o segurado, considerando todos os aspectos analisados.',
                  },
                  tipoDeTrabalho: {
                    type: 'string',
                    enum: ['URBANO', 'RURAL'],
                    description:
                      'Tipo de trabalho realizado no vínculo, se aplicável. Por padrão retorne URBANO.',
                  },
                  competenciaAbaixoDoMinimo: {
                    type: 'boolean',
                    description:
                      'Indica se há competências com valor de contribuição abaixo do mínimo legal, considerando o ano de referência é o sálario mínimo vigente na época do Brasil.',
                  },
                  categoria: {
                    type: 'string',
                    enum: [
                      'AUTONOMO',
                      'MEI',
                      'CONTRIBUINTE_INDIVIDUAL',
                      'TRABALHADOR_AVULSO',
                      'TEMPORARIO',
                      'ESTAGIARIO',
                      'APRENDIZ',
                      'SERVIDOR_PUBLICO',
                      'TRABALHADOR_RURAL',
                      'SEGURADO_ESPECIAL',
                      'MILITAR',
                    ],
                    description:
                      'Categoria do vínculo, que encontra-se no CTPS que não consta no CNIS.',
                  },
                  viabilidadeTempoEspecial: {
                    type: 'boolean',
                    description:
                      'Indica se o vínculo possui viabilidade para reconhecimento de tempo especial.',
                  },
                  tempoContribuicaoGanho: {
                    type: 'string',
                    description:
                      'Tempo de contribuição ganho com o reconhecimento do vínculo, retorne vazio se não houver. Ex. Período original: 5 anos, 6 meses e 15 dias | Período convencional: 7 anos, 2 meses e 10 dias',
                  },
                  periodoOriginal: {
                    type: 'string',
                    description:
                      'Período original de trabalho constante no PPP, no formato DD/MM/AAAA a DD/MM/AAAA. Ex: 01/03/2005 a 15/08/2018. Retorne vazio se não houver.',
                  },
                  periodoConvencional: {
                    type: 'string',
                    description:
                      'Período convencional reconhecido após aplicação do fator de conversão de tempo especial, no formato DD/MM/AAAA a DD/MM/AAAA. Retorne vazio se não houver.',
                  },
                  agentesNocivos: {
                    type: 'array',
                    description:
                      'Lista de agentes nocivos identificados no vínculo, retorne vazio se não houver.',
                    items: {
                      type: 'object',
                      properties: {
                        agente: {
                          type: 'string',
                          description:
                            'Nome do agente nocivo identificado. Ex: Ruído - 87db(A), Calor - IBUTG 28,5°C',
                        },
                      },
                      required: ['agente'],
                    },
                  },
                },
                required: [
                  'nome',
                  'cargo',
                  'tipo',
                  'empresa',
                  'periodoInicio',
                  'periodoFim',
                  'viabilidade',
                  'reconhecimentoINSS',
                  'impactoCarencia',
                  'reconhecimentoJudicial',
                  'tempoContribuicao',
                  'observacaoTecnica',
                  'contribuicaoMedia',
                  'status',
                  'tipoDeTrabalho',
                  'competenciaAbaixoDoMinimo',
                  'categoria',
                  'viabilidadeTempoEspecial',
                  'tempoContribuicaoGanho',
                  'periodoOriginal',
                  'periodoConvencional',
                  'agentesNocivos',
                ],
              },
            },
          }),
        }),
      )) ?? '';

    let periodoOriginal: string | undefined;
    let periodoConvencional: string | undefined;

    if (result) {
      try {
        const parsed: unknown = JSON.parse(result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const firstItem: unknown = parsed[0];
          if (firstItem !== null && typeof firstItem === 'object') {
            const item = firstItem as Record<string, unknown>;
            periodoOriginal =
              typeof item['periodoOriginal'] === 'string'
                ? item['periodoOriginal']
                : undefined;
            periodoConvencional =
              typeof item['periodoConvencional'] === 'string'
                ? item['periodoConvencional']
                : undefined;
          }
        }
      } catch {
        // result não é JSON válido, periodoOriginal e periodoConvencional permanecem undefined
      }
    }

    const generalUrbanRetirementReviewSpecialPeriod =
      new GeneralUrbanRetirementReviewSpecialPeriodEntity({
        response: result,
        generalUrbanRetirementReview: generalUrbanRetirementReviewEntity,
      });

    const generalUrbanRetirementReviewSpecialPeriodSaved =
      this.generalUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway.createGeneralUrbanRetirementReviewSpecialPeriod(
        generalUrbanRetirementReviewSpecialPeriod,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      generalUrbanRetirementReviewSpecialPeriodSaved,
      consumeCreditTransaction,
    ]);

    await transactions.commit();

    return AnalyzeGeneralUrbanRetirementReviewPppResponseDto.build({
      generalUrbanRetirementReviewSpecialPeriodId:
        generalUrbanRetirementReviewSpecialPeriod.id,
      analysis: JSON.stringify(result),
      periodoOriginal: periodoOriginal ?? null,
      periodoConvencional: periodoConvencional ?? null,
    });
  }
}
