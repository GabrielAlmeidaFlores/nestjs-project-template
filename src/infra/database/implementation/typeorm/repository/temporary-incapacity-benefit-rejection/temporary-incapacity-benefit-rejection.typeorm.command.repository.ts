import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/command/temporary-incapacity-benefit-rejection.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/temporary-incapacity-benefit-rejection.entity';
import { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionTypeormEntity>
  implements TemporaryIncapacityBenefitRejectionCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryIncapacityBenefitRejectionTypeormEntity)
    repository: Repository<TemporaryIncapacityBenefitRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejection(
    props: TemporaryIncapacityBenefitRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionEntity,
      TemporaryIncapacityBenefitRejectionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryIncapacityBenefitRejection(
    id: TemporaryIncapacityBenefitRejectionId,
    props: TemporaryIncapacityBenefitRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionEntity,
      TemporaryIncapacityBenefitRejectionTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateTemporaryIncapacityBenefitRejectionResultId(
    id: TemporaryIncapacityBenefitRejectionId,
    resultId: TemporaryIncapacityBenefitRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      result: TemporaryIncapacityBenefitRejectionResultTypeormEntity.build({
        id: resultId.toString(),
      } as TemporaryIncapacityBenefitRejectionResultTypeormEntity),
    });
  }
}
