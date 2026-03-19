import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/general-urban-retirement-grant.query.repository.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/command/general-urban-retirement-grant-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/enum/analysis-type.enum';
import { GeneralUrbanRetirementGrantAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.entity';
import { AnalyzeGeneralUrbanRetirementGrantCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/analyze-general-urban-retirement-grant-cnis.request.dto';
import { AnalyzeGeneralUrbanRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/analyze-general-urban-retirement-grant-cnis.response.dto';
import { GeneralUrbanRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/error/general-urban-retirement-grant-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeRuralTimeUseCase {
  protected readonly _type = AnalyzeRuralTimeUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(GeneralUrbanRetirementGrantQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantQueryRepositoryGateway: GeneralUrbanRetirementGrantQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementGrantAnalysisResultCommandRepositoryGateway: GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway,
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
    dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementGrant =
      await this.generalUrbanRetirementGrantQueryRepositoryGateway.findOneByGeneralUrbanRetirementGrantIdOrFailWithRelations(
        dto.json.generalUrbanRetirementGrantId,
        GeneralUrbanRetirementGrantNotFoundError,
      );

    const generalUrbanRetirementGrantEntity =
      new GeneralUrbanRetirementGrantEntity({
        ...generalUrbanRetirementGrant,
      });

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT_RURAL_TIME_ANALYSIS,
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
                    'Observações técnicas sobre a análise realizada com todos os detalhes.',
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

    const generalUrbanRetirementGrantAnalysisResultEntity =
      new GeneralUrbanRetirementGrantAnalysisResultEntity({
        analysisType: AnalysisTypeEnum.RURAL,
        response: result,
        generalUrbanRetirementGrant: generalUrbanRetirementGrantEntity,
      });

    const generalUrbanRetirementGrantAnalysisResult =
      this.generalUrbanRetirementGrantAnalysisResultCommandRepositoryGateway.createGeneralUrbanRetirementGrantAnalysisResult(
        generalUrbanRetirementGrantAnalysisResultEntity,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      generalUrbanRetirementGrantAnalysisResult,
      consumeCreditTransaction,
    ]);

    await transactions.commit();

    return AnalyzeGeneralUrbanRetirementGrantCnisResponseDto.build({
      generalUrbanRetirementGrantAnalysisResultId:
        generalUrbanRetirementGrantAnalysisResultEntity.id,
      result,
    });
  }
}
