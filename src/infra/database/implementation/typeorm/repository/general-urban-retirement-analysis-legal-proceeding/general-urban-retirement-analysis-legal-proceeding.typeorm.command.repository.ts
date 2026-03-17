import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/command/general-urban-retirement-analysis-legal-proceeding.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/general-urban-retirement-analysis-legal-proceeding.entity';
import { GeneralUrbanRetirementAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/value-object/general-urban-retirement-analysis-legal-proceeding-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisLegalProceedingTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity>
  implements GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisLegalProceedingTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity,
    )
    repository: Repository<GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity>,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementAnalysisLegalProceeding(
    props: GeneralUrbanRetirementAnalysisLegalProceedingEntity,
  ): TransactionType {
    return this.create({
      legalProceeding: props.legalProceeding,
      generalUrbanRetirementAnalysis: {
        id: props.generalUrbanRetirementAnalysis.id.toString(),
      } as GeneralUrbanRetirementAnalysisLegalProceedingTypeormEntity['generalUrbanRetirementAnalysis'],
    });
  }

  public deleteGeneralUrbanRetirementAnalysisLegalProceeding(
    id: GeneralUrbanRetirementAnalysisLegalProceedingId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
