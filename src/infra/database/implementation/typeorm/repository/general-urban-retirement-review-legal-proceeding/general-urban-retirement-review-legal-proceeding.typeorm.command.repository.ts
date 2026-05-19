import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-legal-proceeding/command/general-urban-retirement-review-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewLegalProceedingTypeormEntity>
  implements GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewLegalProceedingTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementReviewLegalProceeding(
    props: GeneralUrbanRetirementReviewLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewLegalProceedingEntity,
      GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementReviewLegalProceeding(
    id: GeneralUrbanRetirementReviewLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
