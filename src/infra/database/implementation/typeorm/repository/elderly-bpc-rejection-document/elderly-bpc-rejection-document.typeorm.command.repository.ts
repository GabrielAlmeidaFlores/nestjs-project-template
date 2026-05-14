import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-document.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-document/command/elderly-bpc-rejection-document.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/elderly-bpc-rejection-document.entity';

@Injectable()
export class ElderlyBpcRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionDocumentTypeormEntity>
  implements ElderlyBpcRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    ElderlyBpcRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionDocumentTypeormEntity)
    repository: Repository<ElderlyBpcRejectionDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejectionDocument(
    props: ElderlyBpcRejectionDocumentEntity,
  ): TransactionType {
    const mappedData = ElderlyBpcRejectionDocumentTypeormEntity.build({
      id: props.id.toString(),
      document: props.document,
      type: props.type,
      elderlyBpcRejection: ElderlyBpcRejectionTypeormEntity.build({
        id: props.elderlyBpcRejectionId.toString(),
      } as ElderlyBpcRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as ElderlyBpcRejectionDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteElderlyBpcRejectionDocumentsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(ElderlyBpcRejectionDocumentTypeormEntity)
        .softDelete({
          elderlyBpcRejection: {
            id: elderlyBpcRejectionId.toString(),
          },
        });
    };
  }
}
