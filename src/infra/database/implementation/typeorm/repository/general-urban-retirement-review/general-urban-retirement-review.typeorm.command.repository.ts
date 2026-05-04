import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review/command/general-urban-retirement-review.command.repository.gateway';
import { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewTypeormEntity>
  implements GeneralUrbanRetirementReviewCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReview(
    id: GeneralUrbanRetirementReviewId,
    props: GeneralUrbanRetirementReviewEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewEntity,
      GeneralUrbanRetirementReviewTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReview(
    props: GeneralUrbanRetirementReviewEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewEntity,
      GeneralUrbanRetirementReviewTypeormEntity,
    );

    return this.create(mappedData);
  }
}
