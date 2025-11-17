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
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

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

  public async listByOrganizationAndAuthIdentityId(
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

    const relations = this.getEntityRelationsKey();

    relations.forEach((relation) => {
      if (!Array.isArray(searchParams.where)) {
        return;
      }

      const where: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {};

      if (typeof listData.type === 'string') {
        where.type = listData.type;
      }
      const hasSearchBy = typeof listData.searchBy === 'string';
      const hasAnalysisToolClientId =
        listData.analysisToolClientId instanceof AnalysisToolClientId;

      if (hasSearchBy && hasAnalysisToolClientId) {
        searchParams.where.push({
          ...where,
          [relation]: {
            analysisToolClient: {
              id: listData.analysisToolClientId.toString(),
              name: Like(`${listData.searchBy}`),
            },
            createdBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
            updatedBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        });
        searchParams.where.push({
          ...where,
          code: Like(`${listData.searchBy}`),
          [relation]: {
            analysisToolClient: {
              id: listData.analysisToolClientId.toString(),
            },
            createdBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
            updatedBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        });
        return;
      }

      if (listData.analysisToolClientId instanceof AnalysisToolClientId) {
        searchParams.where.push({
          ...where,
          [relation]: {
            analysisToolClient: {
              id: listData.analysisToolClientId.toString(),
            },
            createdBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
            updatedBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        });
        return;
      }

      if (typeof listData.searchBy === 'string') {
        searchParams.where.push({
          ...where,
          [relation]: {
            analysisToolClient: {
              name: Like(`${listData.searchBy}`),
            },
            createdBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
            updatedBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        });

        searchParams.where.push({
          ...where,
          code: Like(`${listData.searchBy}`),
          [relation]: {
            createdBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
            updatedBy: {
              customer: {
                authIdentity: {
                  id: authIdentityId.toString(),
                },
              },
              organization: {
                id: organizationId.toString(),
              },
            },
          },
        });

        return;
      }

      searchParams.where.push({
        ...where,
        [relation]: {
          createdBy: {
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
            organization: {
              id: organizationId.toString(),
            },
          },
          updatedBy: {
            customer: {
              authIdentity: {
                id: authIdentityId.toString(),
              },
            },
            organization: {
              id: organizationId.toString(),
            },
          },
        },
      });
    });

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

  public async countByOrganizationAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number> {
    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      this.getEntityRelationsKey().map((key) => ({
        [key]: {
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
      }));

    const total = await this.count({
      where: whereClause,
    });

    return total;
  }

  public async findWithRelationsByClientAndOrganizationAndAuthIdentity(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult[]> {
    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      this.getEntityRelationsKey().map((key) => ({
        [key]: {
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
      }));

    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.find({
      where: whereClause,
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
    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      this.getEntityRelationsKey().map((key) => ({
        id: id.toString(),
        [key]: {
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
      }));

    const relationsClause = this.getRelationsClauseOperation();

    const data = await this.findOneOrFail(
      {
        where: whereClause,
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
    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      this.getEntityRelationsKey().map((key) => ({
        [key]: {
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
      }));

    const total = await this.count({
      where: whereClause,
    });

    return total;
  }

  private getRelationsClauseOperation(): FindOptionsRelations<AnalysisToolRecordTypeormEntity> {
    const relationsClause: FindOptionsRelations<AnalysisToolRecordTypeormEntity> =
      {};

    for (const key of this.getEntityRelationsKey()) {
      relationsClause[key] = {
        analysisToolClient: {
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
        },
        createdBy: {
          customer: true,
        },
        updatedBy: {
          customer: true,
        },
      } as never;
    }

    return relationsClause;
  }

  private getEntityRelationsKey(): 'cnisFastAnalysis'[] {
    return ['cnisFastAnalysis'];
  }
}
