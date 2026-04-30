import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/command/temporary-incapacity-benefit-termination.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/temporary-incapacity-benefit-termination.entity';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationTypeormEntity>
  implements TemporaryIncapacityBenefitTerminationCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryIncapacityBenefitTerminationTypeormEntity)
    repository: Repository<TemporaryIncapacityBenefitTerminationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTermination(
    props: TemporaryIncapacityBenefitTerminationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationEntity,
      TemporaryIncapacityBenefitTerminationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryIncapacityBenefitTermination(
    id: TemporaryIncapacityBenefitTerminationId,
    props: TemporaryIncapacityBenefitTerminationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationEntity,
      TemporaryIncapacityBenefitTerminationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateTemporaryIncapacityBenefitTerminationResultId(
    id: TemporaryIncapacityBenefitTerminationId,
    resultId: TemporaryIncapacityBenefitTerminationResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      temporaryIncapacityBenefitTerminationResult:
        TemporaryIncapacityBenefitTerminationResultTypeormEntity.build({
          id: resultId.toString(),
        } as TemporaryIncapacityBenefitTerminationResultTypeormEntity),
    });
  }
}
