import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period-member.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis-period-member-document/command/rural-or-hybrid-retirement-analysis-period-member-document.command.repository.gateway';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/rural-or-hybrid-retirement-analysis-period-member-document.entity';
import { RuralOrHybridRetirementAnalysisPeriodMemberDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/value-object/rural-or-hybrid-retirement-analysis-period-member-document-id.value-object';

@Injectable()
export class RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity>
  implements
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity,
    )
    repository: Repository<RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementAnalysisPeriodMemberDocument(
    props: RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity,
  ): TransactionType {
    const mappedData =
      RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity.build({
        id: props.id.toString(),
        document: props.document,
        type: props.type,
        ruralOrHybridRetirementAnalysisPeriodMember:
          RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity.build({
            id: props.ruralOrHybridRetirementAnalysisPeriodMemberId.toString(),
          } as RuralOrHybridRetirementAnalysisPeriodMemberTypeormEntity),
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      } as RuralOrHybridRetirementAnalysisPeriodMemberDocumentTypeormEntity);

    return this.create(mappedData);
  }

  public deleteRuralOrHybridRetirementAnalysisPeriodMemberDocument(
    id: RuralOrHybridRetirementAnalysisPeriodMemberDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
