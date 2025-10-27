import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
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

  public async findOneByAnalysisToolClientIdOrFail(
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

  public async findOneByEmail(
    email: Email,
    organizationId: OrganizationId,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult | null> {
    const data = await this.findOne({
      where: {
        email: email.toString(),
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
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async findOneByFederalDocument(
    federalDocument: FederalDocument,
    organizationId: OrganizationId,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult | null> {
    const data = await this.findOne({
      where: {
        federalDocument: federalDocument.toString(),
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
    });

    if (data === null) {
      return null;
    }

    const mappedData = this.mapperGateway.map(
      data,
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithRelationsQueryResult,
    );

    return mappedData;
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientWithRelationsQueryResult>
  > {
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
      AnalysisToolClientTypeormEntity,
      GetAnalysisToolClientWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolClientWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
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
