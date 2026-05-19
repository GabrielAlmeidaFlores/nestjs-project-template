import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-insured-status-document/command/permanent-incapacity-benefit-terminated-insured-status-document.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/permanent-incapacity-benefit-terminated-insured-status-document.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedInsuredStatusDocument(
    props: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity,
      PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPermanentIncapacityBenefitTerminatedInsuredStatusId(
    permanentIncapacityBenefitTerminatedInsuredStatusId: PermanentIncapacityBenefitTerminatedInsuredStatusId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          PermanentIncapacityBenefitTerminatedInsuredStatusDocumentTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminatedInsuredStatus: {
            id: permanentIncapacityBenefitTerminatedInsuredStatusId.toString(),
          },
        });
    };
  }
}
