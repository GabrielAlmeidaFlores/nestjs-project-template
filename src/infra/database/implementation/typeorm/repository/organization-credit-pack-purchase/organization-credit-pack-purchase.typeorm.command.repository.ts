import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank-payment.typeorm.entity';
import { CreditPackTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/credit-pack.typeorm.entity';
import { OrganizationCreditPackPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-pack-purchase.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { OrganizationCreditPackPurchaseCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/organization-credit-pack-purchase/command/organization-credit-pack-purchase.command.repository.gateway';
import { OrganizationCreditPackPurchaseEntity } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity';

@Injectable()
export class OrganizationCreditPackPurchaseTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationCreditPackPurchaseTypeormEntity>
  implements OrganizationCreditPackPurchaseCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationCreditPackPurchaseTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationCreditPackPurchaseTypeormEntity)
    repository: Repository<OrganizationCreditPackPurchaseTypeormEntity>,
  ) {
    super(repository);
  }

  public createOrganizationCreditPackPurchase(
    entity: OrganizationCreditPackPurchaseEntity,
  ): TransactionType {
    const ormEntity = OrganizationCreditPackPurchaseTypeormEntity.build({
      id: entity.id.toString(),
      creditAmount: entity.creditAmount,
      price: entity.price.toString(),
      organization: {
        id: entity.organizationId.toString(),
      } as OrganizationTypeormEntity,
      creditPack: {
        id: entity.creditPackId.toString(),
      } as CreditPackTypeormEntity,
      bankPayment: {
        id: entity.bankPaymentId.toString(),
      } as BankPaymentTypeormEntity,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
    return this.create(ormEntity);
  }
}
