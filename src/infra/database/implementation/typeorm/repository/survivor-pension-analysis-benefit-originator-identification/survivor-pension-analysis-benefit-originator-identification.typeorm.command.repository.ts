import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-benefit-originator-identification.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/command/survivor-pension-analysis-benefit-originator-identification.command.repository.gateway';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/survivor-pension-analysis-benefit-originator-identification.entity';
import { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity>
  implements
    SurvivorPensionAnalysisBenefitOriginatorIdentificationCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisBenefitOriginatorIdentification(
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysisBenefitOriginatorIdentification(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
    props: SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationEntity,
      SurvivorPensionAnalysisBenefitOriginatorIdentificationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysisBenefitOriginatorIdentification(
    id: SurvivorPensionAnalysisBenefitOriginatorIdentificationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
