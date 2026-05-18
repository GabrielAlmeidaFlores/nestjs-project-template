import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/result/get-survivor-pension-analysis-benefit-originator-identification.query.result';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/survivor-pension-analysis-benefit-originator-identification.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity>
  implements
    SurvivorPensionAnalysisBenefitOriginatorIdentificationQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult | null> {
    const data = await this.findOne({
      where: {
        survivorPensionAnalysis: { id: survivorPensionAnalysisId.toString() },
      },
      relations: { survivorPensionAnalysis: true, documents: true },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult,
    );
  }

  public async findOneById(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: { survivorPensionAnalysis: true, documents: true },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: { survivorPensionAnalysis: true, documents: true },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult,
    );
  }
}
