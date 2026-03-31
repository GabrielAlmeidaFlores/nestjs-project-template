import { Inject, Injectable } from '@nestjs/common';

import { ListAffiliateCommissionsResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-commissions.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/admin/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { AffiliateBankTransferItemResponseDto } from '@module/customer/affiliate-customer/dto/response/affiliate-bank-transfer-item.response.dto';
import { AffiliateCommissionItemResponseDto } from '@module/customer/affiliate-customer/dto/response/list-my-affiliate-commissions.response.dto';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { ListAffiliateCommissionsQueryParam } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/param/list-affiliate-commissions.query.param';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';

@Injectable()
export class ListAffiliateCommissionsUseCase {
  protected readonly _type = ListAffiliateCommissionsUseCase.name;

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
    filters: ListAffiliateCommissionsQueryParam = new ListAffiliateCommissionsQueryParam(),
  ): Promise<ListAffiliateCommissionsResponseDto> {
    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(
        affiliateCustomerId,
      );

    if (!affiliate) {
      throw new AffiliateCustomerNotFoundError();
    }

    const commissionsResult =
      await this.commissionQueryRepository.findManyByAffiliateCustomerIdWithFilters(
        affiliate.id,
        filters,
      );

    const affiliateTransfers =
      await this.affiliateBankTransferQueryRepository.findManyByAffiliatePlanCommissionIds(
        commissionsResult.resource.map((c) => c.id),
      );

    const transferByCommissionId = new Map(
      affiliateTransfers.map((t) => [
        t.affiliatePlanCommissionId.toString(),
        t,
      ]),
    );

    const bankTransfers = await this.bankTransferQueryRepository.findManyByIds(
      affiliateTransfers.map((t) => t.bankTransferId),
    );

    const bankTransferById = new Map(
      bankTransfers.map((bt) => [bt.id.toString(), bt]),
    );

    const commissionItems = commissionsResult.resource.map((commission) => {
      const affiliateTransfer = transferByCommissionId.get(
        commission.id.toString(),
      );

      let transfer: AffiliateBankTransferItemResponseDto | undefined;

      if (affiliateTransfer !== undefined) {
        const bankTransfer = bankTransferById.get(
          affiliateTransfer.bankTransferId.toString(),
        );

        if (bankTransfer !== undefined) {
          transfer = AffiliateBankTransferItemResponseDto.build({
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
          });
        }
      }

      return AffiliateCommissionItemResponseDto.build({
        id: commission.id,
        organizationPaymentPlanId: commission.organizationPaymentPlan,
        planName: commission.planName,
        planValue: commission.planPrice,
        customerName: commission.customerName ?? null,
        customerEmail: commission.customerEmail ?? null,
        commissionPercentage: commission.commissionPercentage,
        discountPercentage: commission.discountPercentage,
        createdAt: commission.createdAt,
        updatedAt: commission.updatedAt,
        transfer: transfer ?? null,
      });
    });

    return ListAffiliateCommissionsResponseDto.build({
      commissions: commissionItems,
    });
  }
}
