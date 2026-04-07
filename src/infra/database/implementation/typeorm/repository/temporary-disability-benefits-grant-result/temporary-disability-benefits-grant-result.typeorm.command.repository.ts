import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant-result/command/temporary-disability-benefits-grant-result.command.repository.gateway';
import { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';

@Injectable()
export class TemporaryDisabilityBenefitsGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsGrantResultTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantResultTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsGrantResult(
    props: TemporaryDisabilityBenefitsGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantResultEntity,
      TemporaryDisabilityBenefitsGrantResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateTemporaryDisabilityBenefitsGrantResult(
    props: TemporaryDisabilityBenefitsGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsGrantResultEntity,
      TemporaryDisabilityBenefitsGrantResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
