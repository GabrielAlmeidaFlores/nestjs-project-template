import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-work-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/result/get-special-category-retirement-analysis-work-period.query.result';
import { SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/special-category-retirement-analysis-work-period.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisWorkPeriodTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity>
  implements SpecialCategoryRetirementAnalysisWorkPeriodQueryRepositoryGateway
{
  protected readonly _type = SpecialCategoryRetirementAnalysisWorkPeriodTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity)
    repository: Repository<SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    id: SpecialCategoryRetirementAnalysisWorkPeriodId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString(), deletedAt: IsNull() },
        relations: { specialCategoryRetirementAnalysis: true },
      },
      err,
    );
    return this.mapperGateway.map(
      data,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
      GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult,
    );
  }

  public async listByAnalysisId(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult[]> {
    const data = await this.repository.find({
      where: {
        specialCategoryRetirementAnalysis: { id: analysisId.toString() },
        deletedAt: IsNull(),
      },
      relations: { specialCategoryRetirementAnalysis: true },
    });
    return this.mapperGateway.mapArray(
      data,
      SpecialCategoryRetirementAnalysisWorkPeriodTypeormEntity,
      GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult,
    );
  }
}
