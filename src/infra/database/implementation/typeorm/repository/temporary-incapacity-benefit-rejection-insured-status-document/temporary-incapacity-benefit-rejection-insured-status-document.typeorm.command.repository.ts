import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection-insured-status-document/command/temporary-incapacity-benefit-rejection-insured-status-document.command.repository.gateway';
import { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document.entity';

@Injectable()
export class TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity>
  implements
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitRejectionInsuredStatusDocument(
    props: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity,
      TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitRejectionInsuredStatusId(
    temporaryIncapacityBenefitRejectionInsuredStatusId: TemporaryIncapacityBenefitRejectionInsuredStatusId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitRejectionInsuredStatusDocumentTypeormEntity,
        )
        .softDelete({
          insuredStatus: {
            id: temporaryIncapacityBenefitRejectionInsuredStatusId.toString(),
          },
        });
    };
  }
}
