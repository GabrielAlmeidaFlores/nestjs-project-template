import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-work-period-document/command/maternity-pay-rejection-work-period-document.command.repository.gateway';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';

@Injectable()
export class MaternityPayRejectionWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionWorkPeriodDocumentTypeormEntity>
  implements MaternityPayRejectionWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionWorkPeriodDocumentTypeormEntity)
    repository: Repository<MaternityPayRejectionWorkPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionWorkPeriodDocument(
    props: MaternityPayRejectionWorkPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionWorkPeriodDocumentEntity,
      MaternityPayRejectionWorkPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllMaternityPayRejectionWorkPeriodDocumentByMaternityPayRejectionWorkPeriodId(
    id: MaternityPayRejectionWorkPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayRejectionWorkPeriodDocumentTypeormEntity)
        .softDelete({
          maternityPayRejectionWorkPeriod: { id: id.toString() },
        });
    };
  }
}
