import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenerativeIaResponseMimeTypeEnum } from '@infra/generative-ia/enum/generative-ia-response-mime-type.enum';
import { GenerativeIaGateway } from '@infra/generative-ia/generative-ia.gateway';
import { GenerateResponseInputModel } from '@infra/generative-ia/model/input/generate-response.input.model';
import { ResponseConfigInputModel } from '@infra/generative-ia/model/input/response-config.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { FileProcessorGateway } from '@module/customer/analysis-tool/lib/file-processor/file-processor.gateway';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-earnings-history/query/retirement-planning-rgps-earnings-history.query.repository.gateway';
import { RetirementPlanningRgpsPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period/query/retirement-planning-rgps-period.query.repository.gateway';
import { RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-period-document/command/retirement-planning-rgps-period-document.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import { CreateRetirementPlanningRgpsPeriodDocumentRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/create-retirement-planning-rgps-period-document.request.dto';
import { CreateRetirementPlanningRgpsPeriodDocumentResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/create-retirement-planning-rgps-period-document.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-not-found.error';
import { RetirementPlanningRgpsPeriodNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-period-not-found.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { FileModel } from '@shared/system/model/generic/file.model';

@Injectable()
export class CreateRetirementPlanningRgpsPeriodDocumentUseCase {
  protected readonly _type =
    CreateRetirementPlanningRgpsPeriodDocumentUseCase.name;

  public constructor(
    @Inject(GenerativeIaGateway)
    private readonly generativeIaGateway: GenerativeIaGateway,
    @Inject(RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway: RetirementPlanningRgpsPeriodDocumentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(FileProcessorGateway)
    private readonly fileProcessorGateway: FileProcessorGateway,
    @Inject(RetirementPlanningRgpsPeriodQueryRepositoryGateway)
    private readonly retirementPlanningRgpsPeriodQueryRepositoryGateway: RetirementPlanningRgpsPeriodQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway)
    private readonly retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway: RetirementPlanningRgpsEarningsHistoryQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CreateRetirementPlanningRgpsPeriodDocumentRequestDto,
  ): Promise<CreateRetirementPlanningRgpsPeriodDocumentResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const period = new RetirementPlanningRgpsPeriodEntity({
      id: dto.json.retirementPlanningRgpsPeriodId,
    });

    const [periodData, earnings] = await Promise.all([
      this.retirementPlanningRgpsPeriodQueryRepositoryGateway.findOneByRetirementPlanningRgpsPeriodIdOrFailWithRelations(
        dto.json.retirementPlanningRgpsPeriodId,
        RetirementPlanningRgpsPeriodNotFoundError,
      ),
      this.retirementPlanningRgpsEarningsHistoryQueryRepositoryGateway.findByRetirementPlanningRgpsPeriodId(
        dto.json.retirementPlanningRgpsPeriodId,
      ),
    ]);

    const rgpsId = new RetirementPlanningRgpsId(
      periodData.retirementPlanningRgps?.id.toString() ?? '',
    );
    const rgpsData =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        rgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    const documents = await Promise.all(
      dto.documents.map(async (d) => {
        const buffer = d.file.base64.decodeToBuffer();

        const fileModel = FileModel.build({
          buffer,
          originalName: d.file.originalFileName,
          size: buffer.length,
          encoding: '7bit',
        });

        const documentUrl =
          await this.fileProcessorGateway.uploadFile(fileModel);

        return new RetirementPlanningRgpsPeriodDocumentEntity({
          document: documentUrl,
          retirementPlanningRgpsPeriod: period,
        });
      }),
    );

    const transactions = documents.map((doc) =>
      this.retirementPlanningRgpsPeriodDocumentCommandRepositoryGateway.createRetirementPlanningRgpsPeriodDocument(
        doc,
      ),
    );

    if (transactions.length > 0) {
      const tx =
        await this.baseTransactionRepositoryGateway.execute(transactions);
      await tx.commit();
    }

    const promptResponse =
      await this.getPaymentPlanPaidResourcePromptUseCase.execute(
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS,
      );

    const consumeCreditTransaction =
      await this.consumeOrganizationCreditUseCase.execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS,
        organizationMember.id,
      );

    const files: Buffer[] = [];

    dto.documents.forEach((doc) => {
      files.push(Buffer.from(doc.file.base64.toString(), 'base64'));
    });

    if (rgpsData.cnisDocument !== null) {
      const cnisBuffer = await this.fileProcessorGateway.getFileBuffer(
        rgpsData.cnisDocument,
      );
      files.push(cnisBuffer);
    }

    const clientResult = rgpsData.retirementPlanningRgpsResult;
    const clientSection = clientResult
      ? `## Dados do Cliente

**Nome:** ${clientResult.clientName ?? 'não informado'}
**CPF:** ${clientResult.clientFederalDocument?.toString() ?? 'não informado'}
**Data de Nascimento:** ${clientResult.clientBirthDate?.toLocaleDateString('pt-BR') ?? 'não informado'}
**Data da Última Filiação:** ${clientResult.clientLastAffiliationDate?.toLocaleDateString('pt-BR') ?? 'não informado'}
`
      : '';

    const benefitsSection =
      rgpsData.retirementPlanningRgpsBenefit !== null &&
      rgpsData.retirementPlanningRgpsBenefit.length > 0
        ? `## Benefícios INSS Registrados\n\n` +
          rgpsData.retirementPlanningRgpsBenefit
            .map((b) => `- Benefício nº ${b.inssBenefitNumber}`)
            .join('\n') +
          '\n'
        : '';

    const allPeriodsSection =
      rgpsData.retirementPlanningRgpsPeriod !== null &&
      rgpsData.retirementPlanningRgpsPeriod.length > 0
        ? `## Todos os Períodos CNIS da Análise\n\n` +
          rgpsData.retirementPlanningRgpsPeriod
            .map(
              (p) =>
                `- Seq ${p.sequencial ?? '-'} | ${p.periodName ?? 'sem nome'} | ${p.periodStart?.toLocaleDateString('pt-BR') ?? '?'} a ${p.periodEnd?.toLocaleDateString('pt-BR') ?? 'em aberto'} | Pendente: ${p.isPendency === true ? 'Sim' : 'Não'}`,
            )
            .join('\n') +
          '\n'
        : '';

    const reasonLabels: Record<string, string> = {
      LEAVE_DATE: 'Data de saída ausente',
      COMPETENCE_BELOW_MINIMUM: 'Competências abaixo do mínimo',
      INCONSISTENT_COMPETENCE: 'Competências inconsistentes (PEXT)',
    };

    const sortedEarnings = earnings
      .filter((e) => e.competence !== null)
      .sort(
        (a, b) =>
          (a.competence ?? new Date(0)).getTime() -
          (b.competence ?? new Date(0)).getTime(),
      );

    const earningsRows = sortedEarnings
      .map(
        (e) =>
          `| ${(e.competence ?? new Date(0)).toLocaleDateString('pt-BR')} | ${e.remuneration ?? '-'} | ${e.contribution ?? '-'} | ${e.indicators ?? '-'} | ${e.paymentDate?.toLocaleDateString('pt-BR') ?? '-'} | ${e.competenceBelowTheMinimum === true ? 'Sim' : 'Não'} |`,
      )
      .join('\n');

    const periodContext = `${clientSection}${benefitsSection}${allPeriodsSection}## Dados do Período de Contribuição RGPS (Período Analisado)

**Sequencial CNIS:** ${periodData.sequencial ?? 'não informado'}
**Empregador / Nome do vínculo:** ${periodData.periodName ?? 'não informado'}
**Categoria:** ${periodData.category ?? 'não informado'}
**Tipo de contribuição:** ${periodData.typeOfContribution ?? 'não informado'}
**Período registrado no CNIS:** ${periodData.periodStart?.toLocaleDateString('pt-BR') ?? 'não informado'} a ${periodData.periodEnd?.toLocaleDateString('pt-BR') ?? 'em aberto (sem data de saída)'}
**Média contributiva:** ${periodData.contributionAverage ? `R$ ${periodData.contributionAverage.toNumber().toFixed(2)}` : 'não informado'}
**Pendência:** ${periodData.isPendency === true ? 'Sim' : 'Não'}
**Motivo da pendência:** ${periodData.reasonPendency !== null ? (reasonLabels[periodData.reasonPendency] ?? periodData.reasonPendency) : 'não informado'}

## Histórico de Competências

| Competência | Remuneração | Contribuição | Indicadores | Data Pagamento | Abaixo do Mínimo |
|-------------|-------------|--------------|-------------|----------------|------------------|
${earningsRows || '| Sem registros | - | - | - | - | - |'}

## Instrução para o campo "observacaoTecnica"

Com base nos dados e documentos acima, gere uma observação técnica previdenciária detalhada.

**IMPORTANTE — regras obrigatórias para o campo "observacaoTecnica":**
- Use EXCLUSIVAMENTE Markdown puro: cabeçalhos com #/##/###, listas com -, tabelas com |, negrito com **
- NÃO use tags HTML (<h1>, <strong>, <br>, etc.) em nenhuma hipótese
- Estruture com as seções: 1. Identificação do vínculo e contextualização; 2. Fundamentação técnica e legal (Lei 8.213/91, Decreto 3.048/99, IN INSS 128/2022); 3. Análise dos documentos apresentados e determinação da data final; 4. Conclusão`;

    const result =
      (await this.generativeIaGateway.generateFlashResponseFromPromptAndFiles(
        GenerateResponseInputModel.build({
          systemInstruction: promptResponse.prompt,
          prompt: periodContext,
          promptFiles: files,
          responseConfig: ResponseConfigInputModel.build({
            responseMimeType: GenerativeIaResponseMimeTypeEnum.APPLICATION_JSON,
            jsonSchema: {
              type: 'object',
              properties: {
                observacaoTecnica: {
                  type: 'string',
                  description:
                    'Observação técnica previdenciária detalhada em formato Markdown puro (use #/##/###, -, |, **). NÃO use HTML.',
                },
                dataFinalDoVinculo: {
                  type: 'string',
                  description:
                    'Data final do vínculo trabalhista que foi analisado. Formato DD/MM/AAAA. Se não for possível determinar, retorne uma string vazia.',
                },
              },
              required: ['observacaoTecnica', 'dataFinalDoVinculo'],
            },
          }),
        }),
      )) ?? '';

    const transactionCredit =
      await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
      ]);

    await transactionCredit.commit();

    return CreateRetirementPlanningRgpsPeriodDocumentResponseDto.build({
      result,
    });
  }
}
