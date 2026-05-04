import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewResultQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/query/general-urban-retirement-review-result.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/query/result/get-general-urban-retirement-review-result.query.result';
import { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewResultTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewResultTypeormEntity>
  implements GeneralUrbanRetirementReviewResultQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewResultTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementReviewResultIdOrFail(
    id: GeneralUrbanRetirementReviewResultId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewResultQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewResultTypeormEntity,
      GetGeneralUrbanRetirementReviewResultQueryResult,
    );
  }
}
