import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection-insured-quality-document/command/retirement-permanent-disability-rejection-insured-quality-document.command.repository.gateway';
import { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';

@Injectable()
export class RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity>
  implements
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
    )
    repository: Repository<RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createRetirementPermanentDisabilityRejectionInsuredQualityDocument(
    props: RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity,
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
    );
    return this.create(mappedData);
  }

  public deleteAllRetirementPermanentDisabilityRejectionInsuredQualityDocumentsByInsuredQualityId(
    insuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
        )
        .softDelete({
          retirementPermanentDisabilityRejectionInsuredQuality: {
            id: insuredQualityId.toString(),
          },
        });
    };
  }
}
