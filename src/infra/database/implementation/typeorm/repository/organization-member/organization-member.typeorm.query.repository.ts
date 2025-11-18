import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class OrganizationMemberTypeormQueryRepository
  extends BaseTypeormQueryRepository<OrganizationMemberTypeormEntity>
  implements OrganizationMemberQueryRepositoryGateway
{
  protected readonly _type = OrganizationMemberTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(OrganizationMemberTypeormEntity)
    repository: Repository<OrganizationMemberTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public async findOneByCustomerIdAndAuthIdentityId(
    authIdentityId: AuthIdentityId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberQueryResult | null> {
    const data = await this.findOne({
      where: {
        customer: {
          authIdentity: {
            id: authIdentityId.toString(),
          },
        },
        organization: {
          id: organizationId.toString(),
        },
      },
      relations: {
        customer: {
          authIdentity: true,
        },
        organization: true,
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberQueryResult,
    );

    return mappedData;
  }

  public async findOneByCustomerIdAndOrganizationIdWithRelations(
    customerId: CustomerId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult | null> {
    const data = await this.findOne({
      where: {
        customer: {
          id: customerId.toString(),
        },
        organization: {
          id: organizationId.toString(),
        },
      },
      relations: {
        customer: {
          authIdentity: true,
        },
        organization: true,
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByCustomerIdAndOrganizationId(
    customerId: CustomerId,
    organizationId: OrganizationId,
  ): Promise<GetOrganizationMemberQueryResult | null> {
    const data = await this.findOne({
      where: {
        customer: {
          id: customerId.toString(),
        },
        organization: {
          id: organizationId.toString(),
        },
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberQueryResult,
    );

    return mappedData;
  }

  public async findOneByOrganizationMemberId(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetOrganizationMemberQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: organizationMemberId.toString(),
      },
    });

    const dataDoesNotExists = data === null;

    if (dataDoesNotExists) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberQueryResult,
    );

    return mappedData;
  }
}
