import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { MarkdownConverterGateway } from '@lib/markdown-converter/markdown-converter.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-analysis-result/command/retirement-planning-rgps-analysis-result.repository.gateway';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/enum/analysis-type.enum';
import { RetirementPlanningRgpsAnalysisResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/retirement-planning-rgps-analysis-result.entity';
import { AnalyzeRetirementPlanningRgpsCnisRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/analyze-retirement-planning-rgps-cnis.request.dto';
import { AnalyzeRetirementPlanningRgpsCnisResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/analyze-retirement-planning-rgps-cnis.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

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
    dto: AnalyzeRetirementPlanningRgpsCnisRequestDto,
  ): Promise<AnalyzeRetirementPlanningRgpsCnisResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS,
        organizationMember.id,
      );

    // TODO: ADICIONAR TBM BASE DE CONHECIMENTO ESPECÍFICA PARA SERVIÇO PÚBLICO, ALÈM DO prompt genérico

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
              type: 'object',
              properties: {
                tipo: {
                  type: 'string',
                  enum: [
                    'Tempo rural',
                    'Serviço Militar',
                    'Serviço Público',
                    'CTPS fora do CNIS',
                    'Aluno-Aprendiz',
                    'Trabalho no Exterior',
                    'Trabalho Informal',
                    'Sentença Trabalhista',
                  ],
                  description: 'Tipo do período analisado.',
                },
                nome: {
                  type: 'string',
                  description: 'Nome do segurado, retorne vazio se não houver.',
                },
                empresa: {
                  type: 'string',
                  description:
                    'Nome da empresa ou instituição, retorne vazio se não houver.',
                },
                periodoInicio: {
                  type: 'string',
                  description:
                    'Data de início do período, formato YYYY-MM-DD. Retorne vazio se não houver.',
                },
                periodoFim: {
                  type: 'string',
                  description:
                    'Data de fim do período, formato YYYY-MM-DD. Retorne vazio se não houver.',
                },
                viabilidade: {
                  type: 'string',
                  enum: ['Alta', 'Média', 'Baixa'],
                  description: 'Viabilidade do reconhecimento.',
                },
                reconhecimentoINSS: {
                  type: 'string',
                  enum: ['Provável', 'Parcial', 'Improvável'],
                  description:
                    'Análise do INSS, se é provável, parcial ou improvável.',
                },
                impactoCarencia: {
                  type: 'boolean',
                  description:
                    'Indica se há impacto na carência. Será true ou false.',
                },
                reconhecimentoJudicial: {
                  type: 'string',
                  enum: ['Favorável', 'Desfavorável', 'Sim', 'Não'],
                  description: 'Análise judicial do vínculo.',
                },
                tempoContribuicao: {
                  type: 'string',
                  description:
                    'Tempo de contribuição reconhecido. Ex. 2 anos e 3 meses e 20 dias.',
                },
                observacaoTecnica: {
                  type: 'string',
                  description:
                    'Observações técnicas detalhadas sobre a análise realizada. Use formatação markdown: ## para títulos de seções, **texto** para negrito, - para listas com marcadores. Estruture em seções claras com títulos descritivos.',
                },
              },
              required: [
                'tipo',
                'nome',
                'empresa',
                'periodoInicio',
                'periodoFim',
                'viabilidade',
                'reconhecimentoINSS',
                'impactoCarencia',
                'reconhecimentoJudicial',
                'tempoContribuicao',
                'observacaoTecnica',
              ],
            },
          }),
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
      consumeCreditTransaction,
    ]);

    await transactions.commit();

    const parsedResult = JSON.parse(result || '{}') as Record<string, unknown>;
    if (parsedResult['observacaoTecnica'] !== undefined) {
      parsedResult['observacaoTecnica'] =
        await this.markdownConverterGateway.convertToHtml(
          parsedResult['observacaoTecnica'] as string,
        );
    }
    const resultHtml = JSON.stringify(parsedResult);

    return AnalyzeRetirementPlanningRgpsCnisResponseDto.build({
      retirementPlanningRgpsAnalysisResultId:
        retirementPlanningRgpsAnalysisResultEntity.id,
      result: resultHtml,
    });
  }
}
