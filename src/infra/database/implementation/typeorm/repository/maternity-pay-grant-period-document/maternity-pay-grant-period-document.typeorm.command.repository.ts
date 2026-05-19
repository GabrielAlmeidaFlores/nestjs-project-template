import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-period-document/command/maternity-pay-grant-period-document.command.repository.gateway';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { MaternityPayGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity';

@Injectable()
export class MaternityPayGrantPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantPeriodDocumentTypeormEntity>
  implements MaternityPayGrantPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantPeriodDocumentTypeormEntity)
    repository: Repository<MaternityPayGrantPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantPeriodDocument(
    props: MaternityPayGrantPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantPeriodDocumentEntity,
      MaternityPayGrantPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByMaternityPayGrantPeriodId(
    maternityPayGrantPeriodId: MaternityPayGrantPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantPeriodDocumentTypeormEntity)
        .softDelete({
          maternityPayGrantPeriod: {
            id: maternityPayGrantPeriodId.toString(),
          },
        });
    };
  }
}
