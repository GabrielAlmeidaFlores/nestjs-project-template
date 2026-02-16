import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rgps-not-found.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { CompareRetirementPlanningRgpsCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/compare-retirement-planning-rgps-cnis-ctps.request.dto';
import { CompareRetirementPlanningRgpsCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/compare-retirement-planning-rgps-cnis-ctps.response.dto';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CompareRetirementPlanningRgpsCnisCtpsUseCase {
  protected readonly _type = CompareRetirementPlanningRgpsCnisCtpsUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(RetirementPlanningRgpsResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsResultCommandRepositoryGateway: RetirementPlanningRgpsResultCommandRepositoryGateway,
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
    dto: CompareRetirementPlanningRgpsCnisCtpsRequestDto,
  ): Promise<CompareRetirementPlanningRgpsCnisCtpsResponseDto> {
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

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS,
        organizationMember.id,
      );

    if (retirementPlanningRgps.cnisDocument === null) {
      throw new RetirementPlanningRgpsNotFoundError();
    }

    const cnisDocumentBuffer = await this.fileProcessorGateway.getFileBuffer(
      retirementPlanningRgps.cnisDocument,
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

    const updatedRetirementPlanningRgpsResult =
      new RetirementPlanningRgpsResultEntity({
        ...retirementPlanningRgps.retirementPlanningRgpsResult,
        compareCnisCtps: result,
        compareCnisCtpsRaw: result,
      });

    if (!retirementPlanningRgps.retirementPlanningRgpsResult) {
      throw new RetirementPlanningRgpsNotFoundError();
    }

    const retirementPlanningRgpsResult =
      this.retirementPlanningRgpsResultCommandRepositoryGateway.updateRetirementPlanningRgpsResult(
        retirementPlanningRgps.retirementPlanningRgpsResult.id,
        updatedRetirementPlanningRgpsResult,
      );

    const transactions = await this.baseTransactionRepositoryGateway.execute([
      retirementPlanningRgpsResult,
      consumeCreditTransaction,
    ]);

    await transactions.commit();

    return CompareRetirementPlanningRgpsCnisCtpsResponseDto.build({
      result,
      compareCnisCtpsRaw:
        updatedRetirementPlanningRgpsResult.compareCnisCtpsRaw ?? 'N/A',
    });
  }
}
