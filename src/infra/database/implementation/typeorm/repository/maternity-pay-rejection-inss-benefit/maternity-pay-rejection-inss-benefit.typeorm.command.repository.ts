import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { MaternityPayRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-inss-benefit.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { MaternityPayRejectionInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/repository/maternity-pay-rejection-inss-benefit/command/maternity-pay-rejection-inss-benefit.command.repository.gateway';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity';

@Injectable()
export class MaternityPayRejectionInssBenefitTypeormCommandRepository
  extends BaseTypeormCommandRepository<MaternityPayRejectionInssBenefitTypeormEntity>
  implements MaternityPayRejectionInssBenefitCommandRepositoryGateway
{
  protected readonly _type =
    MaternityPayRejectionInssBenefitTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(MaternityPayRejectionInssBenefitTypeormEntity)
    repository: Repository<MaternityPayRejectionInssBenefitTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createMaternityPayRejectionInssBenefit(
    props: MaternityPayRejectionInssBenefitEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      MaternityPayRejectionInssBenefitEntity,
      MaternityPayRejectionInssBenefitTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllMaternityPayRejectionInssBenefitByMaternityPayRejectionId(
    id: MaternityPayRejectionId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(MaternityPayRejectionInssBenefitTypeormEntity)
        .softDelete({
          maternityPayRejection: { id: id.toString() },
        });
    };
  }
}
