import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-analysis-period-special-time.typeorm.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period-special-time/command/general-urban-retirement-analysis-period-special-time.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.entity';
import { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';

@Injectable()
export class GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormCommandRepository
  extends BaseTypeormCommandRepository<GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity>
  implements
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway
{
  protected readonly _type =
    GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity,
    )
    repository: Repository<GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity>,
  ) {
    super(repository);
  }

  public createGeneralUrbanRetirementAnalysisPeriodSpecialTime(
    props: GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity,
  ): TransactionType {
    return this.create({
      id: props.id.toString(),
      type: props.type,
      startDate: props.startDate,
      endDate: props.endDate,
      lawyerObservations: props.lawyerObservations,
      generalUrbanRetirementAnalysisPeriod: {
        id: props.generalUrbanRetirementAnalysisPeriod?.id.toString(),
      } as GeneralUrbanRetirementAnalysisPeriodSpecialTimeTypeormEntity['generalUrbanRetirementAnalysisPeriod'],
    });
  }

  public deleteGeneralUrbanRetirementAnalysisPeriodSpecialTime(
    id: GeneralUrbanRetirementAnalysisPeriodSpecialTimeId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
