import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { SpecialRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetSpecialRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/query/result/get-special-retirement-rejection-with-relations.query.result';
import { SpecialRetirementRejectionQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/query/special-retirement-rejection.query.repository.gateway';
import { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class SpecialRetirementRejectionTypeormQueryRepository
  extends BaseTypeormQueryRepository<SpecialRetirementRejectionTypeormEntity>
  implements SpecialRetirementRejectionQueryRepositoryGateway
{
  protected readonly _type =
    SpecialRetirementRejectionTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(SpecialRetirementRejectionTypeormEntity)
    repository: Repository<SpecialRetirementRejectionTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneBySpecialRetirementRejectionIdOrFailWithRelations(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialRetirementRejectionWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: specialRetirementRejectionId.toString() },
        relations: {
          specialRetirementRejectionResult: true,
          specialRetirementRejectionDocument: true,
          specialRetirementRejectionInssBenefit: true,
          specialRetirementRejectionLegalProceeding: true,
          specialRetirementRejectionTechnicalDiagnosis: true,
          specialRetirementRejectionWorkPeriod: {
            specialRetirementRejectionWorkPeriodDocument: true,
            specialRetirementRejectionWorkPeriodEarningsHistory: true,
            specialRetirementRejectionWorkSpecialPeriod: {
              specialRetirementRejectionWorkSpecialPeriodLegalFramework: true,
            },
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      SpecialRetirementRejectionTypeormEntity,
      GetSpecialRetirementRejectionWithRelationsQueryResult,
    );
  }
}
