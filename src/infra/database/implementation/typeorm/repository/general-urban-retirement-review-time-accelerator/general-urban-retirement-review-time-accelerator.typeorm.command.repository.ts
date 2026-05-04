import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-time-accelerator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-time-accelerator/command/general-urban-retirement-review-time-accelerator.command.repository.gateway';
import { GeneralUrbanRetirementReviewTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewTimeAcceleratorTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity>
  implements GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewTimeAcceleratorTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateGeneralUrbanRetirementReviewTimeAccelerator(
    id: GeneralUrbanRetirementReviewTimeAcceleratorId,
    props: GeneralUrbanRetirementReviewTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewTimeAcceleratorEntity,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createGeneralUrbanRetirementReviewTimeAccelerator(
    props: GeneralUrbanRetirementReviewTimeAcceleratorEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewTimeAcceleratorEntity,
      GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
    );

    return this.create(mappedData);
  }
}
