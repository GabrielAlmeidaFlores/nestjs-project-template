import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisProcessorGateway } from '@module/customer/analysis-tool/lib/analysis-processor/analysis-processor.gateway';
import { MiniAdvisorCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/command/mini-advisor.command.repository.gateway';
import { MiniAdvisorQueryRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/mini-advisor.query.repository.gateway';
import { MiniAdvisorResultCommandRepositoryGateway } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/command/mini-advisor-result.command.repository.gateway';
import { MiniAdvisorEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import { MiniAdvisorAnalysisTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/enum/mini-advisor-analysis-type.enum';
import { CreateMiniAdvisorResultResponseDto } from '@module/customer/mini-advisor/dto/response/create-mini-advisor-result.response.dto';
import { MiniAdvisorNotFoundError } from '@module/customer/mini-advisor/error/mini-advisor-not-found.error';
import { MiniAdvisorResultAlreadyExistsError } from '@module/customer/mini-advisor/error/mini-advisor-result-already-exists.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface MiniAdvisorAiResult {
  chosenAnalysis: MiniAdvisorAnalysisTypeEnum;
}

@Injectable()
export class CreateMiniAdvisorResultUseCase {
  protected readonly _type = CreateMiniAdvisorResultUseCase.name;

  private readonly miniAdvisorAnalysisPredefinedMessages: Record<
    MiniAdvisorAnalysisTypeEnum,
    { benefitDescription: string; attentionNote: string }
  > = {
    [MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT]: {
      benefitDescription:
        'Análise de aposentadoria urbana pelas regras gerais e de transição da EC 103/2019. Avalia todas as modalidades disponíveis, incluindo aposentadoria programada, regras de transição por pontos, por idade progressiva e por tempo de contribuição com direito adquirido.',
      attentionNote:
        'Verifique se o cliente possui direito adquirido antes da EC 103/2019, o que pode resultar em benefícios mais vantajosos. Recomenda-se a análise comparativa entre todas as regras disponíveis para identificar a mais favorável.',
    },
    [MiniAdvisorAnalysisTypeEnum.DISABILITY_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Planejamento previdenciário para pessoa com deficiência, com requisitos de tempo de contribuição reduzidos conforme o grau: grave (20 anos homem / 15 anos mulher), moderado (29/24) e leve (34/29). Exige avaliação biopsicossocial pelo INSS.',
      attentionNote:
        'A comprovação do grau de deficiência deve ser formalizada por laudo médico e avaliação biopsicossocial. Reúna toda a documentação médica disponível para embasar a qualificação junto ao INSS e verifique se há deficiência preexistente à filiação.',
    },
    [MiniAdvisorAnalysisTypeEnum.TEACHER_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Aposentadoria especial do professor com redução de 5 anos no tempo de contribuição (25 anos para mulheres e 30 anos para homens), exclusivamente para quem exerce função de magistério em educação básica (educação infantil, ensino fundamental ou ensino médio).',
      attentionNote:
        'É essencial comprovar o efetivo exercício de função de magistério, não apenas o vínculo com a instituição de ensino. Diretores, coordenadores e orientadores pedagógicos em geral não têm direito à aposentadoria do professor, salvo se também exercerem docência.',
    },
    [MiniAdvisorAnalysisTypeEnum.SPECIAL_CATEGORY_RETIREMENT]: {
      benefitDescription:
        'Aposentadoria especial para trabalhadores expostos de forma habitual e permanente a agentes nocivos à saúde (ruído, produtos químicos, calor, agentes biológicos, entre outros). Exige 15, 20 ou 25 anos de atividade especial conforme o agente e o período laborado.',
      attentionNote:
        'A comprovação da atividade especial requer o Perfil Profissiográfico Previdenciário (PPP) emitido pela empresa. Períodos anteriores a abril de 1995 podem ser enquadrados por categoria profissional. A utilização de EPI eficaz pode comprometer o reconhecimento do período especial.',
    },
    [MiniAdvisorAnalysisTypeEnum.RURAL_OR_HYBRID_RETIREMENT]: {
      benefitDescription:
        'Aposentadoria por idade rural para segurado especial (trabalhador em regime de economia familiar) com redução de 5 anos na idade mínima, ou aposentadoria por idade híbrida, que soma períodos rurais e urbanos para fins de carência.',
      attentionNote:
        'A comprovação do tempo rural exige início de prova material contemporânea ao período declarado. A presença de vínculos urbanos durante o período rural pode descaracterizar a condição de segurado especial, devendo ser analisada com atenção.',
    },
    [MiniAdvisorAnalysisTypeEnum.PERMANENT_DISABILITY_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Aposentadoria por incapacidade permanente para segurados que, após cumprida a carência de 12 meses, tornaram-se definitivamente incapazes para qualquer atividade laborativa. Não exige carência em casos de acidente ou doenças graves previstas no art. 151 da Lei 8.213/91.',
      attentionNote:
        'A incapacidade deve ser total e permanente, excluindo a possibilidade de reabilitação profissional. O laudo médico deve ser robusto e corroborado por exames de imagem e pareceres de especialistas. Verifique a qualidade de segurado na data de início da incapacidade.',
    },
    [MiniAdvisorAnalysisTypeEnum.TEMPORARY_DISABILITY_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Auxílio por incapacidade temporária para segurados temporariamente incapacitados para o trabalho por mais de 15 dias consecutivos. Exige carência de 12 meses, dispensada em casos de acidente ou doenças previstas no art. 151 da Lei 8.213/91.',
      attentionNote:
        'A qualidade de segurado na data de início da incapacidade (DII) é fundamental. Em caso de desemprego, o período de graça pode ser estendido. Reúna toda a documentação médica disponível para comprovar a data de início e a duração da incapacidade.',
    },
    [MiniAdvisorAnalysisTypeEnum.ACCIDENT_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Auxílio-acidente, benefício permanente de natureza indenizatória, concedido ao segurado que sofreu acidente de qualquer natureza e ficou com sequelas definitivas que reduzem a capacidade para o trabalho habitual. Não exige carência e pode ser acumulado com a remuneração do trabalho.',
      attentionNote:
        'As sequelas devem ser definitivas e comprovadas após a consolidação das lesões. O laudo pericial deve descrever especificamente a redução da capacidade para o trabalho habitual. O benefício difere do auxílio por incapacidade temporária, que é transitório e cessa com a recuperação.',
    },
    [MiniAdvisorAnalysisTypeEnum.DEATH_PENSION_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Pensão por morte para dependentes do segurado falecido (cônjuge, companheiro, filhos e demais dependentes previstos em lei). Exige que o falecido possuísse qualidade de segurado ou já estivesse aposentado na data do óbito e que os dependentes comprovem a relação de dependência.',
      attentionNote:
        'Atenção especial à qualidade de segurado do falecido na data do óbito. Para cônjuge ou companheiro, verifique o tempo de convivência e a dependência econômica nos casos de casamento ou união estável recente. Dependentes inválidos podem ter direito a pensão vitalícia independentemente da duração do vínculo.',
    },
    [MiniAdvisorAnalysisTypeEnum.MATERNITY_PAY_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Salário-maternidade para seguradas que deram à luz, adotaram ou obtiveram guarda judicial de criança para fins de adoção. A duração é de 120 dias. Exige carência variável conforme a categoria da segurada (sem carência para empregada; 10 contribuições para contribuinte individual e facultativa).',
      attentionNote:
        'Verifique a qualidade de segurada na data do parto ou da adoção. O salário-maternidade pode ser pleiteado mesmo após o término do vínculo empregatício, desde que dentro do período de graça. A demissão antes do parto em regra não impede o recebimento do benefício.',
    },
    [MiniAdvisorAnalysisTypeEnum.ELDERLY_BPC_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Benefício de Prestação Continuada (BPC) para idosos com 65 anos ou mais em situação de vulnerabilidade econômica, independentemente de contribuição ao INSS. Trata-se de benefício assistencial não contributivo no valor de 1 salário mínimo.',
      attentionNote:
        'O benefício exige comprovação de hipossuficiência econômica. A renda per capita familiar deve ser inferior a 1/4 do salário mínimo, embora os tribunais admitam critérios mais flexíveis mediante comprovação da situação de vulnerabilidade. Não é possível acumular com outro benefício assistencial.',
    },
    [MiniAdvisorAnalysisTypeEnum.DISABILITY_BPC_RETIREMENT_PLANNING]: {
      benefitDescription:
        'Benefício de Prestação Continuada (BPC) para pessoas com deficiência de qualquer idade com impedimento de longo prazo (mínimo 2 anos) de natureza física, mental, intelectual ou sensorial, em situação de vulnerabilidade econômica. Não exige contribuição ao INSS. Valor de 1 salário mínimo.',
      attentionNote:
        'A avaliação do impacto da deficiência é realizada por equipe multiprofissional do INSS. A renda per capita familiar deve ser inferior a 1/4 do salário mínimo, mas os tribunais têm ampliado esse critério em casos de comprovada vulnerabilidade. Não é possível acumular com outro benefício assistencial.',
    },
  };

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(MiniAdvisorCommandRepositoryGateway)
    private readonly miniAdvisorCommandRepositoryGateway: MiniAdvisorCommandRepositoryGateway,
    @Inject(MiniAdvisorQueryRepositoryGateway)
    private readonly miniAdvisorQueryRepositoryGateway: MiniAdvisorQueryRepositoryGateway,
    @Inject(MiniAdvisorResultCommandRepositoryGateway)
    private readonly miniAdvisorResultCommandRepositoryGateway: MiniAdvisorResultCommandRepositoryGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    miniAdvisorId: MiniAdvisorId,
  ): Promise<CreateMiniAdvisorResultResponseDto> {
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
        PaymentPlanPaidResourceTypeEnum.MINI_ADVISOR_COMPLETE_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.MINI_ADVISOR_COMPLETE_ANALYSIS,
        organizationMember.id,
      );

    const miniAdvisorQueryResult =
      await this.miniAdvisorQueryRepositoryGateway.findOneByIdOrFail(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        miniAdvisorId,
        MiniAdvisorNotFoundError,
      );

    if (miniAdvisorQueryResult.miniAdvisorResult) {
      throw new MiniAdvisorResultAlreadyExistsError();
    }

    const clientData = {
      data_analise: new Date().toISOString(),
      situacao_cliente: miniAdvisorQueryResult.clientSituation,
      idade_cliente: miniAdvisorQueryResult.clientAge,
      genero_cliente: miniAdvisorQueryResult.clientGender,
      historico_trabalho: miniAdvisorQueryResult.clientWorkHistory,
      contribuiu_inss: miniAdvisorQueryResult.hasContributedWithInss,
      tem_deficiencia_ou_limitacoes:
        miniAdvisorQueryResult.clientHasDisabilityOrLimitations,
    };

    const clientDataBuffer = Buffer.from(
      JSON.stringify(clientData, null, 2),
      'utf-8',
    );

    const aiResponseRaw =
      await this.analysisProcessorGateway.getMiniAdvisorCompleteAnalysis(
        promptResponse.prompt,
        [clientDataBuffer],
      );

    const aiResult = this.parseAiResponse(aiResponseRaw);

    const predefinedMessages =
      this.miniAdvisorAnalysisPredefinedMessages[aiResult.chosenAnalysis];

    const miniAdvisorResult = new MiniAdvisorResultEntity({
      miniAdvisorId,
      chosenAnalysis: aiResult.chosenAnalysis,
      benefitDescription: predefinedMessages.benefitDescription,
      attentionNote: predefinedMessages.attentionNote,
    });

    const miniAdvisor = new MiniAdvisorEntity({
      id: miniAdvisorId,
      createdAt: miniAdvisorQueryResult.createdAt,
      updatedAt: miniAdvisorQueryResult.updatedAt,
      createdBy: miniAdvisorQueryResult.createdById,
      updatedBy: organizationMember.id,
      clientSituation: miniAdvisorQueryResult.clientSituation,
      clientAge: miniAdvisorQueryResult.clientAge,
      clientGender: miniAdvisorQueryResult.clientGender,
      clientWorkHistory: miniAdvisorQueryResult.clientWorkHistory,
      hasContributedWithInss: miniAdvisorQueryResult.hasContributedWithInss,
      clientHasDisabilityOrLimitations:
        miniAdvisorQueryResult.clientHasDisabilityOrLimitations,
      miniAdvisorResult,
    });

    const createMiniAdvisorResultTransaction =
      this.miniAdvisorResultCommandRepositoryGateway.createMiniAdvisorResult(
        miniAdvisorResult,
      );

    const updateMiniAdvisorTransaction =
      this.miniAdvisorCommandRepositoryGateway.updateMiniAdvisor(
        miniAdvisor.id,
        miniAdvisor,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      consumeCreditTransaction,
      createMiniAdvisorResultTransaction,
      updateMiniAdvisorTransaction,
    ]);

    await transaction.commit();

    return CreateMiniAdvisorResultResponseDto.build({
      miniAdvisorResultId: miniAdvisorResult.id,
      chosenAnalysis: miniAdvisorResult.chosenAnalysis,
      ...(miniAdvisorResult.benefitDescription !== null && {
        benefitDescription: miniAdvisorResult.benefitDescription,
      }),
      ...(miniAdvisorResult.attentionNote !== null && {
        attentionNote: miniAdvisorResult.attentionNote,
      }),
    });
  }

  private parseAiResponse(raw: string | null): MiniAdvisorAiResult {
    if (!raw) {
      return {
        chosenAnalysis:
          MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      };
    }

    try {
      const parsed = JSON.parse(raw) as Partial<MiniAdvisorAiResult>;

      return {
        chosenAnalysis:
          parsed.chosenAnalysis ??
          MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      };
    } catch {
      return {
        chosenAnalysis:
          MiniAdvisorAnalysisTypeEnum.GENERAL_URBAN_RETIREMENT_GRANT,
      };
    }
  }
}
