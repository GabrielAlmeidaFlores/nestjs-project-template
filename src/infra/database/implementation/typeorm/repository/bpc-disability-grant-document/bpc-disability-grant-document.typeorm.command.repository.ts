import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { BpcDisabilityGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { BpcDisabilityGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/repository/bpc-disability-grant-document/command/bpc-disability-grant-document.command.repository.gateway';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/bpc-disability-grant-document.entity';
import { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';

@Injectable()
export class BpcDisabilityGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<BpcDisabilityGrantDocumentTypeormEntity>
  implements BpcDisabilityGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    BpcDisabilityGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(BpcDisabilityGrantDocumentTypeormEntity)
    repository: Repository<BpcDisabilityGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createBpcDisabilityGrantDocument(
    props: BpcDisabilityGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      BpcDisabilityGrantDocumentEntity,
      BpcDisabilityGrantDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public createManyBpcDisabilityGrantDocument(
    props: BpcDisabilityGrantDocumentEntity[],
  ): TransactionType[] {
    return props.map((item) => this.createBpcDisabilityGrantDocument(item));
  }

  public deleteAllByBpcDisabilityGrantId(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(BpcDisabilityGrantDocumentTypeormEntity)
        .delete({
          BpcDisabilityGrant: { id: bpcDisabilityGrantId.toString() },
        });
    };
  }

  public deleteByBpcDisabilityGrantIdAndType(
    bpcDisabilityGrantId: BpcDisabilityGrantId,
    type: BpcDisabilityGrantDocumentTypeEnum,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(BpcDisabilityGrantDocumentTypeormEntity)
        .delete({
          BpcDisabilityGrant: { id: bpcDisabilityGrantId.toString() },
          type,
        });
    };
  }
}
