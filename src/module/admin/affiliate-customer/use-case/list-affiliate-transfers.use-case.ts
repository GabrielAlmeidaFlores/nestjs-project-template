import { Inject, Injectable } from '@nestjs/common';

import { ListAffiliateTransfersResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-transfers.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/admin/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { ListAffiliateTransfersQueryParam } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/param/list-affiliate-transfers.query.param';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { AffiliateBankTransferItemResponseDto } from '@module/customer/affiliate-customer/dto/response/affiliate-bank-transfer-item.response.dto';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';

@Injectable()
export class ListAffiliateTransfersUseCase {
  protected readonly _type = ListAffiliateTransfersUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway)
    private readonly commissionQueryRepository: OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway,
    @Inject(AffiliateBankTransferQueryRepositoryGateway)
    private readonly affiliateBankTransferQueryRepository: AffiliateBankTransferQueryRepositoryGateway,
    @Inject(BankTransferQueryRepositoryGateway)
    private readonly bankTransferQueryRepository: BankTransferQueryRepositoryGateway,
  ) {}

  public async execute(
    affiliateCustomerId: AffiliateCustomerId,
    filters: ListAffiliateTransfersQueryParam = new ListAffiliateTransfersQueryParam(),
  ): Promise<ListAffiliateTransfersResponseDto> {
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

    const bankTransferById = new Map(
      bankTransfers.map((bt) => [bt.id.toString(), bt]),
    );

    const transfers = affiliateTransfers.flatMap((affiliateTransfer) => {
      const bankTransfer = bankTransferById.get(
        affiliateTransfer.bankTransferId.toString(),
      );

      if (bankTransfer === undefined) {
        return [];
      }

      if (filters.status !== null && bankTransfer.status !== filters.status) {
        return [];
      }

      const transferDate = bankTransfer.transferDate ?? bankTransfer.createdAt;

      if (filters.from !== null && transferDate < filters.from) {
        return [];
      }

      if (filters.to !== null && transferDate > filters.to) {
        return [];
      }

      return [
        AffiliateBankTransferItemResponseDto.build({
          id: affiliateTransfer.id,
          affiliatePlanCommissionId:
            affiliateTransfer.affiliatePlanCommissionId,
          bankPaymentId: affiliateTransfer.bankPaymentId,
          bankTransferId: affiliateTransfer.bankTransferId,
          bankExternalId: bankTransfer.bankExternalId ?? null,
          amount: bankTransfer.amount.toNumber(),
          status: bankTransfer.status,
          pixAddressKey: bankTransfer.pixAddressKey,
          pixAddressKeyType: bankTransfer.pixAddressKeyType,
          transferDate: bankTransfer.transferDate ?? null,
          description: bankTransfer.description ?? null,
          createdAt: affiliateTransfer.createdAt,
          updatedAt: affiliateTransfer.updatedAt,
        }),
      ];
    });

    return ListAffiliateTransfersResponseDto.build({ transfers });
  }
}
