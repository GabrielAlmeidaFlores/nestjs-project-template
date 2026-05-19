import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-special-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/general-urban-retirement-review-special-period.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/query/result/get-general-urban-retirement-review-special-period.query.result';
import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class GeneralUrbanRetirementReviewSpecialPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity>
  implements GeneralUrbanRetirementReviewSpecialPeriodQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewSpecialPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementReviewSpecialPeriodIdOrFail(
    id: GeneralUrbanRetirementReviewSpecialPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString(), deletedAt: IsNull() } },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
      GetGeneralUrbanRetirementReviewSpecialPeriodQueryResult,
    );
  }
}
