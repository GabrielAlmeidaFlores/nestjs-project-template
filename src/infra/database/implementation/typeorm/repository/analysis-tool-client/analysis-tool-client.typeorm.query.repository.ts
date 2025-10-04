import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class AnalysisToolClientTypeormQueryRepository
  extends BaseTypeormQueryRepository<AnalysisToolClientTypeormEntity>
  implements AnalysisToolClientQueryRepositoryGateway
{
  protected readonly _type = AnalysisToolClientTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientTypeormEntity)
    repository: Repository<AnalysisToolClientTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByAnalysisToolClientAndOrganizationIdOrFail(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: analysisToolClientId.toString(),
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
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithRelationsQueryResult,
    );

    return mappedData;
  }
}
