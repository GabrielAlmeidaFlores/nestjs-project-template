import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { UsersStatisticsMonthlyQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-statistics.query.result';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class CustomerTypeormQueryRepository
  extends BaseTypeormQueryRepository<CustomerTypeormEntity>
  implements CustomerQueryRepositoryGateway
{
  protected readonly _type = CustomerTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CustomerTypeormEntity)
    repository: Repository<CustomerTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByAuthIdentityIdWithCustomerAddressRelationOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCustomerWithCustomerAddressRelationQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
        relations: {
          customerAddress: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      GetCustomerWithCustomerAddressRelationQueryResult,
    );

    return mappedData;
  }

  public async findOneByAuthIdentityIdOrFail(
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCustomerQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async findOneByCustomerId(
    customerId: CustomerId,
  ): Promise<GetCustomerQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: customerId.toString(),
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async findOneByEmail(
    email: Email,
  ): Promise<GetCustomerQueryResult | null> {
    const data = await this.findOne({
      where: {
        organizationMember: {
          customer: {
            authIdentity: {
              email: email.toString(),
            },
          },
        },
      },
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async findOneByFederalDocument(
    federalDocument: FederalDocument,
  ): Promise<GetCustomerQueryResult | null> {
    const data = await this.findOne({
      where: {
        organizationMember: {
          customer: {
            authIdentity: {
              federalDocument: federalDocument.toString(),
            },
          },
        },
      },
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async findOneByOrganizationMemberIdWithAuthIdentityRelation(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetCustomerWithAuthIdentityRelationQueryResult | null> {
    const data = await this.findOne({
      where: {
        organizationMember: {
          id: organizationMemberId.toString(),
        },
      },
      relations: {
        authIdentity: true,
      },
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      CustomerTypeormEntity,
      GetCustomerWithAuthIdentityRelationQueryResult,
    );

    return mappedData;
  }

  public async listAll(): Promise<Array<GetCustomerQueryResult>> {
    const data = await this.find({
      relations: {
        authIdentity: true,
        customerAddress: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      CustomerTypeormEntity,
      GetCustomerQueryResult,
    );

    return mappedData;
  }

  public async listAllCustomersWithAuthIdentity(): Promise<
    Array<GetCustomerWithAuthIdentityRelationQueryResult>
  > {
    const data = await this.find({
      relations: {
        authIdentity: true,
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      CustomerTypeormEntity,
      GetCustomerWithAuthIdentityRelationQueryResult,
    );

    return mappedData;
  }

  public async countAllMonthlyUsersForYear(
    year: number,
  ): Promise<Array<UsersStatisticsMonthlyQueryResult>> {
    const JANUARY = 0;
    const DECEMBER = 11;
    const LAST_DAY_OF_MONTH = 31;
    const LAST_HOUR = 23;
    const LAST_MINUTE = 59;
    const LAST_SECOND = 59;
    const LAST_MILLISECOND = 999;

    const startDate = new Date(year, JANUARY, 1);
    const endDate = new Date(
      year,
      DECEMBER,
      LAST_DAY_OF_MONTH,
      LAST_HOUR,
      LAST_MINUTE,
      LAST_SECOND,
      LAST_MILLISECOND,
    );

    const analyses = await this.repository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      select: {
        createdAt: true,
      },
    });

    const analysesByMonth = new Map<number, number>();

    for (const analysis of analyses) {
      const month = analysis.createdAt.getMonth();
      const currentCount = analysesByMonth.get(month) ?? 0;
      analysesByMonth.set(month, currentCount + 1);
    }

    return Array.from(analysesByMonth.entries())
      .sort(([monthA], [monthB]) => monthA - monthB)
      .map(([month, totalCount]) =>
        UsersStatisticsMonthlyQueryResult.build({
          month,
          totalCount,
        }),
      );
  }
}
