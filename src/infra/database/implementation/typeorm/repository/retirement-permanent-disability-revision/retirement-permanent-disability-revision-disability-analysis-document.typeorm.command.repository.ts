import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-disability-analysis-document/command/retirement-permanent-disability-revision-disability-analysis-document.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-document/retirement-permanent-disability-revision-disability-analysis-document.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity>
  implements RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDisabilityAnalysisDocument(
    entity: RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity,
  ): TransactionType {
    const mapped = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentEntity,
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity,
    );

    return this.create(mapped);
  }
}
