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
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record.query.result';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

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
  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  > {
    const searchParams: FindManyOptions<AnalysisToolRecordTypeormEntity> = {
      where: [],
    };

    const relations = this.getEntityRelationsKey();

    relations.forEach((relation) => {
      if (!Array.isArray(searchParams.where)) {
        return;
      }

      const where: FindOptionsWhere<AnalysisToolRecordTypeormEntity> = {};

      if (listData.type !== null) {
        where.type = listData.type;
      }

      if (listData.code !== null) {
        where.code = listData.code;
      }

      if (listData.clientName !== null) {
        where[relation] = {
          analysisToolClient: {
            name: Like(`%${listData.clientName}%`),
          },
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
          updatedBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        };
      } else {
        where[relation] = {
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
          updatedBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        };
      }

      searchParams.where.push(where);
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

  public async countByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number> {
    const whereClause: FindOptionsWhere<AnalysisToolRecordTypeormEntity>[] =
      this.getEntityRelationsKey().map((key) => ({
        [key]: {
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
          updatedBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
      }));

    const total = await this.count({
      where: whereClause,
    });

    return total;
  }

  public async findOneByIdWithRelationsOrFail(
    id: AnalysisToolRecordId,
    organizationId: OrganizationId,
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
          },
          updatedBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
      }));

    const relationsClause: FindOptionsRelations<AnalysisToolRecordTypeormEntity> =
      {};

    for (const key of this.getEntityRelationsKey()) {
      relationsClause[key] = {
        createdBy: {
          customer: true,
        },
        updatedBy: {
          customer: true,
        },
      } as never;
    }

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

  private getEntityRelationsKey(): ('cnisFastAnalysis' | 'legalPleading')[] {
    return ['cnisFastAnalysis', 'legalPleading'];
  }
}
