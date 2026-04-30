import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryIncapacityBenefitTerminationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination-document/command/temporary-incapacity-benefit-termination-document.command.repository.gateway';
import { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import { TemporaryIncapacityBenefitTerminationDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-document/temporary-incapacity-benefit-termination-document.entity';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryIncapacityBenefitTerminationDocumentTypeormEntity>
  implements
    TemporaryIncapacityBenefitTerminationDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
    )
    repository: Repository<TemporaryIncapacityBenefitTerminationDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryIncapacityBenefitTerminationDocument(
    props: TemporaryIncapacityBenefitTerminationDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryIncapacityBenefitTerminationDocumentEntity,
      TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByTemporaryIncapacityBenefitTerminationId(
    temporaryIncapacityBenefitTerminationId: TemporaryIncapacityBenefitTerminationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryIncapacityBenefitTerminationDocumentTypeormEntity,
        )
        .softDelete({
          temporaryIncapacityBenefitTermination: {
            id: temporaryIncapacityBenefitTerminationId.toString(),
          },
        });
    };
  }
}
