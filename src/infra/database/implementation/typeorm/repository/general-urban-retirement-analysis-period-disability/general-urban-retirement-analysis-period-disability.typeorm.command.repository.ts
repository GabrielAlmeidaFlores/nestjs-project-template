import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-disability.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-disability/command/general-urban-retirement-analysis-period-disability.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.entity';
import { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity>
  implements
    GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity,
    )
    repository: Repository<GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity>,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementAnalysisPeriodDisability(
    props: GeneralUrbanRetirementAnalysisPeriodDisabilityEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      type: props.type,
      degree: props.degree,
      startDate: props.startDate,
      endDate: props.endDate,
      category: props.category,
      description: props.description,
      dailyImpact: props.dailyImpact,
      lawyerObservations: props.lawyerObservations,
      cid: {
        id: props.cidTen.id.toString(),
      } as GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity['cid'],
      generalUrbanRetirementAnalysisPeriod: {
        id: props.generalUrbanRetirementAnalysisPeriod.id.toString(),
      } as GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity['generalUrbanRetirementAnalysisPeriod'],
    });
  }

  public deleteGeneralUrbanRetirementAnalysisPeriodDisability(
    id: GeneralUrbanRetirementAnalysisPeriodDisabilityId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public updateLawyerObservations(
    id: GeneralUrbanRetirementAnalysisPeriodDisabilityId,
    lawyerObservations: string | null,
  ): TransactionType {
    return this.update(id.toString(), { lawyerObservations } as Pick<
      GeneralUrbanRetirementAnalysisPeriodDisabilityTypeormEntity,
      'lawyerObservations'
    >);
  }
}
