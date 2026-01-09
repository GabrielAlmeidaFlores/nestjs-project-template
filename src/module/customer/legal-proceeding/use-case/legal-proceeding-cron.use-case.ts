import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { isEqual } from 'lodash';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client.query.result';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { GetAnalysisToolClientLegalProceedingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding-with-relations.query.result';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import { ResourceNotEnabledError } from '@module/customer/organization-credit/error/resource-not-enabled.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanInactiveError } from '@module/customer/payment-plan/error/payment-plan-inactive.error';

@Injectable()
export class LegalProceedingCronUseCase {
  protected readonly _type = LegalProceedingCronUseCase.name;
  private readonly logger: Logger;

  public constructor(
    private readonly legalProceedingConsumerGateway: LegalProceedingConsumerGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,

    @Inject(LegalProceedingDetailCommandRepositoryGateway)
    private readonly legalProceedingDetailCommandRepositoryGateway: LegalProceedingDetailCommandRepositoryGateway,

    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,

    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,

    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,

    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly analysisToolClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
  ) {
    this.logger = new Logger(LegalProceedingCronUseCase.name);
  }

  @Cron(CronExpression.EVERY_5_HOURS)
  public async execute(): Promise<void> {
    const limit = 10;
    let page = 1;
    let hasNextPage: boolean;

    let totalProcessed = 0;
    let totalErrors = 0;

    do {
      try {
        const dto = new ListDataInputModel({
          page,
          limit,
        });

        const proceedingsPage =
          await this.analysisToolClientLegalProceedingQueryRepositoryGateway.listAnalysisToolClientLegalProceeding(
            dto,
          );

        const items = proceedingsPage.resource;
        const transactions: TransactionType[] = [];

        for (const proceeding of items) {
          try {
            const tx = await this.processProceeding(proceeding);
            if (tx) {
              transactions.push(...tx);
            }
          } catch (error) {
            if (error instanceof Error) {
              this.logger.error(
                `Error processing proceeding ID ${proceeding.id.toString()}: ${error.message}`,
                error.stack,
              );
            }
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
    proceeding: GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
  ): Promise<TransactionType[] | null> {
    if (
      proceeding.analysisToolClient instanceof
        GetAnalysisToolClientQueryResult ===
        false ||
      proceeding.analysisToolClient.id instanceof AnalysisToolClientId === false
    ) {
      this.logger.warn(
        `Proceeding ID ${proceeding.id.toString()} has no associated AnalysisToolClient ID. Skipping.`,
      );

      return null;
    }

    let consumeCreditTransaction: TransactionType;

    const analysisToolClientQuery =
      await this.analysisToolClientQueryRepositoryGateway.findOneByIdWithRelations(
        proceeding.analysisToolClient.id,
      );

    if (!analysisToolClientQuery) {
      this.logger.warn(
        `AnalysisToolClient with ID ${proceeding.analysisToolClient.id.toString()} not found. Skipping proceeding ID ${proceeding.id.toString()}.`,
      );
      return null;
    }

    try {
      consumeCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          analysisToolClientQuery.createdBy.organizationId,
          PaymentPlanPaidResourceTypeEnum.LEGAL_PROCEEDING_MONITORING,
          null,
        );
    } catch (error) {
      if (error instanceof PaymentPlanInactiveError) {
        this.logger.warn(
          `Payment plan inactive for Organization ID ${analysisToolClientQuery.createdBy.organizationId.toString()}. Skipping proceeding ID ${proceeding.id.toString()}.`,
        );
        return null;
      }

      if (error instanceof ResourceNotEnabledError) {
        this.logger.warn(
          `Legal Proceeding Monitoring resource not enabled for Organization ID ${analysisToolClientQuery.createdBy.organizationId.toString()}. Skipping proceeding ID ${proceeding.id.toString()}.`,
        );
        return null;
      }

      return null;
    }

    const processNumber = proceeding.legalProceedingNumber;

    const response =
      await this.legalProceedingConsumerGateway.consumeByProcessNumber(
        processNumber,
      );

    const safeDetail = JSON.stringify(response);

    const responseDetails =
      this.legalProceedingConsumerGateway.extractLegalProceedingData(
        safeDetail,
      );

    const legalProceedingDetail = new LegalProceedingDetailEntity({
      detail: safeDetail,
      analysisToolClientLegalProceeding:
        new AnalysisToolClientLegalProceedingId(proceeding.id.toString()),
    });

    const proceedingsExist =
      await this.legalProceedingDetailQueryRepositoryGateway.findLastCreated(
        proceeding.id,
        proceeding.legalProceedingNumber,
      );

    if (proceedingsExist && isEqual(proceedingsExist.detail, safeDetail)) {
      return null;
    }

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientQuery,
      createdBy: analysisToolClientQuery.createdBy.id,
      updatedBy: analysisToolClientQuery.updatedBy.id,
    });

    const analysisToolClientLegalProceeding =
      new AnalysisToolClientLegalProceedingEntity({
        ...proceeding,
        analysisToolClient,
        ...responseDetails,
      });

    const updateLegalProceeding =
      this.analysisToolClientLegalProceedingCommandRepositoryGateway.updateAnalysisToolClientLegalProceeding(
        analysisToolClientLegalProceeding.id,
        analysisToolClientLegalProceeding,
      );

    const createLegalProceedingDetail =
      this.legalProceedingDetailCommandRepositoryGateway.createLegalProceedingDetail(
        legalProceedingDetail,
      );

    this.logger.log(
      `Processed proceeding ID ${proceeding.id.toString()} for AnalysisToolClient ID ${proceeding.analysisToolClient.id.toString()}.`,
    );

    return [
      createLegalProceedingDetail,
      consumeCreditTransaction,
      updateLegalProceeding,
    ];
  }
}
