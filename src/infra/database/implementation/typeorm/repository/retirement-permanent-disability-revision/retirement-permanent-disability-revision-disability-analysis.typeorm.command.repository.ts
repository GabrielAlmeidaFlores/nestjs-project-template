import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis/command/retirement-permanent-disability-revision-disability-analysis.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/retirement-permanent-disability-revision-disability-analysis.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionDisabilityAnalysisCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDisabilityAnalysis(
    entity: RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    );

    return this.create(mapped);
  }
}
