import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification-document/command/survivor-pension-analysis-benefit-originator-identification-document.command.repository.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/survivor-pension-analysis-benefit-originator-identification-document.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity>
  implements
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisBenefitOriginatorIdentificationDocument(
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSurvivorPensionAnalysisBenefitOriginatorIdentificationDocument(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisBenefitOriginatorIdentificationId(
    survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentTypeormEntity,
        )
        .softDelete({
          benefitOriginatorIdentification: {
            id: survivorPensionAnalysisBenefitOriginatorIdentificationId.toString(),
          },
        });
    };
  }
}
