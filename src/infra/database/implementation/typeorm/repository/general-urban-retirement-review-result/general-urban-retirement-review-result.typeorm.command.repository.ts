import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-result/command/general-urban-retirement-review-result.command.repository.gateway';
import { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewResultTypeormEntity>
  implements GeneralUrbanRetirementReviewResultCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewResultTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReviewResult(
    id: GeneralUrbanRetirementReviewResultId,
    props: GeneralUrbanRetirementReviewResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewResultEntity,
      GeneralUrbanRetirementReviewResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReviewResult(
    props: GeneralUrbanRetirementReviewResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewResultEntity,
      GeneralUrbanRetirementReviewResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
