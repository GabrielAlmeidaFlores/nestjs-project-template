import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/request/compare-general-urban-retirement-review-cnis-ctps.request.dto';
import { CompareGeneralUrbanRetirementReviewCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-review/dto/response/compare-general-urban-retirement-review-cnis-ctps.response.dto';
import { GeneralUrbanRetirementReviewNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement-review/error/general-urban-retirement-review-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CompareGeneralUrbanRetirementReviewCnisCtpsUseCase {
  protected readonly _type =
    CompareGeneralUrbanRetirementReviewCnisCtpsUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementReviewQueryRepositoryGateway)
    private readonly generalUrbanRetirementReviewQueryRepositoryGateway: GeneralUrbanRetirementReviewQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(GeneralUrbanRetirementReviewResultCommandRepositoryGateway)
    private readonly generalUrbanRetirementReviewResultCommandRepositoryGateway: GeneralUrbanRetirementReviewResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
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
    dto: CompareGeneralUrbanRetirementReviewCnisCtpsRequestDto,
  ): Promise<CompareGeneralUrbanRetirementReviewCnisCtpsResponseDto> {
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_COMPARE_CNIS_CTPS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.GENERAL_URBAN_RETIREMENT_REVIEW_COMPARE_CNIS_CTPS,
        organizationMember.id,
      );

    if (generalUrbanRetirementReview.cnisDocument === null) {
      throw new GeneralUrbanRetirementReviewNotFoundError();
    }

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      generalUrbanRetirementReview.cnisDocument,
    );
    const files: Buffer[] = [cnisDocumentBuffer];

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
                      'Observações técnicas, retorne vazio se não houver.',
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
            },
          }),
        }),
      )) ?? '';

    if (!generalUrbanRetirementReview.generalUrbanRetirementReviewResult) {
      throw new GeneralUrbanRetirementReviewNotFoundError();
    }

    const updatedGeneralUrbanRetirementReviewResult =
      new GeneralUrbanRetirementReviewResultEntity({
        ...generalUrbanRetirementReview.generalUrbanRetirementReviewResult,
        compareCnisCtps: result,
        compareCnisCtpsRaw: result,
      });

    const generalUrbanRetirementReviewResult =
      this.generalUrbanRetirementReviewResultCommandRepositoryGateway.updateGeneralUrbanRetirementReviewResult(
        generalUrbanRetirementReview.generalUrbanRetirementReviewResult.id,
        updatedGeneralUrbanRetirementReviewResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      generalUrbanRetirementReviewResult,
      consumeCreditTransaction,
    ]);

    await transactions.commit();

    return CompareGeneralUrbanRetirementReviewCnisCtpsResponseDto.build({
      result,
      compareCnisCtpsRaw:
        updatedGeneralUrbanRetirementReviewResult.compareCnisCtpsRaw ?? 'N/A',
    });
  }
}
