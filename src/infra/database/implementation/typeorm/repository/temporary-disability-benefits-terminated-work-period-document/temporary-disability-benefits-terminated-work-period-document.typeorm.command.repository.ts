import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-work-period-document/command/temporary-disability-benefits-terminated-work-period-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedWorkPeriodDocument(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllTemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentByTemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
        )
        .softDelete({
          temporaryDisabilityBenefitsTerminatedWorkPeriods: {
            id: id.toString(),
          },
        });
    };
  }
}
