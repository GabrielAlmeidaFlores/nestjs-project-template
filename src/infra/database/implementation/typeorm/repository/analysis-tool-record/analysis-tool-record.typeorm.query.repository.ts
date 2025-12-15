import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AnalysisToolRecordTypeormQueryRepository
  extends BaseTypeormQueryRepository<AnalysisToolRecordTypeormEntity>
  implements AnalysisToolRecordQueryRepositoryGateway
{
  protected readonly _type = AnalysisToolRecordTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolRecordTypeormEntity)
    repository: Repository<AnalysisToolRecordTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  > {
    const relationsClause = this.getRelationsClauseOperation();

    const searchParams: FindManyOptions<AnalysisToolRecordTypeormEntity> = {
      where: [],
      relations: relationsClause,
    };

    const baseWhere: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {
      createdBy: {
        customer: {
          authIdentity: { id: authIdentityId.toString() },
        },
        organization: { id: organizationId.toString() },
      },
    };

    const withUpdatedBy = {
      ...baseWhere,
      updatedBy: {
        customer: {
          authIdentity: { id: authIdentityId.toString() },
        },
        organization: { id: organizationId.toString() },
      },
    };

    const whereType =
      typeof listData.type === 'string' ? { type: listData.type } : {};

    const hasSearchBy = typeof listData.searchBy === 'string';
    const hasClientId =
      listData.analysisToolClientId instanceof AnalysisToolClientId;

    if (hasSearchBy && hasClientId) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
            name: Like(`${listData.searchBy}`),
          },
        },
        {
          ...whereType,
          ...baseWhere,
          code: Like(`${listData.searchBy}`),
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
          },
        },
      ];
    } else if (hasClientId) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            id: listData.analysisToolClientId.toString(),
          },
        },
      ];
    } else if (hasSearchBy) {
      searchParams.where = [
        {
          ...whereType,
          ...baseWhere,
          analysisToolClient: {
            name: Like(`${listData.searchBy}`),
          },
        },
        {
          ...whereType,
          ...baseWhere,
          code: Like(`${listData.searchBy}`),
        },
      ];
    } else {
      searchParams.where = [
        {
          ...whereType,
          ...withUpdatedBy,
        },
      ];
    }

    const data = await this.list(listData, searchParams);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async countByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
    });

    return total;
  }

  public async findWithRelationsByClientIdAndOrganizationIdAndAuthIdentityId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult[]> {
    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.find({
      where: {
        analysisToolClient: {
          id: analysisToolClientId.toString(),
        },
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
      },
      relations: relationsClause,
    });

    const mappedData = this.mapperGateway.mapArray(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByAnalysisToolRecordIdAndAuthIdentityIdAndOrganizationIdWithRelationsOrFail(
    id: AnalysisToolRecordId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: relationsClause,
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async countByOrganizationIdAndAnalysisToolClientIdAndAuthIdentityId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const total = await this.count({
      where: {
        createdBy: {
          organization: {
            id: organizationId.toString(),
          },
          customer: {
            authIdentity: {
              id: authIdentityId.toString(),
            },
          },
        },
        analysisToolClient: {
          id: analysisToolClientId.toString(),
        },
      },
    });

    return total;
  }

  public async findWithRelationsByCnisFastAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
    cnisFastAnalysisId: CnisFastAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          cnisFastAnalysis: {
            id: cnisFastAnalysisId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
          cnisFastAnalysis: {
            cnisFastAnalysisResult: true,
            cnisFastAnalysisInssBenefit: true,
            cnisFastAnalysisLegalProceeding: true,
          },
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
    retirementPlanningRppsId: CnisFastAnalysisId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          retirementPlanningRpps: {
            id: retirementPlanningRppsId.toString(),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
          },
        },
        relations: {
          analysisToolClient: {
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
          retirementPlanningRpps: {
            retirementPlanningRppsResult: true,
            remunerations: true,
            periods: {
              specialTimePeriod: true,
              disabilityPeriod: {
                cid: true,
                disabilityDocuments: true,
              },
            },
          },
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
    );

    return mappedData;
  }

  private getRelationsClauseOperation(): FindOptionsRelations<AnalysisToolRecordTypeormEntity> {
    const relationsClause: FindOptionsRelations<AnalysisToolRecordTypeormEntity> =
      {
        createdBy: {
          customer: true,
        },
        updatedBy: {
          customer: true,
        },
        analysisToolClient: {
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
          analysisToolClientLegalProceeding: true,
          analysisToolClientInssBenefit: true,
        },
      };

    for (const key of this.getEntityRelationsKey()) {
      relationsClause[key] = true as never;
    }

    return relationsClause;
  }

  private getEntityRelationsKey(): (
    | 'cnisFastAnalysis'
    | 'retirementPlanningRpps'
  )[] {
    return ['cnisFastAnalysis', 'retirementPlanningRpps'];
  }
}
