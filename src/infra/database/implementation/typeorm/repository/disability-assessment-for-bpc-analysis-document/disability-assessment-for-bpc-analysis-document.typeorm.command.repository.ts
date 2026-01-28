import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis-document.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-document/command/disability-assessment-for-bpc-analysis-document.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/value-object/disability-assessment-for-bpc-analysis-document-id/disability-assessment-for-bpc-analysis-document-id.value-object';

@Injectable()
export class DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity>
  implements DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    DisabilityAssessmentForBpcAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity)
    repository: Repository<DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createDisabilityAssessmentForBpcAnalysisDocument(
    props: DisabilityAssessmentForBpcAnalysisDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      DisabilityAssessmentForBpcAnalysisDocumentEntity,
      DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteDisabilityAssessmentForBpcAnalysisDocument(
    id: DisabilityAssessmentForBpcAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
