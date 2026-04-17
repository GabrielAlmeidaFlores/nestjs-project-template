import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayGrantInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/repository/maternity-pay-grant-inss-benefit/command/maternity-pay-grant-inss-benefit.command.repository.gateway';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';

@Injectable()
export class MaternityPayGrantInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayGrantInssBenefitTypeormEntity>
  implements MaternityPayGrantInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayGrantInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayGrantInssBenefitTypeormEntity)
    repository: Repository<MaternityPayGrantInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayGrantInssBenefit(
    props: MaternityPayGrantInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayGrantInssBenefitEntity,
      MaternityPayGrantInssBenefitTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllByMaternityPayGrantId(
    maternityPayGrantId: MaternityPayGrantId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayGrantInssBenefitTypeormEntity)
        .softDelete({
          maternityPayGrant: { id: maternityPayGrantId.toString() },
        });
    };
  }
}
