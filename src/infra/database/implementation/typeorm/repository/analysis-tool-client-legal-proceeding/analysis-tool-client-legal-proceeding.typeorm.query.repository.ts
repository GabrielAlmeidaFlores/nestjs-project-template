import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AnalysisToolClientLegalProceedingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/analysis-tool-client-legal-proceeding.query.repository.gateway';
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
