import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AccidentBenefitRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/accident-benefit-rejection.query.repository.gateway';
import { GetAccidentBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/repository/accident-benefit-rejection/query/result/get-accident-benefit-rejection-with-relations.query.result';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AccidentBenefitRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<AccidentBenefitRejectionTypeormEntity>
  implements AccidentBenefitRejectionQueryRepositoryGateway
{
  protected readonly _type =
    AccidentBenefitRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AccidentBenefitRejectionTypeormEntity)
    repository: Repository<AccidentBenefitRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByAccidentBenefitRejectionIdOrFailWithRelations(
    id: AccidentBenefitRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAccidentBenefitRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          accidentBenefitRejectionResult: true,
          accidentBenefitRejectionDocument: true,
          accidentBenefitRejectionInssBenefit: true,
          accidentBenefitRejectionEvent: {
            accidentBenefitRejectionEventDocument: true,
          },
          accidentBenefitRejectionWorkPeriod: {
            accidentBenefitRejectionWorkPeriodDocument: true,
            accidentBenefitRejectionWorkPeriodEarningsHistory: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      AccidentBenefitRejectionTypeormEntity,
      GetAccidentBenefitRejectionWithRelationsQueryResult,
    );
  }
}
