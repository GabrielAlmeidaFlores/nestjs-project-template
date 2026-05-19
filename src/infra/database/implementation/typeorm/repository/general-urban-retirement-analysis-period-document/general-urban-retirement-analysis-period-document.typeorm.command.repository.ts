import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-document.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-document/command/general-urban-retirement-analysis-period-document.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/general-urban-retirement-analysis-period-document.entity';
import { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisPeriodDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity>
  implements
    GeneralUrbanRetirementAnalysisPeriodDocumentCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity)
    repository: Repository<GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity>,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementAnalysisPeriodDocument(
    props: GeneralUrbanRetirementAnalysisPeriodDocumentEntity,
  ): TransactionType {
    const payload: Partial<GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity> =
      {
        id: props.id.toString(),
        document: props.document,
        documentType: props.documentType,
      };
    if (props.generalUrbanRetirementAnalysisPeriodSpecialTime !== null) {
      payload.generalUrbanRetirementAnalysisPeriodSpecialTime = {
        id: props.generalUrbanRetirementAnalysisPeriodSpecialTime.id.toString(),
      } as GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity['generalUrbanRetirementAnalysisPeriodSpecialTime'];
    }
    if (props.generalUrbanRetirementAnalysisPeriodDisability !== null) {
      payload.generalUrbanRetirementAnalysisPeriodDisability = {
        id: props.generalUrbanRetirementAnalysisPeriodDisability.id.toString(),
      } as GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity['generalUrbanRetirementAnalysisPeriodDisability'];
    }
    if (props.generalUrbanRetirementAnalysis !== null) {
      payload.generalUrbanRetirementAnalysis = {
        id: props.generalUrbanRetirementAnalysis.id.toString(),
      } as GeneralUrbanRetirementAnalysisPeriodDocumentTypeormEntity['generalUrbanRetirementAnalysis'];
    }
    return this.create(payload);
  }

  public deleteGeneralUrbanRetirementAnalysisPeriodDocument(
    id: GeneralUrbanRetirementAnalysisPeriodDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
