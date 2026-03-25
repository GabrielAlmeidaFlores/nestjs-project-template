import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, IsNull, Like, Repository } from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { ListOrganizationMembersInputModel } from '@module/customer/account/domain/repository/organization-member/query/model/input/list-organization-members.input.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationCollaboratorWithStatsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-collaborator-with-stats.query.result';
import { GetOrganizationMemberCollaboratorQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-collaborator.query.result';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import { ListOrganizationCollaboratorsWithStatsQueryParamType } from '@module/customer/account/domain/repository/organization-member/query/type/input/list-organization-collaborators-with-stats.query.param';
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

  public async findOneOrganizationMemberById(
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

  public async countActiveCollaboratorsByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number> {
    return this.count({
      where: {
        organization: {
          id: organizationId.toString(),
        },
        owner: false,
        isActive: true,
        deletedAt: IsNull(),
      },
    });
  }

  public async listOrganizationMembersByOrganizationId(
    organizationId: OrganizationId,
    pagination: ListOrganizationMembersInputModel,
  ): Promise<
    ListDataOutputModel<GetOrganizationMemberCollaboratorQueryResult>
  > {
    const baseWhere = {
      organization: {
        id: organizationId.toString(),
      },
      owner: false,
      deletedAt: IsNull(),
    };

    const where = [];

    if (pagination.searchBy !== null) {
      where.push({
        ...baseWhere,
        customer: {
          name: Like(`%${pagination.searchBy}%`),
        },
      });

      where.push({
        ...baseWhere,
        customer: {
          authIdentity: {
            email: Like(`%${pagination.searchBy}%`),
          },
        },
      });
    } else {
      where.push(baseWhere);
    }

    const data = await this.list(pagination, {
      where,
      relations: {
        customer: {
          authIdentity: true,
        },
      },
    });

    const mappedResource = this.mapperGateway.mapArray(
      data.resource,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberCollaboratorQueryResult,
    );

    return new ListDataOutputModel<GetOrganizationMemberCollaboratorQueryResult>(
      {
        ...data,
        resource: mappedResource,
      },
    );
  }

  public async findOneOrganizationMemberByIdWithCollaboratorRelations(
    organizationMemberId: OrganizationMemberId,
  ): Promise<GetOrganizationMemberCollaboratorQueryResult | null> {
    const data = await this.findOne({
      where: {
        id: organizationMemberId.toString(),
      },
      relations: {
        customer: {
          authIdentity: true,
        },
        organization: true,
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      OrganizationMemberTypeormEntity,
      GetOrganizationMemberCollaboratorQueryResult,
    );
  }

  public async findOrganizationIdByOrganizationMemberId(
    organizationMemberId: OrganizationMemberId,
  ): Promise<OrganizationId | null> {
    const data = await this.findOne({
      where: {
        id: organizationMemberId.toString(),
        deletedAt: IsNull(),
      },
      relations: {
        organization: true,
      },
    });

    if (data?.organization === undefined) {
      return null;
    }

    return new OrganizationId(data.organization.id);
  }

  public async listCollaboratorsWithStats(
    param: ListOrganizationCollaboratorsWithStatsQueryParamType,
  ): Promise<
    ListDataOutputModel<GetOrganizationCollaboratorWithStatsQueryResult>
  > {
    const maxItemsPerQuery = 100;
    let limit = param.limit;
    let page = param.page;

    if (limit > maxItemsPerQuery) {
      limit = maxItemsPerQuery;
    }

    if (limit < 1) {
      limit = 1;
    }

    if (page < 1) {
      page = 1;
    }

    const searchTerm = (param.search ?? '').trim();
    const baseWhere: FindOptionsWhere<OrganizationMemberTypeormEntity> = {
      deletedAt: IsNull(),
    };

    if (param.organizationId !== null) {
      baseWhere.organization = { id: param.organizationId.toString() };
    }

    const where:
      | FindOptionsWhere<OrganizationMemberTypeormEntity>
      | FindOptionsWhere<OrganizationMemberTypeormEntity>[] =
      searchTerm !== ''
        ? [
            {
              ...baseWhere,
              customer: { name: Like(`%${searchTerm}%`) },
            },
            {
              ...baseWhere,
              customer: {
                authIdentity: {
                  email: Like(`%${searchTerm.toLowerCase()}%`),
                },
              },
            },
          ]
        : baseWhere;

    const skip = (page - 1) * limit;

    const [entities, totalItems] = await this.repository.findAndCount({
      where,
      relations: {
        customer: {
          authIdentity: true,
        },
      },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    const memberIds = entities.map((entity) => entity.id);

    const [pleadingCountByMember, analysisCountByMember] = await Promise.all([
      this.countRowsByCreatedByMemberId(LegalPleadingTypeormEntity, memberIds),
      this.countRowsByCreatedByMemberId(
        AnalysisToolRecordTypeormEntity,
        memberIds,
      ),
    ]);

    const resource = entities.map((entity) => {
      const collaborator = this.mapperGateway.map(
        entity,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberCollaboratorQueryResult,
      );

      return GetOrganizationCollaboratorWithStatsQueryResult.build({
        organizationMemberId: collaborator.organizationMemberId,
        name: collaborator.name,
        email: collaborator.email,
        federalDocument: collaborator.federalDocument,
        registrationDate: collaborator.registrationDate,
        legalPleadingCount: pleadingCountByMember.get(entity.id) ?? 0,
        analysisToolRecordCount: analysisCountByMember.get(entity.id) ?? 0,
      });
    });

    return new ListDataOutputModel<GetOrganizationCollaboratorWithStatsQueryResult>(
      {
        page,
        limit,
        totalItems,
        resource,
      },
    );
  }

  private async countRowsByCreatedByMemberId(
    entityClass:
      | typeof LegalPleadingTypeormEntity
      | typeof AnalysisToolRecordTypeormEntity,
    memberIds: string[],
  ): Promise<Map<string, number>> {
    if (memberIds.length === 0) {
      return new Map();
    }

    const targetRepository = this.repository.manager.getRepository(entityClass);

    const pairs = await Promise.all(
      memberIds.map(async (memberId) => {
        const total = await targetRepository.count({
          where: {
            createdBy: { id: memberId },
            deletedAt: IsNull(),
          },
        });

        return [memberId, total] as const;
      }),
    );

    return new Map(pairs);
  }
}
