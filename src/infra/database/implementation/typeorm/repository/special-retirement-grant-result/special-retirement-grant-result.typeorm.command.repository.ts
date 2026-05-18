import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialRetirementGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/command/special-retirement-grant-result.command.repository.gateway';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';
import { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';

@Injectable()
export class SpecialRetirementGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialRetirementGrantResultTypeormEntity>
  implements SpecialRetirementGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementGrantResultTypeormEntity)
    repository: Repository<SpecialRetirementGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public updateSpecialRetirementGrantResult(
    id: SpecialRetirementGrantResultId,
    props: SpecialRetirementGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantResultEntity,
      SpecialRetirementGrantResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createSpecialRetirementGrantResult(
    props: SpecialRetirementGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialRetirementGrantResultEntity,
      SpecialRetirementGrantResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
