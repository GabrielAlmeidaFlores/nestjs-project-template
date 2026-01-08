import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCreditPurchaseCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/command/organization-credit-purchase.command.repository.gateway';
import { OrganizationCreditPurchaseEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/organization-credit-purchase.entity';
import { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';

@Injectable()
export class OrganizationCreditPurchaseTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationCreditPurchaseTypeormEntity>
  implements OrganizationCreditPurchaseCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationCreditPurchaseTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(OrganizationCreditPurchaseTypeormEntity)
    repository: Repository<OrganizationCreditPurchaseTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationCreditPurchase(
    props: OrganizationCreditPurchaseEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCreditPurchaseEntity,
      OrganizationCreditPurchaseTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateOrganizationCreditPurchase(
    id: OrganizationCreditPurchaseId,
    props: OrganizationCreditPurchaseEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCreditPurchaseEntity,
      OrganizationCreditPurchaseTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteOrganizationCreditPurchase(
    id: OrganizationCreditPurchaseId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
