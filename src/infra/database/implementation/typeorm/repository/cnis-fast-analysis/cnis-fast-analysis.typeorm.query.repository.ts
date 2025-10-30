import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

@Injectable()
export class CnisFastAnalysisTypeormQueryRepository
  extends BaseTypeormQueryRepository<CnisFastAnalysisTypeormEntity>
  implements CnisFastAnalysisQueryRepositoryGateway
{
  protected readonly _type = CnisFastAnalysisTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(CnisFastAnalysisTypeormEntity)
    repository: Repository<CnisFastAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetCnisFastAnalysisWithRelationsQueryResult>> {
    const data = await this.list(listData, {
      where: {
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
      relations: {
        cnisFastAnalysisInssBenefit: true,
        cnisFastAnalysisLegalProceeding: true,
        analysisToolClient: {
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
        },
        cnisFastAnalysisResult: true,
        createdBy: {
          customer: true,
        },
        updatedBy: {
          customer: true,
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetCnisFastAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneByIdWithRelationsOrFail(
    id: CnisFastAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetCnisFastAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
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
        relations: {
          cnisFastAnalysisInssBenefit: true,
          cnisFastAnalysisLegalProceeding: true,
          analysisToolClient: {
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
          cnisFastAnalysisResult: true,
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
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByCnisFastAnalysisAndOrganizationIdOrFail(
    cnisFastAnalysisId: CnisFastAnalysisId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetCnisFastAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: cnisFastAnalysisId.toString(),
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
        relations: {
          createdBy: {
            customer: true,
          },
          updatedBy: {
            customer: true,
          },
          analysisToolClient: {
            createdBy: true,
            updatedBy: true,
            analysisToolClientInssBenefit: true,
            analysisToolClientLegalProceeding: true,
          },
          cnisFastAnalysisResult: true,
          cnisFastAnalysisInssBenefit: true,
          cnisFastAnalysisLegalProceeding: true,
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      CnisFastAnalysisTypeormEntity,
      GetCnisFastAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
