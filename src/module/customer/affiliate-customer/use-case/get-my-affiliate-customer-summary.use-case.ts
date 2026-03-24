import { Inject, Injectable } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { GetMyAffiliateCustomerSummaryResponseDto } from '@module/customer/affiliate-customer/dto/response/get-my-affiliate-customer-summary.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/customer/affiliate-customer/error/affiliate-customer-not-found.error';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';
import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMyAffiliateCustomerSummaryUseCase {
  protected readonly _type = GetMyAffiliateCustomerSummaryUseCase.name;

  private readonly lastMonthInDays: number;
  private readonly lastYearInDays: number;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway)
    private readonly commissionQueryRepository: OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway,
    @Inject(AffiliateBankTransferQueryRepositoryGateway)
    private readonly affiliateBankTransferQueryRepository: AffiliateBankTransferQueryRepositoryGateway,
    @Inject(BankTransferQueryRepositoryGateway)
    private readonly bankTransferQueryRepository: BankTransferQueryRepositoryGateway,
  ) {
    this.lastMonthInDays = 30;
    this.lastYearInDays = 365;
  }

  public async execute(
    sessionData: SessionDataModel,
  ): Promise<GetMyAffiliateCustomerSummaryResponseDto> {
    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneByCustomerId(
        customer.id,
      );

    if (!affiliate) {
      throw new AffiliateCustomerNotFoundError();
    }

    const commissions =
      await this.commissionQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    const affiliateTransfers =
      await this.affiliateBankTransferQueryRepository.findManyByAffiliatePlanCommissionIds(
        commissions.map((c) => c.id),
      );

    const bankTransfers = await this.bankTransferQueryRepository.findManyByIds(
      affiliateTransfers.map((t) => t.bankTransferId),
    );

    const now = new Date();

    const cutoffLastMonth = new Date(now);
    cutoffLastMonth.setDate(cutoffLastMonth.getDate() - this.lastMonthInDays);

    const cutoffLast365Days = new Date(now);
    cutoffLast365Days.setDate(
      cutoffLast365Days.getDate() - this.lastYearInDays,
    );

    return GetMyAffiliateCustomerSummaryResponseDto.build({
      conversions: commissions.length,
      earningsLastMonth: this.sumCompletedTransfers(
        bankTransfers,
        cutoffLastMonth,
      ),
      earningsLast365Days: this.sumCompletedTransfers(
        bankTransfers,
        cutoffLast365Days,
      ),
      pendingAmount: this.sumPendingTransfers(bankTransfers),
    });
  }

  private sumCompletedTransfers(
    bankTransfers: {
      amount: { toNumber(): number };
      status: TransferStatusEnum;
      transferDate: Date | null;
      createdAt: Date;
    }[],
    since: Date,
  ): number {
    return bankTransfers
      .filter(
        (bt) =>
          bt.status === TransferStatusEnum.DONE &&
          (bt.transferDate ?? bt.createdAt) >= since,
      )
      .reduce((sum, bt) => sum + bt.amount.toNumber(), 0);
  }

  private sumPendingTransfers(
    bankTransfers: {
      amount: { toNumber(): number };
      status: TransferStatusEnum;
    }[],
  ): number {
    return bankTransfers
      .filter(
        (bt) =>
          bt.status === TransferStatusEnum.PENDING ||
          bt.status === TransferStatusEnum.BANK_PROCESSING,
      )
      .reduce((sum, bt) => sum + bt.amount.toNumber(), 0);
  }
}
