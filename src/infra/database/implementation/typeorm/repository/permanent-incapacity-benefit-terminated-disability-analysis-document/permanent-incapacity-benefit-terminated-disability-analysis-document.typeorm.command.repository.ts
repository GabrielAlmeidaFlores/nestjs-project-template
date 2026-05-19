import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated-disability-analysis-document/command/permanent-incapacity-benefit-terminated-disability-analysis-document.command.repository.gateway';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document/permanent-incapacity-benefit-terminated-disability-analysis-document.entity';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity>
  implements
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
    )
    repository: Repository<PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createPermanentIncapacityBenefitTerminatedDisabilityAnalysisDocument(
    props: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteAllByPermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
    permanentIncapacityBenefitTerminatedDisabilityAnalysisId: PermanentIncapacityBenefitTerminatedDisabilityAnalysisId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;

      await manager
        .getRepository(
          PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
        )
        .softDelete({
          permanentIncapacityBenefitTerminatedDisabilityAnalysis: {
            id: permanentIncapacityBenefitTerminatedDisabilityAnalysisId.toString(),
          },
        });
    };
  }
}
