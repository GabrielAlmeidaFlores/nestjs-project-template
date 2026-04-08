import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/result/get-temporary-disability-benefits-grant-with-relations.query.result';
import { TemporaryDisabilityBenefitsGrantQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/temporary-disability-benefits-grant.query.repository.gateway';
import { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsGrantTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsGrantTypeormEntity>
  implements TemporaryDisabilityBenefitsGrantQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsGrantTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsGrantTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
    id: TemporaryDisabilityBenefitsGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          temporaryDisabilityBenefitsGrantResult: true,
          temporaryDisabilityBenefitsGrantDocument: true,
          temporaryDisabilityBenefitsGrantInsuredStatus: {
            temporaryDisabilityBenefitsGrantInsuredStatusDocument: true,
          },
          temporaryDisabilityBenefitsGrantPeriod: {
            temporaryDisabilityBenefitsGrantPeriodDocument: true,
            temporaryDisabilityBenefitsGrantPreviousBenefits: {
              temporaryDisabilityBenefitsGrantPreviousBenefitsDocument: true,
            },
          },
          temporaryDisabilityBenefitsGrantWorkPeriods: {
            temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      TemporaryDisabilityBenefitsGrantTypeormEntity,
      GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult,
    );
  }
}
