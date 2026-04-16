import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
import { GeneralUrbanRetirementDenialPeriodCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-category.enum';
import { GeneralUrbanRetirementDenialPeriodConsiderationEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-consideration.enum';
import { GeneralUrbanRetirementDenialPeriodPendencyReasonEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-pendency-reason.enum';
import { GeneralUrbanRetirementDenialPeriodWorkTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/enum/general-urban-retirement-denial-period-work-type.enum';
import { CompareGeneralUrbanRetirementDenialCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/request/compare-general-urban-retirement-denial-cnis-ctps.request.dto';
import {
  CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto,
  CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto,
} from '@module/customer/analysis-tool/module/general-urban-retirement-denial/dto/response/compare-general-urban-retirement-denial-cnis-ctps.response.dto';
import { GeneralUrbanRetirementDenialNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/error/general-urban-retirement-denial-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

interface CompareCnisCtpsResultItemInterface {
  bondOrigin: string | null | undefined;
  category: GeneralUrbanRetirementDenialPeriodCategoryEnum | null | undefined;
  activityDescription: string | null | undefined;
  startDate: string;
  endDate: string | null | undefined;
  workType: GeneralUrbanRetirementDenialPeriodWorkTypeEnum;
  impactMonths: number | null | undefined;
  graceMonths: number | null | undefined;
  isPendency: boolean;
  competenceBelowTheMinimum: boolean;
  contributionAverage: string | null | undefined;
  pendencyReason:
    | GeneralUrbanRetirementDenialPeriodPendencyReasonEnum
    | null
    | undefined;
  periodConsideration:
    | GeneralUrbanRetirementDenialPeriodConsiderationEnum
    | null
    | undefined;
  wantsToComplementViaMeuINSS: boolean | null | undefined;
  status: boolean;
}

@Injectable()
export class CompareGeneralUrbanRetirementDenialCnisCtpsUseCase {
  protected readonly _type =
    CompareGeneralUrbanRetirementDenialCnisCtpsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementDenialQueryRepositoryGateway)
    private readonly generalUrbanRetirementDenialQueryRepositoryGateway: GeneralUrbanRetirementDenialQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
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
    generalUrbanRetirementDenialId: GeneralUrbanRetirementDenialId,
    dto: CompareGeneralUrbanRetirementDenialCnisCtpsRequestDto,
  ): Promise<CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const generalUrbanRetirementDenial =
      await this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations(
        generalUrbanRetirementDenialId,
        GeneralUrbanRetirementDenialNotFoundError,
      );

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_DENIAL_COMPARE_CNIS_CTPS,
        organizationMember.id,
      );

    const cnisDocuments = (
      generalUrbanRetirementDenial.generalUrbanRetirementDenialDocument ?? []
    ).filter(
      (doc) => doc.type === GeneralUrbanRetirementDenialDocumentTypeEnum.CNIS,
    );

    const cnisDocumentBuffers = await Promise.all(
      cnisDocuments.map((doc) =>
        this.fileProcessorGateway.getFileBuffer(doc.document),
      ),
    );

    const ctpsFileBuffers = dto.files.map((file) =>
      file.base64.decodeToBuffer(),
    );

    const files: Buffer[] = [...cnisDocumentBuffers, ...ctpsFileBuffers];

    const result =
      (await this.generativeIaGateway.generateHighQualityResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          promptFiles: files,
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: this.buildJsonSchema(),
          }),
        }),
      )) ?? '[]';

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      consumeCreditTransaction,
    );

    await transaction.commit();

    const periods = this.buildFilteredPeriods(
      result,
      generalUrbanRetirementDenial,
    );

    return CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto.build({
      periods,
    });
  }

  private buildFilteredPeriods(
    result: string,
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
  ): CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto[] {
    try {
      const parsedResult = JSON.parse(
        result,
      ) as CompareCnisCtpsResultItemInterface[];

      const existingPeriods =
        generalUrbanRetirementDenial.generalUrbanRetirementDenialPeriod ?? [];

      const filtered = parsedResult.filter((aiPeriod) => {
        const aiDateStr = aiPeriod.startDate.replace(/\//g, '-');
        return !existingPeriods.some((existing) => {
          if (
            !this.hasValue(existing.bondOrigin) ||
            !this.hasValue(aiPeriod.bondOrigin)
          ) {
            return false;
          }
          const nameMatch =
            existing.bondOrigin.trim().toLowerCase() ===
            aiPeriod.bondOrigin.trim().toLowerCase();
          const dbDateStr =
            existing.startDate.toISOString().split('T')[0] ?? '';
          return nameMatch && aiDateStr === dbDateStr;
        });
      });

      return filtered.map((period) =>
        CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto.build({
          ...(this.hasValue(period.bondOrigin) && {
            bondOrigin: period.bondOrigin,
          }),
          ...(this.hasValue(period.category) && { category: period.category }),
          ...(this.hasValue(period.activityDescription) && {
            activityDescription: period.activityDescription,
          }),
          startDate: period.startDate,
          ...(this.hasValue(period.endDate) && { endDate: period.endDate }),
          workType: period.workType,
          ...(this.hasValue(period.impactMonths) && {
            impactMonths: period.impactMonths,
          }),
          ...(this.hasValue(period.graceMonths) && {
            graceMonths: period.graceMonths,
          }),
          isPendency: period.isPendency,
          competenceBelowTheMinimum: period.competenceBelowTheMinimum,
          ...(this.hasValue(period.contributionAverage) && {
            contributionAverage: new DecimalValue(period.contributionAverage),
          }),
          ...(this.hasValue(period.pendencyReason) && {
            pendencyReason: period.pendencyReason,
          }),
          ...(this.hasValue(period.periodConsideration) && {
            periodConsideration: period.periodConsideration,
          }),
          ...(this.hasValue(period.wantsToComplementViaMeuINSS) && {
            wantsToComplementViaMeuINSS: period.wantsToComplementViaMeuINSS,
          }),
          status: period.status,
        }),
      );
    } catch {
      return [];
    }
  }

  private hasValue<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  private buildJsonSchema(): object {
    return {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          bondOrigin: {
            type: 'string',
            description:
              'Nome da empresa empregadora, retorne null se não houver.',
          },
          category: {
            type: 'string',
            enum: Object.values(GeneralUrbanRetirementDenialPeriodCategoryEnum),
            description:
              'Categoria do vínculo que consta no CTPS mas não no CNIS.',
          },
          activityDescription: {
            type: 'string',
            description:
              'Descrição da atividade exercida no período, retorne null se não houver.',
          },
          startDate: {
            type: 'string',
            description:
              'Data de início do vínculo, formate em AAAA/MM/DD, ex: 2020/01/15.',
          },
          endDate: {
            type: 'string',
            description:
              'Data de término do vínculo, formate em AAAA/MM/DD, ex: 2020/01/15. Retorne null se não houver data de saída.',
          },
          workType: {
            type: 'string',
            enum: Object.values(GeneralUrbanRetirementDenialPeriodWorkTypeEnum),
            description:
              'Tipo de trabalho realizado no vínculo. Por padrão retorne URBAN.',
          },
          impactMonths: {
            type: 'number',
            description:
              'Número de meses de impacto do período. Retorne null se não disponível.',
          },
          graceMonths: {
            type: 'number',
            description:
              'Número de meses de carência que o vínculo representa. Retorne 0 se não houver.',
          },
          isPendency: {
            type: 'boolean',
            description: 'Indica se o período possui pendência.',
          },
          competenceBelowTheMinimum: {
            type: 'boolean',
            description:
              'Indica se há competências com valor de contribuição abaixo do mínimo legal.',
          },
          contributionAverage: {
            type: 'string',
            description:
              'Valor da contribuição média mensal como string decimal. Retorne null se não houver.',
          },
          pendencyReason: {
            type: 'string',
            enum: Object.values(
              GeneralUrbanRetirementDenialPeriodPendencyReasonEnum,
            ),
            description:
              'Motivo da pendência, se houver. Retorne null se não houver.',
          },
          periodConsideration: {
            type: 'string',
            enum: Object.values(
              GeneralUrbanRetirementDenialPeriodConsiderationEnum,
            ),
            description: 'Consideração do período para o benefício.',
          },
          wantsToComplementViaMeuINSS: {
            type: 'boolean',
            description:
              'Indica se o segurado deseja complementar o período via Meu INSS.',
          },
          status: {
            type: 'boolean',
            description:
              'Indica se o vínculo é favorável ou não para o segurado.',
          },
        },
        required: [
          'startDate',
          'workType',
          'isPendency',
          'competenceBelowTheMinimum',
          'status',
        ],
      },
    };
  }
}
