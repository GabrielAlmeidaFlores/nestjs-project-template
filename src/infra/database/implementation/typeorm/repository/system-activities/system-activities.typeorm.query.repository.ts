import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SystemActivitiesTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/system-activities.typeorm.entity';
import { GetSystemActivityQueryResult } from '@module/customer/analysis-tool/domain/repository/system-activities/query/result/get-system-activity.query.result';
import { SystemActivitiesQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/system-activities/query/system-activities.query.repository.gateway';
import { ListSystemActivitiesQueryParamType } from '@module/customer/analysis-tool/domain/repository/system-activities/query/type/input/list-system-activities.query.param';

@Injectable()
export class SystemActivitiesTypeormQueryRepository
  extends BaseTypeormQueryRepository<SystemActivitiesTypeormEntity>
  implements SystemActivitiesQueryRepositoryGateway
{
  protected readonly _type = SystemActivitiesTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SystemActivitiesTypeormEntity)
    repository: Repository<SystemActivitiesTypeormEntity>,
  ) {
    super(repository);
  }

  public async listPaginated(
    param: ListSystemActivitiesQueryParamType,
  ): Promise<ListDataOutputModel<GetSystemActivityQueryResult>> {
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

    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.repository.findAndCount({
      where: this.buildWhere(param),
      relations: {
        organizationMember: {
          organization: true,
          customer: {
            authIdentity: true,
          },
        },
        analysisToolRecord: true,
        analysisToolClient: true,
      },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    const resource = items.map((row) => {
      const organizationMember = row.organizationMember;
      const customer = organizationMember?.customer;
      const authIdentity = customer?.authIdentity;
      const analysisToolRecord = row.analysisToolRecord;
      const analysisToolClient = row.analysisToolClient;

      return GetSystemActivityQueryResult.build({
        id: row.id,
        title: row.title,
        description: row.description,
        createdAt: row.createdAt,
        organizationMemberId: organizationMember?.id ?? null,
        collaboratorName: customer?.name ?? null,
        collaboratorEmail: authIdentity?.email ?? null,
        analysisToolRecordId: analysisToolRecord?.id ?? null,
        analysisCode: analysisToolRecord?.code ?? null,
        analysisToolClientId: analysisToolClient?.id ?? null,
        clientName: analysisToolClient?.name ?? null,
      });
    });

    return new ListDataOutputModel<GetSystemActivityQueryResult>({
      page,
      limit,
      totalItems,
      resource,
    });
  }

  private buildWhere(
    param: ListSystemActivitiesQueryParamType,
  ):
    | FindOptionsWhere<SystemActivitiesTypeormEntity>
    | FindOptionsWhere<SystemActivitiesTypeormEntity>[] {
    const searchTerm = (param.search ?? '').trim();

    if (searchTerm !== '') {
      return this.buildWhereSearchOrBranches(param, searchTerm);
    }

    return this.buildWhereWithoutSearch(param);
  }

  private buildWhereWithoutSearch(
    param: ListSystemActivitiesQueryParamType,
  ): FindOptionsWhere<SystemActivitiesTypeormEntity> {
    const where: FindOptionsWhere<SystemActivitiesTypeormEntity> = {};

    this.applyCreatedAtFilter(where, param);

    const organizationMemberBase = this.buildOrganizationMemberBaseOnly(param);

    if (Object.keys(organizationMemberBase).length > 0) {
      where.organizationMember = organizationMemberBase;
    }

    return where;
  }

  private buildWhereSearchOrBranches(
    param: ListSystemActivitiesQueryParamType,
    searchTerm: string,
  ): FindOptionsWhere<SystemActivitiesTypeormEntity>[] {
    const likePatternNameAndCode = `%${searchTerm}%`;
    const likePatternEmail = `%${searchTerm.toLowerCase()}%`;
    const organizationMemberBase = this.buildOrganizationMemberBaseOnly(param);

    const branchByCollaboratorName: FindOptionsWhere<SystemActivitiesTypeormEntity> =
      {};
    this.applyCreatedAtFilter(branchByCollaboratorName, param);
    branchByCollaboratorName.organizationMember = {
      ...organizationMemberBase,
      customer: { name: Like(likePatternNameAndCode) },
    };

    const branchByCollaboratorEmail: FindOptionsWhere<SystemActivitiesTypeormEntity> =
      {};
    this.applyCreatedAtFilter(branchByCollaboratorEmail, param);
    branchByCollaboratorEmail.organizationMember = {
      ...organizationMemberBase,
      customer: {
        authIdentity: {
          email: Like(likePatternEmail),
        },
      },
    };

    const branchByAnalysisCode: FindOptionsWhere<SystemActivitiesTypeormEntity> =
      {};
    this.applyCreatedAtFilter(branchByAnalysisCode, param);
    if (Object.keys(organizationMemberBase).length > 0) {
      branchByAnalysisCode.organizationMember = { ...organizationMemberBase };
    }
    branchByAnalysisCode.analysisToolRecord = {
      code: Like(likePatternNameAndCode),
    };

    return [
      branchByCollaboratorName,
      branchByCollaboratorEmail,
      branchByAnalysisCode,
    ];
  }

  private applyCreatedAtFilter(
    where: FindOptionsWhere<SystemActivitiesTypeormEntity>,
    param: ListSystemActivitiesQueryParamType,
  ): void {
    if (param.startDate !== null && param.endDate !== null) {
      where.createdAt = Between(param.startDate, param.endDate);
    } else if (param.startDate !== null) {
      where.createdAt = MoreThanOrEqual(param.startDate);
    } else if (param.endDate !== null) {
      where.createdAt = LessThanOrEqual(param.endDate);
    }
  }

  private buildOrganizationMemberBaseOnly(
    param: ListSystemActivitiesQueryParamType,
  ): FindOptionsWhere<OrganizationMemberTypeormEntity> {
    const om: FindOptionsWhere<OrganizationMemberTypeormEntity> = {};

    if (param.organizationId !== null) {
      om.organization = { id: param.organizationId.toString() };
    }

    if (param.organizationMemberIdFilter !== null) {
      om.id = param.organizationMemberIdFilter.toString();
    }

    return om;
  }
}
