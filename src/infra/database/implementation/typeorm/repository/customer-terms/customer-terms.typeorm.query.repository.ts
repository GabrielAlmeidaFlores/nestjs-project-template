import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerTermsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-terms.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';

@Injectable()
export class CustomerTermsTypeormQueryRepository
  extends BaseTypeormQueryRepository<CustomerTermsTypeormEntity>
  implements CustomerTermsQueryRepositoryGateway
{
  protected readonly _type = CustomerTermsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CustomerTermsTypeormEntity)
    repository: Repository<CustomerTermsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByStatus(
    isActive: boolean,
  ): Promise<GetCustomerTermsQueryResult> {
    const terms = await this.repository.findOne({
      where: { isActive },
    });

    const mappedData = this.mapperGateway.map(
      terms,
      CustomerTermsTypeormEntity,
      GetCustomerTermsQueryResult,
    );

    return mappedData;
  }
}
