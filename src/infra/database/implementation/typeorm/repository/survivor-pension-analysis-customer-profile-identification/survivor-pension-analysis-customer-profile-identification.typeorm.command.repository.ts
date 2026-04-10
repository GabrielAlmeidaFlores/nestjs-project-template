import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/command/survivor-pension-analysis-customer-profile-identification.command.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisCustomerProfileIdentificationTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity>
  implements
    SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisCustomerProfileIdentification(
    props: SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateSurvivorPensionAnalysisCustomerProfileIdentification(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
    props: SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }

  public deleteSurvivorPensionAnalysisCustomerProfileIdentification(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): TransactionType {
    return this.delete(id.toString());
  }
}
