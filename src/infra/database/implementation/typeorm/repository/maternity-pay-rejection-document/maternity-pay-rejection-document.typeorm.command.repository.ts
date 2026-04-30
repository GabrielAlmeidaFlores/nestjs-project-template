import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-document/command/maternity-pay-rejection-document.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';

@Injectable()
export class MaternityPayRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionDocumentTypeormEntity>
  implements MaternityPayRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionDocumentTypeormEntity)
    repository: Repository<MaternityPayRejectionDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionDocument(
    props: MaternityPayRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionDocumentEntity,
      MaternityPayRejectionDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllMaternityPayRejectionDocumentByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayRejectionDocumentTypeormEntity)
        .softDelete({
          maternityPayRejection: { id: id.toString() },
        });
    };
  }
}
