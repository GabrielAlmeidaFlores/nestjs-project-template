import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection/command/maternity-pay-rejection.command.repository.gateway';
import { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

@Injectable()
export class MaternityPayRejectionTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionTypeormEntity>
  implements MaternityPayRejectionCommandRepositoryGateway
{
  protected readonly _type = MaternityPayRejectionTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionTypeormEntity)
    repository: Repository<MaternityPayRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejection(
    props: MaternityPayRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionEntity,
      MaternityPayRejectionTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateMaternityPayRejection(
    id: MaternityPayRejectionId,
    props: MaternityPayRejectionEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionEntity,
      MaternityPayRejectionTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public updateMaternityPayRejectionResultId(
    id: MaternityPayRejectionId,
    resultId: MaternityPayRejectionResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      maternityPayRejectionResult:
        MaternityPayRejectionResultTypeormEntity.build({
          id: resultId.toString(),
        } as MaternityPayRejectionResultTypeormEntity),
    });
  }
}
