import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionFamiliarGroupTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-familiar-group.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-familiar-group/command/elderly-bpc-rejection-familiar-group.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionFamiliarGroupEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group/elderly-bpc-rejection-familiar-group.entity';

@Injectable()
export class ElderlyBpcRejectionFamiliarGroupTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionFamiliarGroupTypeormEntity>
  implements ElderlyBpcRejectionFamiliarGroupCommandRepositoryGateway
{
  protected readonly _type =
    ElderlyBpcRejectionFamiliarGroupTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionFamiliarGroupTypeormEntity)
    repository: Repository<ElderlyBpcRejectionFamiliarGroupTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejectionFamiliarGroup(
    props: ElderlyBpcRejectionFamiliarGroupEntity,
  ): TransactionType {
    const mappedData = ElderlyBpcRejectionFamiliarGroupTypeormEntity.build({
      id: props.id.toString(),
      fullName: props.fullName,
      birthDate: props.birthDate,
      kinship: props.kinship,
      livesInSameResidence: props.livesInSameResidence,
      hasIncome: props.hasIncome,
      monthlyIncome: props.monthlyIncome,
      incomeType: props.incomeType,
      hasSupportingDocuments: props.hasSupportingDocuments,
      elderlyBpcRejection: ElderlyBpcRejectionTypeormEntity.build({
        id: props.elderlyBpcRejectionId.toString(),
      } as ElderlyBpcRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as ElderlyBpcRejectionFamiliarGroupTypeormEntity);

    return this.create(mappedData);
  }

  public deleteElderlyBpcRejectionFamiliarGroupsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(ElderlyBpcRejectionFamiliarGroupTypeormEntity)
        .softDelete({
          elderlyBpcRejection: {
            id: elderlyBpcRejectionId.toString(),
          },
        });
    };
  }
}
