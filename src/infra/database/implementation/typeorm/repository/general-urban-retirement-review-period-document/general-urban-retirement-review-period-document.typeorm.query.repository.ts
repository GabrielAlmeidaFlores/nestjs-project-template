import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period-document/query/general-urban-retirement-review-period-document.query.repository.gateway';
import { GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period-document/query/result/get-general-urban-retirement-review-period-document.query.result';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { GeneralUrbanRetirementReviewPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period-document/value-object/general-urban-retirement-review-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity>
  implements GeneralUrbanRetirementReviewPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByGeneralUrbanRetirementReviewPeriodDocumentIdOrFail(
    id: GeneralUrbanRetirementReviewPeriodDocumentId,
    err: Constructor<NotFoundError>,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult> {
    const data = await this.findOneOrFail(
      { where: { id: id.toString() } },
      err,
    );

    return this.mapperGateway.map(
      data,
      GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult,
    );
  }

  public async findByGeneralUrbanRetirementReviewPeriodId(
    periodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult[]> {
    const data = await this.find({
      where: {
        generalUrbanRetirementReviewPeriod: {
          id: periodId.toString(),
        },
      },
    });

    return this.mapperGateway.mapArray(
      data,
      GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity,
      GetGeneralUrbanRetirementReviewPeriodDocumentQueryResult,
    );
  }
}
