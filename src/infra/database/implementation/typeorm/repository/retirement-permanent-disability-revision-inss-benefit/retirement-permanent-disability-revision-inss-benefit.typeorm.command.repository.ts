import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/command/retirement-permanent-disability-revision-inss-benefit.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-benefit.entity';

@Injectable()
export class RetirementPermanentDisabilityRevisionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionInssBenefit(
    props: RetirementPermanentDisabilityRevisionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionInssBenefitEntity,
      RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRevision: {
            id: retirementPermanentDisabilityRevisionId.toString(),
          },
        });
    };
  }
}
