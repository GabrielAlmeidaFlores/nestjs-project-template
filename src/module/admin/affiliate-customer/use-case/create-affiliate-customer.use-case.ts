import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CreateAffiliateCustomerRequestDto } from '@module/admin/affiliate-customer/dto/request/create-affiliate-customer.request.dto';
import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { CustomerAlreadyAffiliateError } from '@module/admin/affiliate-customer/error/customer-already-affiliate.error';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/command/affiliate-customer-payment-plan.command.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import { AffiliateCustomerPaymentPlanEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/affiliate-customer-payment-plan.entity';
import { AffiliateCustomerPaymentPlanId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-payment-plan/value-object/affiliate-customer-payment-plan-id/affiliate-customer-payment-plan-id.value-object';

@Injectable()
export class CreateAffiliateCustomerUseCase {
  protected readonly _type = CreateAffiliateCustomerUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerCommandRepositoryGateway)
    private readonly affiliateCustomerCommandRepository: AffiliateCustomerCommandRepositoryGateway,
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanCommandRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanCommandRepository: AffiliateCustomerPaymentPlanCommandRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepository: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreateAffiliateCustomerRequestDto,
  ): Promise<GetAffiliateCustomerResponseDto> {
    await this.validateCustomerExists(dto);
    await this.validateCustomerIsNotAlreadyAffiliate(dto);

    const affiliateCustomer = new AffiliateCustomerEntity({
      customerId: dto.customerId,
      pixAddressKey: null,
      pixAddressKeyType: null,
      paymentCommissionPercentage: dto.paymentCommissionPercentage,
      paymentPlanDiscountPercentage: dto.paymentPlanDiscountPercentage,
      paymentPlanDiscountValidUntil: dto.paymentPlanDiscountValidUntil,
      paymentPlanDiscountRedemptionLimit:
        dto.paymentPlanDiscountRedemptionLimit,
      isActive: dto.isActive ?? true,
    });

    const transactions: TransactionType[] = [
      this.affiliateCustomerCommandRepository.createAffiliateCustomer(
        affiliateCustomer,
      ),
    ];

    for (const paymentPlanId of dto.paymentPlanIds ?? []) {
      const affiliateCustomerPaymentPlan =
        new AffiliateCustomerPaymentPlanEntity({
          id: new AffiliateCustomerPaymentPlanId(),
          affiliateCustomer: affiliateCustomer.id,
          paymentPlan: paymentPlanId,
        });

      transactions.push(
        this.affiliateCustomerPaymentPlanCommandRepository.createAffiliateCustomerPaymentPlan(
          affiliateCustomerPaymentPlan,
        ),
      );
    }

    const transaction =
      await this.baseTransactionRepository.execute(transactions);
    await transaction.commit();

    const createdAffiliate =
      await this.affiliateCustomerQueryRepository.findOneById(
        affiliateCustomer.id,
      );

    if (!createdAffiliate) {
      throw new CustomerAlreadyAffiliateError();
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        createdAffiliate.id,
      );

    return GetAffiliateCustomerResponseDto.build({
      ...createdAffiliate,
      pixAddressKey: createdAffiliate.pixAddressKey?.toString() ?? null,
      pixAddressKeyType: createdAffiliate.pixAddressKeyType ?? null,
      paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
    });
  }

  private async validateCustomerExists(
    dto: CreateAffiliateCustomerRequestDto,
  ): Promise<void> {
    const customer = await this.customerQueryRepository.findOneByCustomerId(
      dto.customerId,
    );

    if (!customer) {
      throw new CustomerNotFoundError();
    }
  }

  private async validateCustomerIsNotAlreadyAffiliate(
    dto: CreateAffiliateCustomerRequestDto,
  ): Promise<void> {
    const existing =
      await this.affiliateCustomerQueryRepository.findOneByCustomerId(
        dto.customerId,
      );

    if (existing) {
      throw new CustomerAlreadyAffiliateError();
    }
  }
}
