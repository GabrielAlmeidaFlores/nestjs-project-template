import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-benefit/command/retirement-permanent-disability-revision-disability-analysis-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/retirement-permanent-disability-revision-disability-analysis-benefit.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefit(
    entity: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
    );

    return this.create(mapped);
  }
}
