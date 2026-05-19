import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/command/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCid(
    entity: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
    );

    return this.create(mapped);
  }
}
