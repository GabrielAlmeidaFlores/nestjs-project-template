import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constructor } from 'type-fest';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/result/get-retirement-permanent-disability-rejection-with-relations.query.result';
import { RetirementPermanentDisabilityRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/repository/retirement-permanent-disability-rejection/query/retirement-permanent-disability-rejection.query.repository.gateway';
import { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';

@Injectable()
export class RetirementPermanentDisabilityRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<RetirementPermanentDisabilityRejectionTypeormEntity>
  implements RetirementPermanentDisabilityRejectionQueryRepositoryGateway
{
  protected readonly _type =
    RetirementPermanentDisabilityRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(RetirementPermanentDisabilityRejectionTypeormEntity)
    repository: Repository<RetirementPermanentDisabilityRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByRetirementPermanentDisabilityRejectionIdOrFailWithRelations(
    id: RetirementPermanentDisabilityRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          retirementPermanentDisabilityRejectionResult: true,
          retirementPermanentDisabilityRejectionDocument: true,
          retirementPermanentDisabilityRejectionIncapacity: {
            retirementPermanentDisabilityRejectionIncapacityCid: true,
            retirementPermanentDisabilityRejectionIncapacityDocument: true,
            retirementPermanentDisabilityRejectionIncapacityPreviousBenefit: true,
          },
          retirementPermanentDisabilityRejectionInsuredQuality: {
            retirementPermanentDisabilityRejectionInsuredQualityDocument: true,
          },
          retirementPermanentDisabilityRejectionPeriod: {
            retirementPermanentDisabilityRejectionPeriodDocument: true,
            retirementPermanentDisabilityRejectionPeriodEarningsHistory: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      RetirementPermanentDisabilityRejectionTypeormEntity,
      GetRetirementPermanentDisabilityRejectionWithRelationsQueryResult,
    );
  }
}
