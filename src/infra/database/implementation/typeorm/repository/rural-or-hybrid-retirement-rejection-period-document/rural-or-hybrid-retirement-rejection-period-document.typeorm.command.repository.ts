import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-document/command/rural-or-hybrid-retirement-rejection-period-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/rural-or-hybrid-retirement-rejection-period-document.entity';
import { RuralOrHybridRetirementRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/value-object/rural-or-hybrid-retirement-rejection-period-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity>
  implements
    RuralOrHybridRetirementRejectionPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionPeriodDocument(
    props: RuralOrHybridRetirementRejectionPeriodDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementRejectionPeriod:
          RuralOrHybridRetirementRejectionPeriodTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionPeriodId.toString(),
          } as RuralOrHybridRetirementRejectionPeriodTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionPeriodDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionPeriodDocument(
    id: RuralOrHybridRetirementRejectionPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
