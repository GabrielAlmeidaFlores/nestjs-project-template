import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerTermsAcceptanceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms-acceptance.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';

@Injectable()
export class CustomerTermsAcceptanceTypeormQueryRepository
  extends BaseTypeormQueryRepository<CustomerTermsAcceptanceTypeormEntity>
  implements CustomerTermsAcceptanceQueryRepositoryGateway
{
  protected readonly _type = CustomerTermsAcceptanceTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CustomerTermsAcceptanceTypeormEntity)
    repository: Repository<CustomerTermsAcceptanceTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByTermsIdAndCustomerId(
    termsId: CustomerTermsId,
    customerId: CustomerId,
  ): Promise<GetCustomerTermsAcceptanceQueryResult | null> {
    const data = await this.repository.findOne({
      where: {
        customerTerms: { id: termsId.toString() },
        customer: { id: customerId.toString() },
      },
      relations: {
        customerTerms: true,
        customer: true,
      },
    });

    if (!data) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTermsAcceptanceTypeormEntity,
      GetCustomerTermsAcceptanceQueryResult,
    );

    return mappedData;
  }
}
