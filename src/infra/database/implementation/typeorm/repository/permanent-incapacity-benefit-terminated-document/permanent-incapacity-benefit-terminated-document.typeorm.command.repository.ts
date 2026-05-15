import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-document/command/permanent-incapacity-benefit-terminated-document.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/permanent-incapacity-benefit-terminated-document.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedDocumentTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(PermanentIncapacityBenefitTerminatedDocumentTypeormEntity)
    repository: Repository<PermanentIncapacityBenefitTerminatedDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedDocument(
    props: PermanentIncapacityBenefitTerminatedDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedDocumentEntity,
      PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          PermanentIncapacityBenefitTerminatedDocumentTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminated: {
            id: permanentIncapacityBenefitTerminatedId.toString(),
          },
        });
    };
  }
}
