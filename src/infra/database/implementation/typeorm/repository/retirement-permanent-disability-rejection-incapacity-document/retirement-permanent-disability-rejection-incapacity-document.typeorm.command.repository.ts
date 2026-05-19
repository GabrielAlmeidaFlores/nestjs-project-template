import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-incapacity-document/command/retirement-permanent-disability-rejection-incapacity-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';

@Injectable()
export class RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionIncapacityDocument(
    props: RetirementPermanentDisabilityRejectionIncapacityDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionIncapacityDocumentEntity,
      RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllRetirementPermanentDisabilityRejectionIncapacityDocumentsByIncapacityId(
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejectionIncapacity: {
            id: incapacityId.toString(),
          },
        });
    };
  }
}
