import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-earnings-history/query/general-urban-retirement-review-earnings-history.query.repository.gateway';
import { GeneralUrbanRetirementReviewEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewEarningsHistoryTypeormQueryRepository implements GeneralUrbanRetirementReviewEarningsHistoryQueryRepositoryGateway {
  protected readonly _type =
    GeneralUrbanRetirementReviewEarningsHistoryTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity)
    private readonly repository: Repository<GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findByGeneralUrbanRetirementReviewPeriodId(
    periodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GeneralUrbanRetirementReviewEarningsHistoryEntity[]> {
    const results = await this.repository.find({
      where: {
        generalUrbanRetirementReviewPeriod: {
          id: periodId.toString(),
        },
      },
    });

    return results.map((r) =>
      this.mapperGateway.map(
        r,
        GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity,
        GeneralUrbanRetirementReviewEarningsHistoryEntity,
      ),
    );
  }

  public async findByGeneralUrbanRetirementReviewPeriodIdBelowMinimum(
    periodId: GeneralUrbanRetirementReviewPeriodId,
  ): Promise<GeneralUrbanRetirementReviewEarningsHistoryEntity[]> {
    const results = await this.repository.find({
      where: {
        generalUrbanRetirementReviewPeriod: {
          id: periodId.toString(),
        },
        competenceBelowTheMinimum: true,
      },
    });

    return results.map((r) =>
      this.mapperGateway.map(
        r,
        GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity,
        GeneralUrbanRetirementReviewEarningsHistoryEntity,
      ),
    );
  }
}
