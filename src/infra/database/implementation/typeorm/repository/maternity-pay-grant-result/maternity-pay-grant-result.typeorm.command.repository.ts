import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-result/command/maternity-pay-grant-result.command.repository.gateway';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';

@Injectable()
export class MaternityPayGrantResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantResultTypeormEntity>
  implements MaternityPayGrantResultCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantResultTypeormEntity)
    repository: Repository<MaternityPayGrantResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantResult(
    props: MaternityPayGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantResultEntity,
      MaternityPayGrantResultTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateMaternityPayGrantResult(
    props: MaternityPayGrantResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantResultEntity,
      MaternityPayGrantResultTypeormEntity,
    );
    return this.update(props.id.toString(), mappedData);
  }
}
