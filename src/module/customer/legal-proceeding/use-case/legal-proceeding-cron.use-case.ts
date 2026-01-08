import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isEqual } from 'lodash';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { GetAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import {
  ApiResponseInterface,
  DestinatarioAdvogadoInterface,
  DestinatarioInterface,
  ItemInterface,
} from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/model/output/comunicacao-pje-legal-proceeding-response.model';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class LegalProceedingCronUseCase {
  protected readonly _type = LegalProceedingCronUseCase.name;
  private readonly logger: Logger;

  public constructor(
    private readonly legalProceedingConsumerGateway: LegalProceedingConsumerGateway,

    @Inject(ListAnalysisToolClientLegalProceedingUseCaseGateway)
    private readonly listAnalysisToolClientLegalProceedingUseCaseGateway: ListAnalysisToolClientLegalProceedingUseCaseGateway,

    @Inject(LegalProceedingDetailCommandRepositoryGateway)
    private readonly legalProceedingDetailCommandRepositoryGateway: LegalProceedingDetailCommandRepositoryGateway,

    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,

    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,

    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,

    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly analysisToolClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
  ) {
    this.logger = new Logger(LegalProceedingCronUseCase.name);
  }

  @Cron(CronExpression.EVERY_5_HOURS)
  public async execute(): Promise<void> {
    const limit = 50;
    let page = 1;
    let hasNextPage: boolean;

    let totalProcessed = 0;
    let totalErrors = 0;

    do {
      try {
        const dto = new ListDataRequestDto();
        dto.page = page;
        dto.limit = limit;
        const proceedingsPage =
          await this.listAnalysisToolClientLegalProceedingUseCaseGateway.execute(
            dto,
          );
        const items = proceedingsPage.resource;
        const transactions: TransactionType[] = [];

        for (const proceeding of items) {
          const tx = await this.processProceeding(proceeding);
          if (tx) {
            transactions.push(...tx);
          }
        }

        if (transactions.length > 0) {
          const transaction =
            await this.baseTransactionRepositoryGateway.execute(transactions);
          await transaction.commit();
          totalProcessed += transactions.length;
        }

        hasNextPage = items.length === limit;
        page++;
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(
            `Error processing page ${page}: ${error.message}`,
            error.stack,
          );
        }
        totalErrors++;
        hasNextPage = false;
      }
    } while (hasNextPage);

    this.logger.log(
      `Cron completed: ${totalProcessed} processed, ${totalErrors} page(s) with errors`,
    );
  }

  private async processProceeding(
    proceeding: GetAnalysisToolClientLegalProceedingResponseDto,
  ): Promise<TransactionType[] | null> {
    let consumeCreditTransaction: TransactionType;

    try {
      consumeCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          proceeding.analysisToolClient.organizationId,
          PaymentPlanPaidResourceTypeEnum.LEGAL_PROCEEDING_MONITORING,
          null,
        );
    } catch {
      return null;
    }

    const processNumber = proceeding.legalProceedingNumber;

    const response: object =
      await this.legalProceedingConsumerGateway.consumeByProcessNumber(
        processNumber,
      );

    const extractData = this.extractDataProceeding(response);

    const safeDetail = JSON.stringify(response);

    const legalProceedingDetail = new LegalProceedingDetailEntity({
      detail: safeDetail,
      analysisToolClientLegalProceeding:
        new AnalysisToolClientLegalProceedingId(
          proceeding.analysisToolClientLegalProceedingId.toString(),
        ),
    });

    const analysisToolClient =
      proceeding.analysisToolClient as unknown as AnalysisToolClientEntity;

    const firstItem =
      extractData.items && extractData.items.length > 0
        ? extractData.items[0]
        : null;

    const analysisToolClientLegalProceeding =
      new AnalysisToolClientLegalProceedingEntity({
        id: new AnalysisToolClientLegalProceedingId(
          proceeding.analysisToolClientLegalProceedingId.toString(),
        ),
        analysisToolClient,
        legalProceedingNumber: proceeding.legalProceedingNumber,
        type:
          firstItem !== null && firstItem?.tipoComunicacao !== undefined
            ? firstItem.tipoComunicacao
            : 'Desconhecido',
        status:
          firstItem !== null && firstItem?.status !== undefined
            ? firstItem.status === 'P'
              ? 'Pendente'
              : 'Concluído'
            : 'Desconhecido',
        lastUpdated:
          firstItem !== null && firstItem?.data_disponibilizacao !== undefined
            ? new Date(firstItem.data_disponibilizacao)
            : null,
        deadline: null,
      });

    const updatedRegister =
      this.analysisToolClientLegalProceedingCommandRepositoryGateway.updateAnalysisToolClientLegalProceeding(
        new AnalysisToolClientLegalProceedingId(
          proceeding.analysisToolClientLegalProceedingId.toString(),
        ),
        analysisToolClientLegalProceeding,
      );

    const proceedingsExist =
      await this.legalProceedingDetailQueryRepositoryGateway.findLastCreated(
        proceeding.analysisToolClientLegalProceedingId,
        proceeding.legalProceedingNumber,
      );

    if (proceedingsExist && isEqual(proceedingsExist.detail, safeDetail)) {
      return null;
    }

    const tx =
      this.legalProceedingDetailCommandRepositoryGateway.createLegalProceedingDetail(
        legalProceedingDetail,
      );

    return [tx, consumeCreditTransaction, updatedRegister];
  }

  private extractDataProceeding(data: unknown): ApiResponseInterface {
    let parsed: Record<string, unknown> = {};

    if (typeof data === 'string') {
      try {
        parsed = JSON.parse(data) as Record<string, unknown>;
      } catch {
        parsed = {};
      }
    } else if (typeof data === 'object' && data !== null) {
      parsed = data as Record<string, unknown>;
    }

    const source = (parsed['data'] ?? parsed) as Record<string, unknown>;

    const itemsRaw = Array.isArray(source['items'])
      ? source['items']
      : Array.isArray(parsed['items'])
        ? parsed['items']
        : [];

    const items: ItemInterface[] = (itemsRaw as unknown[]).map(
      (itRaw): ItemInterface => {
        const it = itRaw as Record<string, unknown>;
        return {
          id: it['id'] as number | undefined,
          data_disponibilizacao:
            (it['data_disponibilizacao'] as string | undefined) ??
            (it['datadisponibilizacao'] as string | undefined),
          datadisponibilizacao:
            (it['datadisponibilizacao'] as string | undefined) ??
            (it['data_disponibilizacao'] as string | undefined),
          siglaTribunal: it['siglaTribunal'] as string | undefined,
          tipoComunicacao:
            (it['tipoComunicacao'] as string | undefined) ??
            (it['tipo'] as string | undefined),
          nomeOrgao: it['nomeOrgao'] as string | undefined,
          idOrgao: it['idOrgao'] as number | undefined,
          texto: it['texto'] as string | undefined,
          numero_processo: it['numero_processo'] as string | undefined,
          meio: it['meio'] as string | undefined,
          link: it['link'] as string | undefined,
          tipoDocumento: it['tipoDocumento'] as string | undefined,
          nomeClasse: it['nomeClasse'] as string | undefined,
          codigoClasse: it['codigoClasse'] as string | undefined,
          numeroComunicacao: it['numeroComunicacao'] as number | undefined,
          ativo: it['ativo'] as boolean | undefined,
          hash: it['hash'] as string | undefined,
          status: it['status'] as string | undefined,
          motivo_cancelamento:
            (it['motivo_cancelamento'] as string | null | undefined) ?? null,
          data_cancelamento:
            (it['data_cancelamento'] as string | null | undefined) ?? null,
          meiocompleto: it['meiocompleto'] as string | undefined,
          numeroprocessocommascara: it['numeroprocessocommascara'] as
            | string
            | undefined,
          destinatarios: Array.isArray(it['destinatarios'])
            ? (it['destinatarios'] as unknown[]).map(
                (dRaw): DestinatarioInterface => {
                  const d = dRaw as Record<string, unknown>;
                  return {
                    comunicacao_id: d['comunicacao_id'] as number | undefined,
                    nome: d['nome'] as string | undefined,
                    polo: d['polo'] as string | undefined,
                  };
                },
              )
            : undefined,
          destinatarioadvogados: Array.isArray(it['destinatarioadvogados'])
            ? (it['destinatarioadvogados'] as DestinatarioAdvogadoInterface[])
            : undefined,
        };
      },
    );

    return {
      status:
        (source['status'] as string | undefined) ??
        (parsed['status'] as string | undefined),
      message:
        (source['message'] as string | undefined) ??
        (parsed['message'] as string | undefined),
      count:
        typeof source['count'] === 'number'
          ? source['count']
          : (parsed['count'] as number | undefined),
      items,
    };
  }
}
