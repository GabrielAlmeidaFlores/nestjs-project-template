import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationCreditPackPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-pack-purchase.typeorm.entity';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCreditPackPurchaseQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/organization-credit-pack-purchase/query/organization-credit-pack-purchase.query.repository.gateway';
import { CreditPackId } from '@module/customer/credit-pack/domain/schema/entity/credit-pack/value-object/credit-pack-id/credit-pack-id.value-object';
import { OrganizationCreditPackPurchaseEntity } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity';
import { OrganizationCreditPackPurchaseId } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/value-object/organization-credit-pack-purchase-id/organization-credit-pack-purchase-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

@Injectable()
export class OrganizationCreditPackPurchaseTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationCreditPackPurchaseTypeormEntity>
  implements OrganizationCreditPackPurchaseQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationCreditPackPurchaseTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationCreditPackPurchaseTypeormEntity)
    repository: Repository<OrganizationCreditPackPurchaseTypeormEntity>,
  ) {
    super(repository);
  }

  public async findOneByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<OrganizationCreditPackPurchaseEntity | null> {
    const result = await this.repository.findOne({
      where: { bankPayment: { id: bankPaymentId.toString() } },
      relations: { organization: true, creditPack: true, bankPayment: true },
    });

    if (!result) {
      return null;
    }

    if (!result.organization || !result.creditPack || !result.bankPayment) {
      return null;
    }

    return new OrganizationCreditPackPurchaseEntity({
      id: new OrganizationCreditPackPurchaseId(result.id),
      organizationId: new OrganizationId(result.organization.id),
      creditPackId: new CreditPackId(result.creditPack.id),
      creditAmount: result.creditAmount,
      price: new DecimalValue(result.price),
      bankPaymentId: new BankPaymentId(result.bankPayment.id),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      deletedAt: result.deletedAt,
    });
  }
}
