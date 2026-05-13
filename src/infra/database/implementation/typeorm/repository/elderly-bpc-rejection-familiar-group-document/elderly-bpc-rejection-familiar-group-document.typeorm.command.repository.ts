import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-familiar-group-document.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-familiar-group.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-familiar-group-document/command/elderly-bpc-rejection-familiar-group-document.command.repository.gateway';
import { ElderlyBpcRejectionFamiliarGroupId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/value-object/elderly-bpc-rejection-familiar-group-id/elderly-bpc-rejection-familiar-group-id.value-object';
import { ElderlyBpcRejectionFamiliarGroupDocumentEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/elderly-bpc-rejection-familiar-group-document.entity';

@Injectable()
export class ElderlyBpcRejectionFamiliarGroupDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity>
  implements ElderlyBpcRejectionFamiliarGroupDocumentCommandRepositoryGateway
{
  protected readonly _type =
    ElderlyBpcRejectionFamiliarGroupDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity)
    repository: Repository<ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejectionFamiliarGroupDocument(
    props: ElderlyBpcRejectionFamiliarGroupDocumentEntity,
  ): TransactionType {
    const mappedData =
      ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        elderlyBpcRejectionFamiliarGroup:
          ElderlyBpcRejectionFamiliarGroupTypeormEntity.build({
            id: props.elderlyBpcRejectionFamiliarGroupId.toString(),
          } as ElderlyBpcRejectionFamiliarGroupTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteElderlyBpcRejectionFamiliarGroupDocumentsByFamiliarGroupId(
    familiarGroupId: ElderlyBpcRejectionFamiliarGroupId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity)
        .softDelete({
          elderlyBpcRejectionFamiliarGroup: {
            id: familiarGroupId.toString(),
          },
        });
    };
  }
}
