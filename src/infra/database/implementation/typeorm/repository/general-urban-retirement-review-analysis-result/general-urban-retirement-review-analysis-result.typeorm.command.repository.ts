import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-analysis-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-analysis-result/command/general-urban-retirement-review-analysis-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result.entity';
import { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewAnalysisResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewAnalysisResultTypeormEntity>
  implements GeneralUrbanRetirementReviewAnalysisResultCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewAnalysisResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewAnalysisResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReviewAnalysisResult(
    id: GeneralUrbanRetirementReviewAnalysisResultId,
    props: GeneralUrbanRetirementReviewAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewAnalysisResultEntity,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReviewAnalysisResult(
    props: GeneralUrbanRetirementReviewAnalysisResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewAnalysisResultEntity,
      GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
