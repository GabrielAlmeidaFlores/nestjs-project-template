import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AffiliateCustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/affiliate-customer.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { ListAffiliateCustomersQueryParam } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/param/list-affiliate-customers.query.param';
import { GetAffiliateCustomerQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/result/get-affiliate-customer.query.result';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

@Injectable()
export class AffiliateCustomerTypeormQueryRepository
  extends BaseTypeormQueryRepository<AffiliateCustomerTypeormEntity>
  implements AffiliateCustomerQueryRepositoryGateway
{
  protected readonly _type = AffiliateCustomerTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AffiliateCustomerTypeormEntity)
    repository: Repository<AffiliateCustomerTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneById(
    id: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: { customer: { authIdentity: true } },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );
  }

  public async findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetAffiliateCustomerQueryResult | null> {
    const data = await this.findOne({
      where: {
        customer: { id: customerId.toString() },
      },
      relations: { customer: { authIdentity: true } },
    });

    if (!data) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );
  }

  public async listAll(): Promise<GetAffiliateCustomerQueryResult[]> {
    const data = await this.find({
      relations: { customer: { authIdentity: true } },
    });

    return this.mapperGateway.mapArray(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );
  }

  public async listWithPagination(
    param: ListAffiliateCustomersQueryParam,
  ): Promise<ListDataOutputModel<GetAffiliateCustomerQueryResult>> {
    const queryBuilder = this.repository
      .createQueryBuilder('affiliateCustomer')
      .leftJoinAndSelect('affiliateCustomer.customer', 'customer')
      .leftJoinAndSelect('customer.authIdentity', 'authIdentity');

    if (param.searchBy !== null && param.searchBy.trim() !== '') {
      const searchTerm = `%${param.searchBy.trim().toLowerCase()}%`;
      const encryptedSearchTerm = CryptographyTransformer.to(
        param.searchBy.trim(),
      );

      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(authIdentity.email) LIKE :searchTerm', {
            searchTerm,
          });

          if (encryptedSearchTerm !== undefined) {
            qb.orWhere('authIdentity.federal_document = :encryptedSearchTerm', {
              encryptedSearchTerm,
            });
          }
        }),
      );
    }

    const maxItemsPerQuery = 100;
    const limit = Math.min(Math.max(param.limit, 1), maxItemsPerQuery);
    const page = Math.max(param.page, 1);
    const skip = (page - 1) * limit;

    const sortField = param.sortField ?? '-createdAt';
    const isDescending = sortField.startsWith('-');
    const fieldName = isDescending ? sortField.substring(1) : sortField;
    const sortDirection = isDescending ? ('DESC' as const) : ('ASC' as const);

    queryBuilder
      .orderBy(`affiliateCustomer.${fieldName}`, sortDirection)
      .skip(skip)
      .take(limit);

    const [data, totalItems] = await queryBuilder.getManyAndCount();

    const resource = this.mapperGateway.mapArray(
      data,
      AffiliateCustomerTypeormEntity,
      GetAffiliateCustomerQueryResult,
    );

    return new ListDataOutputModel({
      page,
      limit,
      totalItems,
      resource,
    });
  }
}
