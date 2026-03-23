import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import { PixAddressKey } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/pix-address-key.value-object';
import { UpdateMyAffiliatePixKeyRequestDto } from '@module/customer/affiliate-customer/dto/request/update-my-affiliate-pix-key.request.dto';
import { GetMyAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-my-affiliate-customer.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/customer/affiliate-customer/error/affiliate-customer-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateMyAffiliatePixKeyUseCase {
  protected readonly _type = UpdateMyAffiliatePixKeyUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerCommandRepositoryGateway)
    private readonly affiliateCustomerCommandRepository: AffiliateCustomerCommandRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepository: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateMyAffiliatePixKeyRequestDto,
  ): Promise<GetMyAffiliateCustomerResponseDto> {
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

    const pixAddressKey = new PixAddressKey(
      dto.pixAddressKey,
      dto.pixAddressKeyType,
    );

    const updatedAffiliate = new AffiliateCustomerEntity({
      ...affiliate,
      pixAddressKey,
      pixAddressKeyType: dto.pixAddressKeyType,
      updatedAt: new Date(),
    });

    const transaction = await this.baseTransactionRepository.execute([
      this.affiliateCustomerCommandRepository.updateAffiliateCustomer(
        affiliate.id,
        updatedAffiliate,
      ),
    ]);

    await transaction.commit();

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    return GetMyAffiliateCustomerResponseDto.build({
      id: updatedAffiliate.id,
      pixAddressKey: updatedAffiliate.pixAddressKey?.toString() ?? null,
      pixAddressKeyType: updatedAffiliate.pixAddressKeyType ?? null,
      paymentCommissionPercentage: updatedAffiliate.paymentCommissionPercentage,
      paymentPlanDiscountPercentage:
        updatedAffiliate.paymentPlanDiscountPercentage,
      paymentPlanDiscountValidUntil:
        updatedAffiliate.paymentPlanDiscountValidUntil,
      paymentPlanDiscountRedemptionLimit:
        updatedAffiliate.paymentPlanDiscountRedemptionLimit,
      isActive: updatedAffiliate.isActive,
      paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
      createdAt: updatedAffiliate.createdAt,
      updatedAt: updatedAffiliate.updatedAt,
    });
  }
}
