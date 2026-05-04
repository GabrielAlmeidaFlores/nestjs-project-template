import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-period/command/general-urban-retirement-review-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewPeriodTypeormEntity>
  implements GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReviewPeriod(
    id: GeneralUrbanRetirementReviewPeriodId,
    props: GeneralUrbanRetirementReviewPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewPeriodEntity,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReviewPeriod(
    props: GeneralUrbanRetirementReviewPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewPeriodEntity,
      GeneralUrbanRetirementReviewPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
