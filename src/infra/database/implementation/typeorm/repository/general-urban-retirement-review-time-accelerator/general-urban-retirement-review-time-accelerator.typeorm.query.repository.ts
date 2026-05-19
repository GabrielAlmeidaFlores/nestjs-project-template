import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/query/general-urban-retirement-review-time-accelerator.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/query/result/get-general-urban-retirement-review-time-accelerator.query.result';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewTimeAcceleratorTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity>
  implements GeneralUrbanRetirementReviewTimeAcceleratorQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewTimeAcceleratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementReviewTimeAcceleratorIdOrFail(
    id: GeneralUrbanRetirementReviewTimeAcceleratorId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString(), deletedAt: IsNull() },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult,
    );
  }

  public async findByGeneralUrbanRetirementReviewId(
    generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId,
  ): Promise<GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult[]> {
    const data = await this.find({
      where: {
        generalUrbanRetirementReview: {
          id: generalUrbanRetirementReviewId.toString(),
        },
      },
    });

    return this.mapperGateway.mapArray(
      data,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementReviewTimeAcceleratorQueryResult,
    );
  }
}
