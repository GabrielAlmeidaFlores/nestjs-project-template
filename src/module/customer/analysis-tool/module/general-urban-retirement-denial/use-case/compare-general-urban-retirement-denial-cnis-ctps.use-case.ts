import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { MarkdownConverterGateway } from '@lib/markdown-converter/markdown-converter.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementDenialQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial/query/general-urban-retirement-denial.query.repository.gateway';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/enum/general-urban-retirement-denial-document-type.enum';
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
  tipo: string;
  empresa: string;
  periodoInicio: string;
  periodoFim: string;
  viabilidade: string;
  reconhecimentoINSS: string;
  impactoCarencia: boolean;
  reconhecimentoJudicial: string;
  tempoContribuicao: string;
  observacaoTecnica?: string;
  contribuicaoMedia: string;
  status: boolean;
  tipoDeTrabalho: string;
  competenciaAbaixoDoMinimo: boolean;
  categoria: string;
  carencia: string;
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
    @Inject(MarkdownConverterGateway)
    private readonly markdownConverterGateway: MarkdownConverterGateway,
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

    const periods = await this.buildFilteredPeriods(
      result,
      generalUrbanRetirementDenial,
    );

    return CompareGeneralUrbanRetirementDenialCnisCtpsResponseDto.build({
      periods,
    });
  }

  private async buildFilteredPeriods(
    result: string,
    generalUrbanRetirementDenial: Awaited<
      ReturnType<
        typeof this.generalUrbanRetirementDenialQueryRepositoryGateway.findOneByGeneralUrbanRetirementDenialIdOrFailWithRelations
      >
    >,
  ): Promise<
    CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto[]
  > {
    try {
      const parsedResult = JSON.parse(
        result,
      ) as CompareCnisCtpsResultItemInterface[];

      for (const item of parsedResult) {
        if (item.observacaoTecnica !== undefined) {
          item.observacaoTecnica =
            await this.markdownConverterGateway.convertToHtml(
              item.observacaoTecnica,
            );
        }
      }

      const existingPeriods =
        generalUrbanRetirementDenial.generalUrbanRetirementDenialPeriod ?? [];

      const filtered = parsedResult.filter((aiPeriod) => {
        const aiDateStr = aiPeriod.periodoInicio.replace(/\//g, '-');
        return !existingPeriods.some((existing) => {
          if (existing.bondOrigin === null) {
            return false;
          }
          const nameMatch =
            existing.bondOrigin.trim().toLowerCase() ===
            aiPeriod.empresa.trim().toLowerCase();
          const dbDateStr =
            existing.startDate.toISOString().split('T')[0] ?? '';
          return nameMatch && aiDateStr === dbDateStr;
        });
      });

      return filtered.map((period) =>
        CompareGeneralUrbanRetirementDenialCnisCtpsPeriodItemResponseDto.build({
          tipo: period.tipo,
          empresa: period.empresa,
          periodoInicio: period.periodoInicio,
          periodoFim: period.periodoFim,
          viabilidade: period.viabilidade,
          reconhecimentoINSS: period.reconhecimentoINSS,
          impactoCarencia: period.impactoCarencia,
          reconhecimentoJudicial: period.reconhecimentoJudicial,
          tempoContribuicao: period.tempoContribuicao,
          observacaoTecnica: period.observacaoTecnica ?? '',
          contribuicaoMedia: period.contribuicaoMedia,
          status: period.status,
          tipoDeTrabalho: period.tipoDeTrabalho,
          competenciaAbaixoDoMinimo: period.competenciaAbaixoDoMinimo,
          categoria: period.categoria,
          carencia: period.carencia,
        }),
      );
    } catch {
      return [];
    }
  }

  private buildJsonSchema(): object {
    return {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tipo: {
            type: 'string',
            description:
              'Tipo de vínculo analisado, neste caso sempre será VINCULO_FALTANTE_CNIS',
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
              'Valor da contribuição média mensal, retorne vazio se não houver.',
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
              'Indica se há competências com valor de contribuição abaixo do mínimo legal, considerando o ano de referência é o salário mínimo vigente na época do Brasil.',
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
          carencia: {
            type: 'string',
            description:
              'Número de meses distinto de carência que o vínculo representa, retorne 0 se não houver. Considere carência como o número de meses que o vínculo contribui para a aposentadoria. Exemplo: Se o vínculo é de 6 meses, retorne 6.',
          },
        },
        required: [
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
          'carencia',
        ],
      },
    };
  }
}
