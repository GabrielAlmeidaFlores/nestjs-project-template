import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
import { ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-by-legal-proceeding-number.query.param.gateway';
import { ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-created-range.query.param.gateway';
import { ListLegalProceedingCustomerQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-legal-proceeding-customer.query.param.gateway';
import { GetAnalysisToolClientLegalProceedingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding-with-relations.query.result';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';

export class AnalysisToolClientLegalProceedingTypeormQueryRepository
  extends BaseTypeormQueryRepository<AnalysisToolClientLegalProceedingTypeormEntity>
  implements AnalysisToolClientLegalProceedingQueryRepositoryGateway
{
  protected readonly _type =
    AnalysisToolClientLegalProceedingTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AnalysisToolClientLegalProceedingTypeormEntity)
    repository: Repository<AnalysisToolClientLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async listAnalysisToolClient(
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingQueryResult>
  > {
    const data = await this.list(listData);

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolClientLegalProceedingQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async listAnalysisToolClientWithRelations(
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  > {
    const data = await this.list(listData, {
      relations: {
        legalProceedingDetail: true,
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  > {
    const createdAtFilter =
      listData.createdAtStart && listData.createdAtEnd
        ? Between(listData.createdAtStart, listData.createdAtEnd)
        : listData.createdAtStart
          ? MoreThanOrEqual(listData.createdAtStart)
          : listData.createdAtEnd
            ? LessThanOrEqual(listData.createdAtEnd)
            : undefined;

    const data = await this.list(listData, {
      where: {
        ...(createdAtFilter ? { createdAt: createdAtFilter } : undefined),
        analysisToolClient: {
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
      },
      relations: {
        legalProceedingDetail: true,
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
          analysisToolRecord: true,
        },
      },
      order: {
        legalProceedingDetail: {
          createdAt: 'DESC',
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async listByLegalProceedingNumber(
    organizationId: OrganizationId,
    listData: ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  > {
    const data = await this.list(listData, {
      where: {
        analysisToolClient: {
          createdBy: {
            organization: {
              id: organizationId.toString(),
            },
          },
        },
        ...(listData.legalProceedingNumber !== null
          ? { legalProceedingNumber: listData.legalProceedingNumber }
          : undefined),
      },
      relations: {
        legalProceedingDetail: true,
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
          analysisToolRecord: true,
        },
      },
      order: {
        legalProceedingDetail: {
          createdAt: 'DESC',
        },
      },
    });

    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }

  public async listByAnalysisToolClientId(
    listData: ListLegalProceedingCustomerQueryParamGateway,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  > {
    const where =
      listData.analysisToolClientId !== null
        ? {
            analysisToolClient: {
              id: listData.analysisToolClientId.toString(),
            },
          }
        : {};

    const data = await this.list(listData, {
      where,
      relations: {
        legalProceedingDetail: true,
        analysisToolClient: {
          createdBy: {
            customer: true,
            organization: true,
          },
          updatedBy: {
            customer: true,
            organization: true,
          },
          analysisToolClientInssBenefit: true,
          analysisToolClientLegalProceeding: true,
          analysisToolRecord: true,
        },
      },
      order: {
        legalProceedingDetail: {
          createdAt: 'DESC',
        },
      },
    });
    const mappedData = this.mapperGateway.mapArray(
      data.resource,
      AnalysisToolClientLegalProceedingTypeormEntity,
      GetAnalysisToolClientLegalProceedingWithRelationsQueryResult,
    );

    return new ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>(
      {
        ...data,
        resource: mappedData,
      },
    );
  }
}
