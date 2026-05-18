import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-special-period.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-special-period/command/general-urban-retirement-review-special-period.command.repository.gateway';
import { GeneralUrbanRetirementReviewSpecialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period.entity';
import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewSpecialPeriodTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity>
  implements GeneralUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewSpecialPeriodTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReviewSpecialPeriod(
    id: GeneralUrbanRetirementReviewSpecialPeriodId,
    props: GeneralUrbanRetirementReviewSpecialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewSpecialPeriodEntity,
      GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReviewSpecialPeriod(
    props: GeneralUrbanRetirementReviewSpecialPeriodEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewSpecialPeriodEntity,
      GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
    );

    return this.create(mappedData);
  }
}
