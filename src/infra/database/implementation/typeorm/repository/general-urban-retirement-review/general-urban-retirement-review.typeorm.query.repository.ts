import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/general-urban-retirement-review.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/result/get-general-urban-retirement-review-query.result';
import { GetGeneralUrbanRetirementReviewWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/query/result/get-general-urban-retirement-review-with-relations.query.result';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewTypeormEntity>
  implements GeneralUrbanRetirementReviewQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementReviewIdOrFailWithRelations(
    id: GeneralUrbanRetirementReviewId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          generalUrbanRetirementReviewBenefit: true,
          generalUrbanRetirementReviewResult: true,
          generalUrbanRetirementReviewLegalProceeding: true,
          generalUrbanRetirementReviewPeriod: true,
        },
      },
      err,
    );
    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewTypeormEntity,
      GetGeneralUrbanRetirementReviewWithRelationsQueryResult,
    );
  }

  public async findOneByGeneralUrbanRetirementReviewIdOrFail(
    id: GeneralUrbanRetirementReviewId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );
    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewTypeormEntity,
      GetGeneralUrbanRetirementReviewQueryResult,
    );
  }
}
