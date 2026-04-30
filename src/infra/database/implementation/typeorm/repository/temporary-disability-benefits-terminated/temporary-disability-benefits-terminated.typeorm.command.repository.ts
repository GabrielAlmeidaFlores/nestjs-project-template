import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-result.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/command/temporary-disability-benefits-terminated.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedTypeormEntity>
  implements TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsTerminatedTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsTerminatedTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminated(
    props: TemporaryDisabilityBenefitsTerminatedEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedEntity,
      TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryDisabilityBenefitsTerminated(
    id: TemporaryDisabilityBenefitsTerminatedId,
    props: TemporaryDisabilityBenefitsTerminatedEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedEntity,
      TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateTemporaryDisabilityBenefitsTerminatedResultId(
    id: TemporaryDisabilityBenefitsTerminatedId,
    resultId: TemporaryDisabilityBenefitsTerminatedResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      temporaryDisabilityBenefitsTerminatedResult:
        TemporaryDisabilityBenefitsTerminatedResultTypeormEntity.build({
          id: resultId.toString(),
        } as TemporaryDisabilityBenefitsTerminatedResultTypeormEntity),
    });
  }
}
