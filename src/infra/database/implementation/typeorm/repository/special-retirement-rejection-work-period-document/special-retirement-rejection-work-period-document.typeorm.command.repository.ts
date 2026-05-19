import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period-document.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-work-period-document/command/special-retirement-rejection-work-period-document.command.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-document/special-retirement-rejection-work-period-document.entity';

@Injectable()
export class SpecialRetirementRejectionWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity>
  implements
    SpecialRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity)
    repository: Repository<SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionWorkPeriodDocument(
    props: SpecialRetirementRejectionWorkPeriodDocumentEntity,
  ): TransactionType {
    const specialRetirementRejectionWorkPeriod =
      props.specialRetirementRejectionWorkPeriodId !== null
        ? Object.assign(
            new SpecialRetirementRejectionWorkPeriodTypeormEntity(),
            {
              id: props.specialRetirementRejectionWorkPeriodId.toString(),
            },
          )
        : null;

    return this.create(
      SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity.build({
        id: props.id.toString(),
        fileName: props.fileName,
        type: props.type,
        specialRetirementRejectionWorkPeriod,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public deleteAllSpecialRetirementRejectionWorkPeriodDocumentBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      const workPeriods = await manager
        .getRepository(SpecialRetirementRejectionWorkPeriodTypeormEntity)
        .find({
          where: {
            specialRetirementRejection: {
              id: specialRetirementRejectionId.toString(),
            },
          },
        });

      if (workPeriods.length === 0) {
        return;
      }

      const workPeriodIds = workPeriods.map((workPeriod) => workPeriod.id);
      const documents = await manager
        .getRepository(
          SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity,
        )
        .find({
          where: {
            specialRetirementRejectionWorkPeriod: {
              id: In(workPeriodIds),
            },
          },
        });

      if (documents.length === 0) {
        return;
      }

      await manager
        .getRepository(
          SpecialRetirementRejectionWorkPeriodDocumentTypeormEntity,
        )
        .softDelete(documents.map((document) => document.id));
    };
  }
}
