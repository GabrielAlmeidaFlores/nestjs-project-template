import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-earnings-history.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-earnings-history/command/general-urban-retirement-review-earnings-history.command.repository.gateway';
import { GeneralUrbanRetirementReviewEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity';
import { GeneralUrbanRetirementReviewEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/value-object/general-urban-retirement-review-earnings-history-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewEarningsHistoryTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity>
  implements GeneralUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewEarningsHistoryTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementReviewEarningsHistory(
    props: GeneralUrbanRetirementReviewEarningsHistoryEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewEarningsHistoryEntity,
      GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementReviewEarningsHistory(
    id: GeneralUrbanRetirementReviewEarningsHistoryId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
