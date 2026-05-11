import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-associated-cid/command/retirement-permanent-disability-revision-disability-analysis-associated-cid.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/retirement-permanent-disability-revision-disability-analysis-associated-cid.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCid(
    entity: RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity,
    );

    return this.create(mapped);
  }
}
