import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-insured-status-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-insured-status-document/command/temporary-incapacity-benefit-termination-insured-status-document.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/temporary-incapacity-benefit-termination-insured-status-document.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationInsuredStatusDocument(
    props: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity,
      TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitTerminationInsuredStatusId(
    temporaryIncapacityBenefitTerminationInsuredStatusId: TemporaryIncapacityBenefitTerminationInsuredStatusId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitTerminationInsuredStatusDocumentTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitTerminationInsuredStatus: {
            id: temporaryIncapacityBenefitTerminationInsuredStatusId.toString(),
          },
        });
    };
  }
}
