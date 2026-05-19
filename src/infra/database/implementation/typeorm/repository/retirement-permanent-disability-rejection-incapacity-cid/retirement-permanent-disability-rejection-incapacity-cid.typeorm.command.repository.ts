import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-cid.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity-cid/command/retirement-permanent-disability-rejection-incapacity-cid.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityCidEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-cid/retirement-permanent-disability-rejection-incapacity-cid.entity';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityCidTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionIncapacityCidCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityCidTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionIncapacityCid(
    props: RetirementPermanentDisabilityRejectionIncapacityCidEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionIncapacityCidEntity,
      RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllRetirementPermanentDisabilityRejectionIncapacityCidsByIncapacityId(
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejectionIncapacity: {
            id: incapacityId.toString(),
          },
        });
    };
  }
}
