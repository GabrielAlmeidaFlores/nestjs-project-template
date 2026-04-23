import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-work-period-document/command/rural-or-hybrid-retirement-rejection-work-period-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/rural-or-hybrid-retirement-rejection-work-period-document.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/value-object/rural-or-hybrid-retirement-rejection-work-period-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity>
  implements
    RuralOrHybridRetirementRejectionWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionWorkPeriodDocument(
    props: RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementRejectionWorkPeriod:
          RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionWorkPeriodId.toString(),
          } as RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionWorkPeriodDocument(
    id: RuralOrHybridRetirementRejectionWorkPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
