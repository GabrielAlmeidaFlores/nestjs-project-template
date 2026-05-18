import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementReviewInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/repository/general-urban-retirement-review-inss-benefit/command/general-urban-retirement-review-inss-benefit.command.repository.gateway';
import { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';
import { GeneralUrbanRetirementReviewInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/value-object/general-urban-retirement-review-inss-benefit-id.value-object';

@Injectable()
export class GeneralUrbanRetirementReviewInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementReviewInssBenefitTypeormEntity>
  implements GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementReviewInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementReviewInssBenefitTypeormEntity)
    repository: Repository<GeneralUrbanRetirementReviewInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementReviewInssBenefit(
    props: GeneralUrbanRetirementReviewInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      GeneralUrbanRetirementReviewInssBenefitEntity,
      GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteGeneralUrbanRetirementReviewInssBenefit(
    id: GeneralUrbanRetirementReviewInssBenefitId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
