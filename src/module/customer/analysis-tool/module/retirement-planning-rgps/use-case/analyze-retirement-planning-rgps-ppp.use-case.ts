import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-special-period/command/retirement-planning-rgps-special-period.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsSpecialPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-special-period/retirement-planning-rgps-special-period.entity';
import { AnalyzeRetirementPlanningRgpsPppRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/analyze-retirement-planning-rgps-ppp.request.dto';
import { AnalyzeRetirementPlanningRgpsPppResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/analyze-retirement-planning-rgps-ppp.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { MarkdownConverterGateway } from '@lib/markdown-converter/markdown-converter.gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeRetirementPlanningRgpsPppUseCase {
  protected readonly _type = AnalyzeRetirementPlanningRgpsPppUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway)
    private readonly retirementPlanningRgpsSpecialPeriodCommandRepositoryGateway: RetirementPlanningRgpsSpecialPeriodCommandRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzeRetirementPlanningRgpsPppRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsPppResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        dto.json.retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const retirementPlanningRgpsEntity = new RetirementPlanningRgpsEntity({
      ...retirementPlanningRgps,
    });

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS,
        organizationMember.id,
      );

    // TODO ADICIONAR BASE DE CONHECIMENTO

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
                      'Observações técnicas detalhadas sobre a análise realizada. Use formatação markdown: ## para títulos de seções, **texto** para negrito, - para listas com marcadores. Estruture em seções claras com títulos descritivos.',
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
                  'agentesNocivos',
                ],
              },
            },
          }),
        }),
      )) ?? '';

    const retirementPlanningRgpsSpecialPeriod =
      new RetirementPlanningRgpsSpecialPeriodEntity({
        response: result,
        retirementPlanningRgps: retirementPlanningRgpsEntity,
      });

    const retirementPlanningRgpsSpecialPeriodSaved =
      this.retirementPlanningRgpsSpecialPeriodCommandRepositoryGateway.createRetirementPlanningRgpsSpecialPeriod(
        retirementPlanningRgpsSpecialPeriod,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRgpsSpecialPeriodSaved,
      consumeCreditTransaction,
    ]);

    await transactions.commit();

    const parsedArray: Record<string, unknown>[] = JSON.parse(result || '[]');
    for (const item of parsedArray) {
      if (item['observacaoTecnica'] !== undefined) {
        item['observacaoTecnica'] = await this.markdownConverterGateway.convertToHtml(item['observacaoTecnica'] as string);
      }
    }

    return AnalyzeRetirementPlanningRgpsPppResponseDto.build({
      retirementPlanningRgpsSpecialPeriodId:
        retirementPlanningRgpsSpecialPeriod.id,
      analysis: JSON.stringify(parsedArray),
    });
  }
}
