import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated-previous-benefit-document/command/temporary-disability-benefits-terminated-previous-benefit-document.command.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/temporary-disability-benefits-terminated-previous-benefit-document.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document/value-object/temporary-disability-benefits-terminated-previous-benefit-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity>
  implements
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentCommandRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
    )
    repository: Repository<TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocument(
    props: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteTemporaryDisabilityBenefitsTerminatedPreviousBenefitDocument(
    id: TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
        )
        .softDelete(id.toString());
    };
  }
}
