import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant/command/maternity-pay-grant.command.repository.gateway';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';

@Injectable()
export class MaternityPayGrantTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantTypeormEntity>
  implements MaternityPayGrantCommandRepositoryGateway
{
  protected readonly _type = MaternityPayGrantTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantTypeormEntity)
    repository: Repository<MaternityPayGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrant(
    props: MaternityPayGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantEntity,
      MaternityPayGrantTypeormEntity,
    );
    return this.create(mappedData);
  }

  public updateMaternityPayGrant(
    id: MaternityPayGrantId,
    props: MaternityPayGrantEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantEntity,
      MaternityPayGrantTypeormEntity,
    );
    return this.update(id.toString(), mappedData);
  }

  public updateMaternityPayGrantResultId(
    id: MaternityPayGrantId,
    resultId: MaternityPayGrantResultId,
  ): TransactionType {
    return this.update(id.toString(), {
      maternityPayGrantResult: MaternityPayGrantResultTypeormEntity.build({
        id: resultId.toString(),
      } as MaternityPayGrantResultTypeormEntity),
    });
  }
}
