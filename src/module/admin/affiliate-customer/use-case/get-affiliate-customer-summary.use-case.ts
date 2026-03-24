import { Inject, Injectable } from '@nestjs/common';

import { GetAffiliateCustomerSummaryResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer-summary.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/admin/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';
import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';

@Injectable()
export class GetAffiliateCustomerSummaryUseCase {
  protected readonly _type = GetAffiliateCustomerSummaryUseCase.name;

  private readonly lastMonthInDays: number;
  private readonly lastYearInDays: number;

  public constructor(
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
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerSummaryResponseDto> {
    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(
        affiliateCustomerId,
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

    const conversions = commissions.length;

    const earningsLastMonth = this.sumCompletedTransfers(
      bankTransfers,
      cutoffLastMonth,
    );

    const earningsLast365Days = this.sumCompletedTransfers(
      bankTransfers,
      cutoffLast365Days,
    );

    const pendingAmount = this.sumPendingTransfers(bankTransfers);

    return GetAffiliateCustomerSummaryResponseDto.build({
      conversions,
      earningsLastMonth,
      earningsLast365Days,
      pendingAmount,
    });
  }

  private resolveTransferDate(transfer: {
    transferDate: Date | null;
    createdAt: Date;
  }): Date {
    return transfer.transferDate ?? transfer.createdAt;
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
          this.resolveTransferDate(bt) >= since,
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
