import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Brackets, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { CustomerTypeEnum } from '@module/admin/customer-management/dto/enum/customer-type.enum';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { ListCustomersWithFiltersInputModel } from '@module/customer/account/domain/repository/customer/query/model/input/list-customers-with-filters.input.model';
import { UsersStatisticsMonthlyQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-statistics.query.result';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerWithOrganizationForListQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-organization-for-list.query.result';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
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
        organizationMember: {
          organization: true,
        },
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

    const users = await this.repository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
      select: {
        createdAt: true,
      },
    });

    const usersByMonth = new Map<number, number>();

    for (const user of users) {
      const month = user.createdAt.getMonth();
      const currentCount = usersByMonth.get(month) ?? 0;
      usersByMonth.set(month, currentCount + 1);
    }

    return Array.from(usersByMonth.entries())
      .sort(([monthA], [monthB]) => monthA - monthB)
      .map(([month, totalCount]) =>
        UsersStatisticsMonthlyQueryResult.build({
          month,
          totalCount,
        }),
      );
  }

  public async listCustomersWithFilters(
    input: ListCustomersWithFiltersInputModel,
  ): Promise<
    ListDataOutputModel<GetCustomerWithOrganizationForListQueryResult>
  > {
    const queryBuilder = this.repository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.authIdentity', 'authIdentity')
      .leftJoin('customer.organizationMember', 'organizationMember')
      .leftJoin('organizationMember.organization', 'organization')
      .leftJoin('organization.organizationPaymentPlan', 'paymentPlan')
      .select([
        'customer.id',
        'customer.name',
        'customer.createdAt',
        'authIdentity.email',
        'authIdentity.federalDocument',
        'organizationMember.id',
        'organizationMember.owner',
        'organization.id',
        'organization.name',
      ]);

    if (input.searchBy !== undefined && input.searchBy.trim() !== '') {
      const searchTerm = `%${input.searchBy.trim().toLowerCase()}%`;
      const searchTermExact = input.searchBy.trim();

      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(customer.name) LIKE :searchTerm', { searchTerm })
            .orWhere('LOWER(authIdentity.email) LIKE :searchTerm', {
              searchTerm,
            })
            .orWhere('LOWER(organization.name) LIKE :searchTerm', {
              searchTerm,
            })
            .orWhere('authIdentity.federal_document = :searchTermExact', {
              searchTermExact,
            });
        }),
      );
    }

    if (input.type !== undefined) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          if (input.type === CustomerTypeEnum.INDIVIDUAL) {
            qb.where('organizationMember.id IS NULL').orWhere(
              new Brackets((innerQb) => {
                innerQb
                  .where('organizationMember.owner = :isOwner', {
                    isOwner: true,
                  })
                  .andWhere('paymentPlan.max_member_count = :maxCount', {
                    maxCount: 1,
                  });
              }),
            );
          } else if (input.type === CustomerTypeEnum.ORGANIZATION) {
            qb.where('organizationMember.owner = :isOwner', {
              isOwner: true,
            }).andWhere('paymentPlan.max_member_count > :maxCount', {
              maxCount: 1,
            });
          } else if (input.type === CustomerTypeEnum.COLLABORATOR) {
            qb.where('organizationMember.owner = :isOwner', { isOwner: false });
          }
        }),
      );
    }

    const totalItems = await queryBuilder.getCount();

    const sortField = input.sortField ?? '-createdAt';
    const isDescending = sortField.startsWith('-');
    const fieldName = isDescending ? sortField.substring(1) : sortField;
    const orderDirection = isDescending ? 'DESC' : 'ASC';

    if (fieldName === 'createdAt') {
      queryBuilder.orderBy('customer.createdAt', orderDirection);
    } else {
      queryBuilder.orderBy('customer.createdAt', 'DESC');
    }

    const skip = (input.page - 1) * input.limit;
    queryBuilder.skip(skip).take(input.limit);

    const customers = await queryBuilder.getMany();

    const results: GetCustomerWithOrganizationForListQueryResult[] = [];

    for (const customer of customers) {
      if (!customer.authIdentity) {
        continue;
      }

      const organizationMember = customer.organizationMember?.[0];
      const organization = organizationMember?.organization;

      results.push(
        new GetCustomerWithOrganizationForListQueryResult({
          customerId: new CustomerId(customer.id),
          customerName: customer.name,
          customerEmail: new Email(customer.authIdentity.email),
          customerDocument: new FederalDocument(
            customer.authIdentity.federalDocument,
          ),
          customerCreatedAt: customer.createdAt,
          organizationId:
            organization?.id !== undefined
              ? new OrganizationId(organization.id)
              : null,
          organizationName: organization?.name ?? null,
          isOrganizationOwner: organizationMember?.owner ?? false,
        }),
      );
    }

    return new ListDataOutputModel({
      page: input.page,
      limit: input.limit,
      totalItems,
      resource: results,
    });
  }
}
