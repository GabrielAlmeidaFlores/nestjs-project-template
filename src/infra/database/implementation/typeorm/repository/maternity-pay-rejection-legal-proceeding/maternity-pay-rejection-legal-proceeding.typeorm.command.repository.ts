import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-legal-proceeding/command/maternity-pay-rejection-legal-proceeding.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity';

@Injectable()
export class MaternityPayRejectionLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionLegalProceedingTypeormEntity>
  implements MaternityPayRejectionLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionLegalProceedingTypeormEntity)
    repository: Repository<MaternityPayRejectionLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionLegalProceeding(
    props: MaternityPayRejectionLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionLegalProceedingEntity,
      MaternityPayRejectionLegalProceedingTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllMaternityPayRejectionLegalProceedingByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayRejectionLegalProceedingTypeormEntity)
        .softDelete({
          maternityPayRejection: { id: id.toString() },
        });
    };
  }
}
