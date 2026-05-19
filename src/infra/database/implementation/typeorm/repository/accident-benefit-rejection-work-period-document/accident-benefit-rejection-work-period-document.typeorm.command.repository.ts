import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection-work-period-document/command/accident-benefit-rejection-work-period-document.command.repository.gateway';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';

@Injectable()
export class AccidentBenefitRejectionWorkPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity>
  implements AccidentBenefitRejectionWorkPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity)
    repository: Repository<AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createAccidentBenefitRejectionWorkPeriodDocument(
    props: AccidentBenefitRejectionWorkPeriodDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      AccidentBenefitRejectionWorkPeriodDocumentEntity,
      AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllAccidentBenefitRejectionWorkPeriodDocumentByAccidentBenefitRejectionWorkPeriodId(
    id: AccidentBenefitRejectionWorkPeriodId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity)
        .softDelete({
          accidentBenefitRejectionWorkPeriod: { id: id.toString() },
        });
    };
  }
}
