import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRevisionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/command/retirement-permanent-disability-revision-document.command.repository.gateway';
import { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';
import { RetirementPermanentDisabilityRevisionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/retirement-permanent-disability-revision-document.entity';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRevisionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRevisionDocumentTypeormEntity>
  implements
    RetirementPermanentDisabilityRevisionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRevisionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRevisionDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRevisionDocument(
    props: RetirementPermanentDisabilityRevisionDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRevisionDocumentEntity,
      RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByRetirementPermanentDisabilityRevisionIdAndType(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
    type: RetirementPermanentDisabilityRevisionDocumentTypeEnum,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(RetirementPermanentDisabilityRevisionDocumentTypeormEntity)
        .softDelete({
          retirementPermanentDisabilityRevision: {
            id: retirementPermanentDisabilityRevisionId.toString(),
          },
          type,
        });
    };
  }
}
