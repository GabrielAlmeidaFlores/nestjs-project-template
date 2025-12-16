import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationCreditPurchaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-credit-purchase.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { GetOrganizationCreditPurchaseQueryResult } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/result/get-organization-credit-purchase.query.result';
import { OrganizationCreditPurchaseId } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/value-object/organization-credit-purchase-id/organization-credit-purchase-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class OrganizationCreditPurchaseTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationCreditPurchaseTypeormEntity>
  implements OrganizationCreditPurchaseQueryRepositoryGateway
{
  protected readonly _type =
    OrganizationCreditPurchaseTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationCreditPurchaseTypeormEntity)
    repository: Repository<OrganizationCreditPurchaseTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listOrganizationCreditPurchase(
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetOrganizationCreditPurchaseQueryResult>> {
    const data = await this.list(listData, {
      relations: ['organization', 'bankPayment'],
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      OrganizationCreditPurchaseTypeormEntity,
      GetOrganizationCreditPurchaseQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationCreditPurchaseQueryResult>({
      ...data,
      resource: mappedData,
    });
  }

  public async findOneOrganizationCreditPurchaseByIdOrFail(
    id: OrganizationCreditPurchaseId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetOrganizationCreditPurchaseQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
        },
        relations: ['organization', 'bankPayment'],
      },
      err,
    );

    const resource = this.mapperGateway.map(
      data,
      OrganizationCreditPurchaseTypeormEntity,
      GetOrganizationCreditPurchaseQueryResult,
    );

    return resource;
  }

  public async findOneOrganizationCreditPurchaseByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationCreditPurchaseQueryResult | null> {
    const data = await this.findOne({
      where: {
        organization: {
          id: organizationId.toString(),
        },
      },
      relations: ['organization', 'bankPayment'],
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      OrganizationCreditPurchaseTypeormEntity,
      GetOrganizationCreditPurchaseQueryResult,
    );

    return resource;
  }

  public async findOneOrganizationCreditPurchaseByBankPaymentId(
    bankPaymentId: BankPaymentId,
  ): Promise<GetOrganizationCreditPurchaseQueryResult | null> {
    const data = await this.findOne({
      where: {
        bankPayment: {
          id: bankPaymentId.toString(),
        },
      },
      relations: ['organization', 'bankPayment'],
    });

    if (!data) {
      return null;
    }

    const resource = this.mapperGateway.map(
      data,
      OrganizationCreditPurchaseTypeormEntity,
      GetOrganizationCreditPurchaseQueryResult,
    );

    return resource;
  }
}
