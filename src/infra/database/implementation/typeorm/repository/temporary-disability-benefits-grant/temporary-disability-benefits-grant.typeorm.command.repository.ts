import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/command/temporary-disability-benefits-grant.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/temporary-disability-benefits-grant.entity';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrant(
    props: TemporaryDisabilityBenefitsGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantEntity,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryDisabilityBenefitsGrant(
    id: TemporaryDisabilityBenefitsGrantId,
    props: TemporaryDisabilityBenefitsGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantEntity,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateTemporaryDisabilityBenefitsGrantResultId(
    id: TemporaryDisabilityBenefitsGrantId,
    resultId: TemporaryDisabilityBenefitsGrantResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      temporaryDisabilityBenefitsGrantResult:
        TemporaryDisabilityBenefitsGrantResultTypeormEntity.build({
          id: resultId.toString(),
        } as TemporaryDisabilityBenefitsGrantResultTypeormEntity),
    });
  }
}
