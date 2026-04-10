import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/result/get-survivor-pension-analysis-deceased-benefit-dependents.query.result';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/survivor-pension-analysis-deceased-benefit-dependents.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity>
  implements
    SurvivorPensionAnalysisDeceasedBenefitDependentsQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findManyBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult[]> {
    const data = await this.find({
      where: {
        survivorPensionAnalysis: { id: survivorPensionAnalysisId.toString() },
      },
      relations: {
        survivorPensionAnalysis: true,
        documents: { deceasedBenefitDependents: true },
      },
    });

    return data.map((item) =>
      this.mapperGateway.map(
        item,
        SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
        GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult,
      ),
    );
  }

  public async findOneById(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: {
        survivorPensionAnalysis: true,
        documents: { deceasedBenefitDependents: true },
      },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisDeceasedBenefitDependentsId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          survivorPensionAnalysis: true,
          documents: { deceasedBenefitDependents: true },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity,
      GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult,
    );
  }
}
