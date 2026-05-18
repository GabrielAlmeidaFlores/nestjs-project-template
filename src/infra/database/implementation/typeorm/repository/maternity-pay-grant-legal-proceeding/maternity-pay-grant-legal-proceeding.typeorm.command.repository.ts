import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-legal-proceeding.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-legal-proceeding/command/maternity-pay-grant-legal-proceeding.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';

@Injectable()
export class MaternityPayGrantLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantLegalProceedingTypeormEntity>
  implements MaternityPayGrantLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantLegalProceedingTypeormEntity)
    repository: Repository<MaternityPayGrantLegalProceedingTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantLegalProceeding(
    props: MaternityPayGrantLegalProceedingEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantLegalProceedingEntity,
      MaternityPayGrantLegalProceedingTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantLegalProceedingTypeormEntity)
        .softDelete({
          maternityPayGrant: { id: maternityPayGrantId.toString() },
        });
    };
  }
}
