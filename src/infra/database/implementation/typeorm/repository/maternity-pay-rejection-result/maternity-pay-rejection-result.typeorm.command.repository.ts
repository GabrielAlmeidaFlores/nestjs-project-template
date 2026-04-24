import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-result/command/maternity-pay-rejection-result.command.repository.gateway';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';

@Injectable()
export class MaternityPayRejectionResultTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionResultTypeormEntity>
  implements MaternityPayRejectionResultCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionResultTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionResultTypeormEntity)
    repository: Repository<MaternityPayRejectionResultTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionResult(
    props: MaternityPayRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionResultEntity,
      MaternityPayRejectionResultTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMaternityPayRejectionResult(
    props: MaternityPayRejectionResultEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionResultEntity,
      MaternityPayRejectionResultTypeormEntity,
    );

    return this.update(props.id.toString(), mappedData);
  }
}
