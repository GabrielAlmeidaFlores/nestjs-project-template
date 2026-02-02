import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { SpecialActivityResultId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/value-object/special-activity-result-id.value-object';
import { SpecialActivityAnalysisResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/command/special-activity-analysis-result.command.repository.gateway';

@Injectable()
export class SpecialActivityResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<SpecialActivityResultTypeormEntity>
  implements SpecialActivityAnalysisResultCommandRepositoryGateway
{
  protected readonly _type = SpecialActivityResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(SpecialActivityResultTypeormEntity)
    repository: Repository<SpecialActivityResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }
  public updateSpecialActivityResult(
    id: SpecialActivityResultId,
    props: SpecialActivityResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityResultEntity,
      SpecialActivityResultTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public createSpecialActivityResult(
    props: SpecialActivityResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SpecialActivityResultEntity,
      SpecialActivityResultTypeormEntity,
    );

    return this.create(mappedData);
  }
}
