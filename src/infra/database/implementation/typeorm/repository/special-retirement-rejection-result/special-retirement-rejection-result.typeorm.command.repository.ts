import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-result.typeorm.entity';
import { SpecialRetirementRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection-result/command/special-retirement-rejection-result.command.repository.gateway';
import { SpecialRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/special-retirement-rejection-result.entity';

@Injectable()
export class SpecialRetirementRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionResultTypeormEntity>
  implements SpecialRetirementRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionResultTypeormEntity)
    repository: Repository<SpecialRetirementRejectionResultTypeormEntity>,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejectionResult(
    props: SpecialRetirementRejectionResultEntity,
  ): TransactionType {
    return this.create(
      SpecialRetirementRejectionResultTypeormEntity.build({
        id: props.id.toString(),
        firstAnalysis: props.firstAnalysis,
        completeAnalysis: props.completeAnalysis,
        simplifiedAnalysis: props.simplifiedAnalysis,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }

  public updateSpecialRetirementRejectionResult(
    props: SpecialRetirementRejectionResultEntity,
  ): TransactionType {
    return this.update(
      props.id.toString(),
      SpecialRetirementRejectionResultTypeormEntity.build({
        id: props.id.toString(),
        firstAnalysis: props.firstAnalysis,
        completeAnalysis: props.completeAnalysis,
        simplifiedAnalysis: props.simplifiedAnalysis,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }
}
