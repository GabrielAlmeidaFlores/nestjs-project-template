import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetSpecialActivityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/result/get-special-activity-analysis-with-relations.query.result';
import { SpecialActivityAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/special-activity-analysis.query.repository.gateway';
import { SpecialActivityId } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';

@Injectable()
export class SpecialActivityTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialActivityTypeormEntity>
  implements SpecialActivityAnalysisQueryRepositoryGateway
{
  protected readonly _type = SpecialActivityTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialActivityTypeormEntity)
    repository: Repository<SpecialActivityTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetSpecialActivityAnalysisWithRelationsQueryResult>
  > {
    const data = await this.list(listData, {
      where: {
        analysisToolRecord: {
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
      },
      relations: {
        specialActivityInssBenefit: true,
        specialActivityLegalProceeding: true,
        specialActivityResult: true,
        specialActivityDocuments: true,
        analysisToolRecord: {
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
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      SpecialActivityTypeormEntity,
      GetSpecialActivityAnalysisWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetSpecialActivityAnalysisWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async findOneBySpecialActivityIdAndOrganizationIdWithRelationsOrFail(
    id: SpecialActivityId,
    organizationId: OrganizationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpecialActivityAnalysisWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: {
          id: id.toString(),
          analysisToolRecord: {
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
        },
        relations: {
          specialActivityInssBenefit: true,
          specialActivityLegalProceeding: true,
          specialActivityResult: true,
          specialActivityDocuments: true,
          analysisToolRecord: {
            analysisToolClient: {
              createdBy: {
                customer: true,
              },
              updatedBy: {
                customer: true,
              },
              analysisToolClientInssBenefit: true,
              analysisToolClientLegalProceeding: true,
            },
            createdBy: {
              customer: true,
            },
            updatedBy: {
              customer: true,
            },
          },
        },
      },
      err,
    );

    const mappedData = this.mapperGateway.map(
      data,
      SpecialActivityTypeormEntity,
      GetSpecialActivityAnalysisWithRelationsQueryResult,
    );

    return mappedData;
  }
}
