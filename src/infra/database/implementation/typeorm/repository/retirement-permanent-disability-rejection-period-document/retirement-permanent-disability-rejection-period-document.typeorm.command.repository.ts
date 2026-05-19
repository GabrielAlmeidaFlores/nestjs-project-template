import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-period-document/command/retirement-permanent-disability-rejection-period-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';

@Injectable()
export class RetirementPermanentDisabilityRejectionPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionPeriodDocument(
    props: RetirementPermanentDisabilityRejectionPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionPeriodDocumentEntity,
      RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllRetirementPermanentDisabilityRejectionPeriodDocumentsByPeriodId(
    periodId: RetirementPermanentDisabilityRejectionPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejectionPeriod: {
            id: periodId.toString(),
          },
        });
    };
  }
}
