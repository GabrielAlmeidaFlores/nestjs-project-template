import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isEqual } from 'lodash';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { GetAnalysisToolClientLegalProceedingResponseDto } from '@module/customer/analysis-tool/dto/response/get-analysis-tool-client-legal-proceeding.response.dto';
import { ListAnalysisToolClientLegalProceedingUseCaseGateway } from '@module/customer/analysis-tool/use-case-gateway/list-analysis-tool-client-legal-proceeding.use-case-gateway';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
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

    const response =
      await this.legalProceedingConsumerGateway.consumeByProcessNumber(
        processNumber,
      );

    const safeDetail = JSON.stringify(response);

    const legalProceedingDetail = new LegalProceedingDetailEntity({
      detail: safeDetail,
      analysisToolClientLegalProceeding:
        new AnalysisToolClientLegalProceedingId(
          proceeding.analysisToolClientLegalProceedingId.toString(),
        ),
    });

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

    return [tx, consumeCreditTransaction];
  }
}
