import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/general-urban-retirement-review-analysis-result.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/query/result/get-general-urban-retirement-review-analysis-result.query.result';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewAnalysisResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewAnalysisResultTypeormEntity>
  implements GeneralUrbanRetirementReviewAnalysisResultQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewAnalysisResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyByGeneralUrbanRetirementReviewId(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<GetGeneralUrbanRetirementReviewAnalysisResultQueryResult[]> {
    const data = await this.find({
      relations: { generalUrbanRetirementReview: true },
      where: {
        generalUrbanRetirementReview: {
          id: generalUrbanRetirementReviewId.toString(),
        },
      },
      order: { createdAt: 'ASC' },
    });

    return data.map((item) =>
      this.mapperGateway.map(
        item,
        GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
        GetGeneralUrbanRetirementReviewAnalysisResultQueryResult,
      ),
    );
  }

  public async findOneByGeneralUrbanRetirementReviewAnalysisResultIdOrFail(
    id: GeneralUrbanRetirementReviewAnalysisResultId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewAnalysisResultQueryResult> {
    const data = await this.findOneOrFail(
      {
        relations: { generalUrbanRetirementReview: true },
        where: { id: id.toString() },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
      GetGeneralUrbanRetirementReviewAnalysisResultQueryResult,
    );
  }
}
