import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/result/get-survivor-pension-analysis-customer-profile-identification.query.result';
import { SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/survivor-pension-analysis-customer-profile-identification.query.repository.gateway';
import { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SurvivorPensionAnalysisCustomerProfileIdentificationTypeormQueryRepository
  extends BaseTypeormQueryRepository<SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity>
  implements
    SurvivorPensionAnalysisCustomerProfileIdentificationQueryRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneBySurvivorPensionAnalysisId(
    survivorPensionAnalysisId: SurvivorPensionAnalysisId,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult | null> {
    const data = await this.findOne({
      where: {
        survivorPensionAnalysis: { id: survivorPensionAnalysisId.toString() },
      },
      relations: { survivorPensionAnalysis: true, documents: true },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult,
    );
  }

  public async findOneById(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult | null> {
    const data = await this.findOne({
      where: { id: id.toString() },
      relations: { survivorPensionAnalysis: true, documents: true },
    });

    if (data === null) {
      return null;
    }

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult,
    );
  }

  public async findOneByIdOrFail(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: { survivorPensionAnalysis: true, documents: true },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SurvivorPensionAnalysisCustomerProfileIdentificationTypeormEntity,
      GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult,
    );
  }
}
