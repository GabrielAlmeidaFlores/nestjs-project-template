import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalyzeTeacherRetirementPlanningPppRequestDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/request/analyze-teacher-retirement-planning-ppp.request.dto';
import { AnalyzeTeacherRetirementPlanningPppResponseDto } from '@module/customer/analysis-tool/module/teacher-retirement-planning/dto/response/analyze-teacher-retirement-planning-ppp.response.dto';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeTeacherRetirementPlanningPppUseCase {
  protected readonly _type = AnalyzeTeacherRetirementPlanningPppUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: AnalyzeTeacherRetirementPlanningPppRequestDto,
  ): Promise<AnalyzeTeacherRetirementPlanningPppResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

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

    const fileBuffer = Buffer.from(dto.document.base64.toString(), 'base64');

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: [fileBuffer],
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  nome: { type: 'string', description: 'Nome do segurado analisado.' },
                  cargo: { type: 'string', description: 'Cargo ou função exercida no vínculo, retorne vazio se não houver.' },
                  tipo: { type: 'string', description: 'Tipo de vínculo analisado, neste caso sempre será "Análise de PPP".' },
                  empresa: { type: 'string', description: 'Nome da empresa empregadora, retorne vazio se não houver.' },
                  periodoInicio: { type: 'string', description: 'Data de início do vínculo, formate em AAAA/MM/DD, ex: 2020/01/15.' },
                  periodoFim: { type: 'string', description: 'Data de término do vínculo, formate em AAAA/MM/DD. Caso não tenha data de saída, informe "".' },
                  viabilidade: { type: 'string', enum: ['BAIXA', 'MÉDIA', 'ALTA'], description: 'Viabilidade do reconhecimento.' },
                  reconhecimentoINSS: { type: 'string', enum: ['PROVÁVEL', 'PARCIAL', 'IMPROVÁVEL'], description: 'Análise do INSS.' },
                  impactoCarencia: { type: 'boolean', description: 'Indica se há impacto na carência.' },
                  reconhecimentoJudicial: { type: 'string', enum: ['FAVORÁVEL', 'DESFAVORÁVEL', 'INDEFINIDO'], description: 'Análise judicial do vínculo.' },
                  tempoContribuicao: { type: 'string', description: 'Tempo de contribuição reconhecido.' },
                  observacaoTecnica: { type: 'string', description: 'Nota técnica em formato Markdown estruturado com 3 seções obrigatórias usando ### como título: "### Avaliação Documental" (lista os agentes nocivos, EPI/EPC e análise crítica de eficácia), "### Viabilidade e Fundamentação" (cita decreto/norma com código específico e tema STJ/TNU aplicável), "### Pendências e Recomendações" (lista numerada de ações concretas para o advogado). Mínimo de 8 linhas. Use \\n para quebras de linha e **negrito** para termos jurídicos.' },
                  contribuicaoMedia: { type: 'string', description: 'Valor da contribuição média mensal, retorne 0 se não houver.' },
                  status: { type: 'boolean', description: 'Indica se o vínculo é favorável ou não para o segurado.' },
                  tipoDeTrabalho: { type: 'string', enum: ['URBANO', 'RURAL'], description: 'Tipo de trabalho realizado no vínculo. Por padrão retorne URBANO.' },
                  competenciaAbaixoDoMinimo: { type: 'boolean', description: 'Indica se há competências com valor de contribuição abaixo do mínimo legal.' },
                  categoria: {
                    type: 'string',
                    enum: ['AUTONOMO', 'MEI', 'CONTRIBUINTE_INDIVIDUAL', 'TRABALHADOR_AVULSO', 'TEMPORARIO', 'ESTAGIARIO', 'APRENDIZ', 'SERVIDOR_PUBLICO', 'TRABALHADOR_RURAL', 'SEGURADO_ESPECIAL', 'MILITAR'],
                    description: 'Categoria do vínculo.',
                  },
                  viabilidadeTempoEspecial: { type: 'boolean', description: 'Indica se o vínculo possui viabilidade para reconhecimento de tempo especial.' },
                  tempoContribuicaoGanho: { type: 'string', description: 'Tempo de contribuição ganho com o reconhecimento do vínculo. Ex. Período original: 5 anos, 6 meses e 15 dias | Período convencional: 7 anos, 2 meses e 10 dias' },
                  agentesNocivos: {
                    type: 'array',
                    description: 'Lista de agentes nocivos identificados no vínculo.',
                    items: {
                      type: 'object',
                      properties: {
                        agente: { type: 'string', description: 'Nome do agente nocivo. Ex: Ruído - 87db(A)' },
                      },
                      required: ['agente'],
                    },
                  },
                },
                required: [
                  'nome', 'cargo', 'tipo', 'empresa', 'periodoInicio', 'periodoFim',
                  'viabilidade', 'reconhecimentoINSS', 'impactoCarencia', 'reconhecimentoJudicial',
                  'tempoContribuicao', 'observacaoTecnica', 'contribuicaoMedia', 'status',
                  'tipoDeTrabalho', 'competenciaAbaixoDoMinimo', 'categoria',
                  'viabilidadeTempoEspecial', 'tempoContribuicaoGanho', 'agentesNocivos',
                ],
              },
            },
          }),
        }),
      )) ?? '[]';

    const transactionCredit = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
    ]);

    await transactionCredit.commit();

    return AnalyzeTeacherRetirementPlanningPppResponseDto.build({
      analysis: JSON.stringify(result),
    });
  }
}
