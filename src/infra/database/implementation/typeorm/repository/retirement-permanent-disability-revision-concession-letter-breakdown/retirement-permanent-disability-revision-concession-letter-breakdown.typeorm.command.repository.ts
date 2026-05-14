import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/command/retirement-permanent-disability-revision-concession-letter-breakdown.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown.entity';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionConcessionLetterBreakdown(
    entity: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateRetirementPermanentDisabilityRevisionConcessionLetterBreakdown(
    id: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    entity: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      entity,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
      RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRevision: {
            id: retirementPermanentDisabilityRevisionId.toString(),
          },
        });
    };
  }
}
