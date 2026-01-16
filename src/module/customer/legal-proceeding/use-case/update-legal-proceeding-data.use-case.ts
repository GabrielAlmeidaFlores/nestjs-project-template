import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { isEqual } from 'lodash';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { EventEnum } from '@lib/event/enum/event.enum';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-limited-responsible-relations.query.result ';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/analysis-tool-client-legal-proceeding.entity';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { LegalProceedingDetailCommandRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/command/legal-proceeding-detail.command.repository.gateway';
import { LegalProceedingDetailQueryRepositoryGateway } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/legal-proceeding-detail.query.repository.gateway';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingNumberNotFoundError } from '@module/customer/legal-proceeding/error/legal-proceeding-number-not-found.error';
import { LegalProceedingConsumerGateway } from '@module/customer/legal-proceeding/lib/legal-proceeding-consumer/legal-proceeding-consumer.gateway';
import { ResourceNotEnabledError } from '@module/customer/organization-credit/error/resource-not-enabled.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanInactiveError } from '@module/customer/payment-plan/error/payment-plan-inactive.error';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class UpdateLegalProceedingDataUseCase {
  protected readonly _type = UpdateLegalProceedingDataUseCase.name;

  public constructor(
    private readonly legalProceedingConsumerGateway: LegalProceedingConsumerGateway,

    @Inject(LegalProceedingDetailCommandRepositoryGateway)
    private readonly legalProceedingDetailCommandRepositoryGateway: LegalProceedingDetailCommandRepositoryGateway,

    @Inject(LegalProceedingDetailQueryRepositoryGateway)
    private readonly legalProceedingDetailQueryRepositoryGateway: LegalProceedingDetailQueryRepositoryGateway,

    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,

    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingCommandRepositoryGateway)
    private readonly analysisToolClientLegalProceedingCommandRepositoryGateway: AnalysisToolClientLegalProceedingCommandRepositoryGateway,

    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,

    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,

    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,

    @Inject(AnalysisToolClientLegalProceedingQueryRepositoryGateway)
    private readonly analysisToolClientLegalProceedingQueryRepositoryGateway: AnalysisToolClientLegalProceedingQueryRepositoryGateway,
  ) {}

  @OnEvent(EventEnum.UPDATE_LEGAL_PROCEEDING_DATA)
  public async execute(id: AnalysisToolClientLegalProceedingId): Promise<void> {
    const proceeding =
      await this.analysisToolClientLegalProceedingQueryRepositoryGateway.findByOneAnalysisToolClientLegalProceedingId(
        id,
      );

    if (!proceeding) {
      throw new LegalProceedingNumberNotFoundError();
    }

    let consumeCreditTransaction: TransactionType;

    const analysisToolClientQuery =
      await this.analysisToolClientQueryRepositoryGateway.findOneByIdWithRelations(
        proceeding.analysisToolClient.id,
      );

    if (!analysisToolClientQuery) {
      throw new AnalysisToolClientNotFoundError();
    }

    try {
      consumeCreditTransaction =
        await this.consumeOrganizationCreditUseCase.execute(
          analysisToolClientQuery.createdBy.organizationId,
          PaymentPlanPaidResourceTypeEnum.LEGAL_PROCEEDING_MONITORING,
          null,
        );
    } catch (error) {
      if (
        error instanceof ResourceNotEnabledError ||
        error instanceof PaymentPlanInactiveError
      ) {
        return;
      }

      throw error;
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
      return;
    }

    if (proceedingsExist) {
      void this.sendUpdateEmail(
        analysisToolClientQuery,
        proceeding.legalProceedingNumber,
        safeDetail,
      );
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

    const transactions = [
      createLegalProceedingDetail,
      consumeCreditTransaction,
      updateLegalProceeding,
    ];

    const executedTransactions =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await executedTransactions.commit();
  }

  private async sendUpdateEmail(
    analysisToolClient: GetAnalysisToolClientWithLimitedResponsibleRelationsQueryResult,
    legalProceedingNumber: string,
    updateDetail: string,
  ): Promise<void> {
    const createdByCustomer =
      await this.customerQueryRepositoryGateway.findOneByOrganizationMemberIdWithAuthIdentityRelation(
        analysisToolClient.createdBy.id,
      );

    if (createdByCustomer === null) {
      return;
    }

    const userEmail = createdByCustomer.authIdentity.email;
    const userName = createdByCustomer.name;

    const updateContent =
      this.legalProceedingConsumerGateway.extractLegalProceedingData(
        updateDetail,
      );

    const updateLegalProceedingContent =
      updateContent.textContent ?? 'Conteúdo não disponível';

    const to = [userEmail.toString()];

    if (analysisToolClient.email !== null) {
      to.push(analysisToolClient.email.toString());
    }

    if (analysisToolClient.corporateEmail !== null) {
      to.push(analysisToolClient.corporateEmail.toString());
    }

    await this.emailGateway.sendHTMLEmail(
      SendHTMLEmailInputModel.build({
        to,
        subject: EmailApplicationVariable.EMAIL_LEGAL_PROCEEDING_UPDATE_SUBJECT,
        emailTemplateName:
          EmailApplicationVariable.EMAIL_LEGAL_PROCEEDING_UPDATE_TEMPLATE,
        emailTemplateParameters: {
          name: userName,
          legalProceedingNumber,
          updateLegalProceedingContent,
        },
      }),
    );
  }
}
