import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-legal-proceeding/command/rural-or-hybrid-retirement-rejection-legal-proceeding.command.repository.gateway';
import { RuralOrHybridRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.entity';
import { RuralOrHybridRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/value-object/rural-or-hybrid-retirement-rejection-legal-proceeding-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity>
  implements
    RuralOrHybridRetirementRejectionLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionLegalProceeding(
    props: RuralOrHybridRetirementRejectionLegalProceedingEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity.build({
        id: props.id.toString(),
        legalProceedingNumber: props.legalProceedingNumber,
        ruralOrHybridRetirementRejection:
          RuralOrHybridRetirementRejectionTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionId.toString(),
          } as RuralOrHybridRetirementRejectionTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionLegalProceeding(
    id: RuralOrHybridRetirementRejectionLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
