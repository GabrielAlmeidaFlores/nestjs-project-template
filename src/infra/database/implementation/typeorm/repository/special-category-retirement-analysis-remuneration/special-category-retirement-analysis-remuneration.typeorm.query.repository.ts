import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisRemunerationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-remuneration.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import { SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/special-category-retirement-analysis-remuneration.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisRemunerationTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisRemunerationTypeormEntity>
  implements SpecialCategoryRetirementAnalysisRemunerationQueryRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisRemunerationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
    )
    repository: Repository<SpecialCategoryRetirementAnalysisRemunerationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    id: SpecialCategoryRetirementAnalysisRemunerationId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: { specialCategoryRetirementAnalysis: true },
      },
      err,
    );
    return this.mapperGateway.map(
      data,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
      GetSpecialCategoryRetirementAnalysisRemunerationQueryResult,
    );
  }

  public async listByAnalysisId(
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationQueryResult[]> {
    const data = await this.repository.find({
      where: {
        specialCategoryRetirementAnalysis: { id: analysisId.toString() },
        deletedAt: IsNull(),
      },
      relations: { specialCategoryRetirementAnalysis: true },
    });
    return this.mapperGateway.mapArray(
      data,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
      GetSpecialCategoryRetirementAnalysisRemunerationQueryResult,
    );
  }

  public async findOneByAnalysisIdAndMonthYear(
    analysisId: SpecialCategoryRetirementAnalysisId,
    monthYear: Date,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationQueryResult | null> {
    const data = await this.repository.findOne({
      where: {
        specialCategoryRetirementAnalysis: { id: analysisId.toString() },
        remunerationReferenceMonthYear: monthYear,
        deletedAt: IsNull(),
      },
      relations: { specialCategoryRetirementAnalysis: true },
    });
    if (!data) {
      return null;
    }
    return this.mapperGateway.map(
      data,
      SpecialCategoryRetirementAnalysisRemunerationTypeormEntity,
      GetSpecialCategoryRetirementAnalysisRemunerationQueryResult,
    );
  }
}
