import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { ElderlyBpcRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-inss-benefit.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/repository/elderly-bpc-rejection-inss-benefit/command/elderly-bpc-rejection-inss-benefit.command.repository.gateway';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-inss-benefit/elderly-bpc-rejection-inss-benefit.entity';

@Injectable()
export class ElderlyBpcRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<ElderlyBpcRejectionInssBenefitTypeormEntity>
  implements ElderlyBpcRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    ElderlyBpcRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(ElderlyBpcRejectionInssBenefitTypeormEntity)
    repository: Repository<ElderlyBpcRejectionInssBenefitTypeormEntity>,
  ) {
    super(repository);
  }

  public createElderlyBpcRejectionInssBenefit(
    props: ElderlyBpcRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = ElderlyBpcRejectionInssBenefitTypeormEntity.build({
      id: props.id.toString(),
      inssBenefit: props.inssBenefit,
      elderlyBpcRejection: ElderlyBpcRejectionTypeormEntity.build({
        id: props.elderlyBpcRejectionId.toString(),
      } as ElderlyBpcRejectionTypeormEntity),
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as ElderlyBpcRejectionInssBenefitTypeormEntity);

    return this.create(mappedData);
  }

  public deleteElderlyBpcRejectionInssBenefitsByElderlyBpcRejectionId(
    elderlyBpcRejectionId: ElderlyBpcRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(ElderlyBpcRejectionInssBenefitTypeormEntity)
        .softDelete({
          elderlyBpcRejection: {
            id: elderlyBpcRejectionId.toString(),
          },
        });
    };
  }
}
