import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RuralOrHybridRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-result.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { RuralOrHybridRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/command/rural-or-hybrid-retirement-rejection.command.repository.gateway';
import { RuralOrHybridRetirementRejectionEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/rural-or-hybrid-retirement-rejection.entity';
import { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';

@Injectable()
export class RuralOrHybridRetirementRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<RuralOrHybridRetirementRejectionTypeormEntity>
  implements RuralOrHybridRetirementRejectionCommandRepositoryGateway
{
  protected readonly _type =
    RuralOrHybridRetirementRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(RuralOrHybridRetirementRejectionTypeormEntity)
    repository: Repository<RuralOrHybridRetirementRejectionTypeormEntity>,
  ) {
    super(repository);
  }

  public createRuralOrHybridRetirementRejection(
    props: RuralOrHybridRetirementRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.create(mappedData);
  }

  public updateRuralOrHybridRetirementRejection(
    id: RuralOrHybridRetirementRejectionId,
    props: RuralOrHybridRetirementRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapToTypeormEntity(props);

    return this.update(id.toString(), mappedData);
  }

  public updateRuralOrHybridRetirementRejectionResultId(
    id: RuralOrHybridRetirementRejectionId,
    resultId: RuralOrHybridRetirementRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      ruralOrHybridRetirementRejectionResult:
        RuralOrHybridRetirementRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as RuralOrHybridRetirementRejectionResultTypeormEntity),
    });
  }

  private mapToTypeormEntity(
    props: RuralOrHybridRetirementRejectionEntity,
  ): RuralOrHybridRetirementRejectionTypeormEntity {
    return RuralOrHybridRetirementRejectionTypeormEntity.build({
      id: props.id.toString(),
      analysisName: props.analysisName,
      activityType: props.activityType,
      applicationSubmissionDate: props.applicationSubmissionDate,
      requestedBenefit: props.requestedBenefit,
      dateOfRejection: props.dateOfRejection,
      ruralOrHybridRetirementRejectionResult:
        props.ruralOrHybridRetirementRejectionResultId !== null
          ? RuralOrHybridRetirementRejectionResultTypeormEntity.build({
              id: props.ruralOrHybridRetirementRejectionResultId.toString(),
            } as RuralOrHybridRetirementRejectionResultTypeormEntity)
          : null,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    } as RuralOrHybridRetirementRejectionTypeormEntity);
  }
}
