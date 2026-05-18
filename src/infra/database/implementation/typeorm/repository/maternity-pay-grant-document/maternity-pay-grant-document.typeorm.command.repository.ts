import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-document/command/maternity-pay-grant-document.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity';

@Injectable()
export class MaternityPayGrantDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantDocumentTypeormEntity>
  implements MaternityPayGrantDocumentCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantDocumentTypeormEntity)
    repository: Repository<MaternityPayGrantDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantDocument(
    props: MaternityPayGrantDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantDocumentEntity,
      MaternityPayGrantDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantDocumentTypeormEntity)
        .softDelete({
          maternityPayGrant: { id: maternityPayGrantId.toString() },
        });
    };
  }
}
