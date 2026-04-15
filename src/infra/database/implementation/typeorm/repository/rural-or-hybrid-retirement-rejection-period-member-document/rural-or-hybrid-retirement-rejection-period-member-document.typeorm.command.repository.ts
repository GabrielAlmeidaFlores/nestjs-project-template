import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period-member.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection-period-member-document/command/rural-or-hybrid-retirement-rejection-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.entity';
import { RuralOrHybridRetirementRejectionPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/value-object/rural-or-hybrid-retirement-rejection-period-member-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity>
  implements RuralOrHybridRetirementRejectionPeriodMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejectionPeriodMemberDocument(
    props: RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementRejectionPeriodMember:
          RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity.build({
            id: props.ruralOrHybridRetirementRejectionPeriodMemberId.toString(),
          } as RuralOrHybridRetirementRejectionPeriodMemberTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementRejectionPeriodMemberDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementRejectionPeriodMemberDocument(
    id: RuralOrHybridRetirementRejectionPeriodMemberDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
