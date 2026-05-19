import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-result.typeorm.entity';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialRetirementRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/command/special-retirement-rejection.command.repository.gateway';
import { SpecialRetirementRejectionEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/special-retirement-rejection.entity';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

@Injectable()
export class SpecialRetirementRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementRejectionTypeormEntity>
  implements SpecialRetirementRejectionCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionTypeormEntity)
    repository: Repository<SpecialRetirementRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSpecialRetirementRejection(
    props: SpecialRetirementRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementRejectionEntity,
      SpecialRetirementRejectionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSpecialRetirementRejection(
    id: SpecialRetirementRejectionId,
    props: SpecialRetirementRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementRejectionEntity,
      SpecialRetirementRejectionTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateSpecialRetirementRejectionResultId(
    id: SpecialRetirementRejectionId,
    resultId: SpecialRetirementRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      specialRetirementRejectionResult: Object.assign(
        new SpecialRetirementRejectionResultTypeormEntity(),
        {
          id: resultId.toString(),
        },
      ),
    });
  }
}
