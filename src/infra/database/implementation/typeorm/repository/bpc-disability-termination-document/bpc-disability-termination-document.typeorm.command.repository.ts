import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityTerminationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/repository/bpc-disability-termination-document/command/bpc-disability-termination-document.command.repository.gateway';
import { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import { BpcDisabilityTerminationDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/bpc-disability-termination-document.entity';

@Injectable()
export class BpcDisabilityTerminationDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityTerminationDocumentTypeormEntity>
  implements BpcDisabilityTerminationDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityTerminationDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityTerminationDocumentTypeormEntity)
    repository: Repository<BpcDisabilityTerminationDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityTerminationDocument(
    props: BpcDisabilityTerminationDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityTerminationDocumentEntity,
      BpcDisabilityTerminationDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityTerminationDocument(
    props: BpcDisabilityTerminationDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) =>
      this.createBpcDisabilityTerminationDocument(item),
    );
  }

  public deleteAllBpcDisabilityTerminationDocumentByBpcDisabilityTerminationId(
    id: BpcDisabilityTerminationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(BpcDisabilityTerminationDocumentTypeormEntity)
        .softDelete({
          bpcDisabilityTermination: { id: id.toString() },
        });
    };
  }
}
