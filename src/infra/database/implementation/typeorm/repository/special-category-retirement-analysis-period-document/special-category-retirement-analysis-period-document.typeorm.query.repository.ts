import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { IsNull, Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/result/get-special-category-retirement-analysis-period-document.query.result';
import { SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-period-document/query/special-category-retirement-analysis-period-document.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { SpecialCategoryRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/value-object/special-category-retirement-analysis-work-period-id/special-category-retirement-analysis-work-period-id.value-object';

@Injectable()
export class SpecialCategoryRetirementAnalysisPeriodDocumentTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity>
  implements
    SpecialCategoryRetirementAnalysisPeriodDocumentQueryRepositoryGateway
{
  protected readonly _type =
    SpecialCategoryRetirementAnalysisPeriodDocumentTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
    )
    repository: Repository<SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByIdOrFail(
    id: SpecialCategoryRetirementAnalysisPeriodDocumentId,
    err: Constructor<NotFoundError>,
  ): Promise<GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString(), deletedAt: IsNull() },
        relations: { specialCategoryRetirementAnalysisWorkPeriod: true },
      },
      err,
    );
    return this.mapperGateway.map(
      data,
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
      GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult,
    );
  }

  public async listByWorkPeriodId(
    workPeriodId: SpecialCategoryRetirementAnalysisWorkPeriodId,
  ): Promise<GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult[]> {
    const data = await this.repository.find({
      where: {
        specialCategoryRetirementAnalysisWorkPeriod: {
          id: workPeriodId.toString(),
        },
        deletedAt: IsNull(),
      },
      relations: { specialCategoryRetirementAnalysisWorkPeriod: true },
    });
    return this.mapperGateway.mapArray(
      data,
      SpecialCategoryRetirementAnalysisPeriodDocumentTypeormEntity,
      GetSpecialCategoryRetirementAnalysisPeriodDocumentQueryResult,
    );
  }
}
