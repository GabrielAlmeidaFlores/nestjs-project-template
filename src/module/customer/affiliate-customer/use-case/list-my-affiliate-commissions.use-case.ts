import { Inject, Injectable } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateBankTransferItemResponseDto } from '@module/customer/affiliate-customer/dto/response/affiliate-bank-transfer-item.response.dto';
import {
  AffiliateCommissionItemResponseDto,
  ListMyAffiliateCommissionsResponseDto,
} from '@module/customer/affiliate-customer/dto/response/list-my-affiliate-commissions.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/customer/affiliate-customer/error/affiliate-customer-not-found.error';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { ListAffiliateCommissionsQueryParam } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/param/list-affiliate-commissions.query.param';
import { BankTransferQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/query/bank-transfer.query.repository.gateway';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListMyAffiliateCommissionsUseCase {
  protected readonly _type = ListMyAffiliateCommissionsUseCase.name;

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
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    filters: ListAffiliateCommissionsQueryParam = new ListAffiliateCommissionsQueryParam(),
  ): Promise<ListMyAffiliateCommissionsResponseDto> {
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
      await this.commissionQueryRepository.findManyByAffiliateCustomerIdWithFilters(
        affiliate.id,
        filters,
      );

    const affiliateTransfers =
      await this.affiliateBankTransferQueryRepository.findManyByAffiliatePlanCommissionIds(
        commissions.map((c) => c.id),
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

    const commissionItems = commissions.map((commission) => {
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
        commissionPercentage: commission.commissionPercentage,
        createdAt: commission.createdAt,
        updatedAt: commission.updatedAt,
        transfer: transfer ?? null,
      });
    });

    return ListMyAffiliateCommissionsResponseDto.build({
      commissions: commissionItems,
    });
  }
}
