import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/command/general-urban-retirement-analysis-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/general-urban-retirement-analysis-document.entity';
import { GeneralUrbanRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/value-object/general-urban-retirement-analysis-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisDocumentTypeormEntity>
  implements GeneralUrbanRetirementAnalysisDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementAnalysisDocument(
    props: GeneralUrbanRetirementAnalysisDocumentEntity,
  ): TransactionType {
    return this.create({
      type: props.type,
      document: props.document,
      generalUrbanRetirementAnalysis: {
        id: props.generalUrbanRetirementAnalysisId.toString(),
      } as GeneralUrbanRetirementAnalysisDocumentTypeormEntity['generalUrbanRetirementAnalysis'],
    });
  }

  public deleteGeneralUrbanRetirementAnalysisDocument(
    id: GeneralUrbanRetirementAnalysisDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
