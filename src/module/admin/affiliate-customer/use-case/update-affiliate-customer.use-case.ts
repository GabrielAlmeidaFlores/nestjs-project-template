import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { UpdateAffiliateCustomerRequestDto } from '@module/admin/affiliate-customer/dto/request/update-affiliate-customer.request.dto';
import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/admin/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/command/affiliate-customer-payment-plan.command.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { AffiliateCustomerPaymentPlanEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/affiliate-customer-payment-plan.entity';
import { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';

@Injectable()
export class UpdateAffiliateCustomerUseCase {
  protected readonly _type = UpdateAffiliateCustomerUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerCommandRepositoryGateway)
    private readonly affiliateCustomerCommandRepository: AffiliateCustomerCommandRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanCommandRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanCommandRepository: AffiliateCustomerPaymentPlanCommandRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepository: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    id: AffiliateCustomerId,
    dto: UpdateAffiliateCustomerRequestDto,
  ): Promise<GetAffiliateCustomerResponseDto> {
    const existing =
      await this.affiliateCustomerQueryRepository.findOneById(id);

    if (!existing) {
      throw new AffiliateCustomerNotFoundError();
    }

    const updatedAffiliate = new AffiliateCustomerEntity({
      ...existing,
      id: existing.id,
      pixAddressKey: existing.pixAddressKey,
      pixAddressKeyType: existing.pixAddressKeyType,
      paymentCommissionPercentage:
        dto.paymentCommissionPercentage ?? existing.paymentCommissionPercentage,
      paymentPlanDiscountPercentage:
        dto.paymentPlanDiscountPercentage ??
        existing.paymentPlanDiscountPercentage,
      paymentPlanDiscountValidUntil:
        dto.paymentPlanDiscountValidUntil ??
        existing.paymentPlanDiscountValidUntil,
      paymentPlanDiscountRedemptionLimit:
        dto.paymentPlanDiscountRedemptionLimit ??
        existing.paymentPlanDiscountRedemptionLimit,
      isActive: dto.isActive ?? existing.isActive,
      updatedAt: new Date(),
    });

    const transactions: TransactionType[] = [
      this.affiliateCustomerCommandRepository.updateAffiliateCustomer(
        id,
        updatedAffiliate,
      ),
    ];

    if (dto.paymentPlanIds !== undefined) {
      const currentPlans =
        await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
          id,
        );

      for (const plan of currentPlans) {
        transactions.push(
          this.affiliateCustomerPaymentPlanCommandRepository.deleteAffiliateCustomerPaymentPlan(
            plan.id,
          ),
        );
      }

      for (const paymentPlanId of dto.paymentPlanIds) {
        const newPlan = new AffiliateCustomerPaymentPlanEntity({
          id: new AffiliateCustomerPaymentPlanId(),
          affiliateCustomer: id,
          paymentPlan: paymentPlanId,
        });

        transactions.push(
          this.affiliateCustomerPaymentPlanCommandRepository.createAffiliateCustomerPaymentPlan(
            newPlan,
          ),
        );
      }
    }

    const transaction =
      await this.baseTransactionRepository.execute(transactions);
    await transaction.commit();

    const updatedAffiliateResult =
      await this.affiliateCustomerQueryRepository.findOneById(id);

    if (!updatedAffiliateResult) {
      throw new AffiliateCustomerNotFoundError();
    }

    const updatedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        id,
      );

    return GetAffiliateCustomerResponseDto.build({
      ...updatedAffiliateResult,
      pixAddressKey: updatedAffiliateResult.pixAddressKey?.toString() ?? null,
      pixAddressKeyType: updatedAffiliateResult.pixAddressKeyType ?? null,
      paymentPlanIds: updatedPlans.map((p) => p.paymentPlanId),
    });
  }
}
