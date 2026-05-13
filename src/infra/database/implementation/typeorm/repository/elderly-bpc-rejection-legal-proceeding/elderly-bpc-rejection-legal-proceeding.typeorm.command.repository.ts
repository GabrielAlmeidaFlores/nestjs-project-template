import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-legal-proceeding.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-legal-proceeding/command/elderly-bpc-rejection-legal-proceeding.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-legal-proceeding/elderly-bpc-rejection-legal-proceeding.entity';

@Injectable()
export class ElderlyBpcRejectionLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionLegalProceedingTypeormEntity>
  implements ElderlyBpcRejectionLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    ElderlyBpcRejectionLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionLegalProceedingTypeormEntity)
    repository: Repository<ElderlyBpcRejectionLegalProceedingTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejectionLegalProceeding(
    props: ElderlyBpcRejectionLegalProceedingEntity,
  ): TransactionType {
    const mappedData = ElderlyBpcRejectionLegalProceedingTypeormEntity.build({
      id: props.id.toString(),
      legalProceedingNumber: props.legalProceedingNumber,
      elderlyBpcRejection: ElderlyBpcRejectionTypeormEntity.build({
        id: props.elderlyBpcRejectionId.toString(),
      } as ElderlyBpcRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as ElderlyBpcRejectionLegalProceedingTypeormEntity);

    return this.create(mappedData);
  }

  public deleteElderlyBpcRejectionLegalProceedingsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(ElderlyBpcRejectionLegalProceedingTypeormEntity)
        .softDelete({
          elderlyBpcRejection: {
            id: elderlyBpcRejectionId.toString(),
          },
        });
    };
  }
}
