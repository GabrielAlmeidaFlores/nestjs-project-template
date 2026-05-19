import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementGrantAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/general-urban-retirement-grant-analysis-result.query.repository.gateway';
import { GetGeneralUrbanRetirementGrantAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-analysis-result/query/result/get-general-urban-retirement-grant-analysis-result.query.result';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantAnalysisResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementGrantAnalysisResultTypeormEntity>
  implements GeneralUrbanRetirementGrantAnalysisResultQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementGrantAnalysisResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementGrantAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByGeneralUrbanRetirementGrantId(
    generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
  ): Promise<GetGeneralUrbanRetirementGrantAnalysisResultQueryResult[]> {
    const data = await this.find({
      relations: { generalUrbanRetirementGrant: true },
      where: {
        generalUrbanRetirementGrant: {
          id: generalUrbanRetirementGrantId.toString(),
        },
      },
      order: { createdAt: 'ASC' },
    });

    return data.map((item) =>
      this.mapperGateway.map(
        item,
        GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
        GetGeneralUrbanRetirementGrantAnalysisResultQueryResult,
      ),
    );
  }

  public async findOneByGeneralUrbanRetirementGrantAnalysisResultIdOrFail(
    id: GeneralUrbanRetirementGrantAnalysisResultId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementGrantAnalysisResultQueryResult> {
    const data = await this.findOneOrFail(
      {
        relations: { generalUrbanRetirementGrant: true },
        where: { id: id.toString() },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
      GetGeneralUrbanRetirementGrantAnalysisResultQueryResult,
    );
  }
}
