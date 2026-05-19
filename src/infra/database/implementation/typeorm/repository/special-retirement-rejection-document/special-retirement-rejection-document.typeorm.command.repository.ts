import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-document.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { SpecialRetirementRejectionDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-document/command/special-retirement-rejection-document.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-document/special-retirement-rejection-document.entity';

@Injectable()
export class SpecialRetirementRejectionDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionDocumentTypeormEntity>
  implements SpecialRetirementRejectionDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionDocumentTypeormEntity)
    repository: Repository<SpecialRetirementRejectionDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionDocument(
    props: SpecialRetirementRejectionDocumentEntity,
  ): TransactionType {
    const specialRetirementRejection =
      props.specialRetirementRejectionId !== null
        ? Object.assign(new SpecialRetirementRejectionTypeormEntity(), {
            id: props.specialRetirementRejectionId.toString(),
          })
        : null;

    return this.create(
      SpecialRetirementRejectionDocumentTypeormEntity.build({
        id: props.id.toString(),
        fileName: props.fileName,
        type: props.type,
        specialRetirementRejection,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionDocumentBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(SpecialRetirementRejectionDocumentTypeormEntity)
        .softDelete({
          specialRetirementRejection: {
            id: specialRetirementRejectionId.toString(),
          },
        });
    };
  }
}
