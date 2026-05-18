import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/result/get-temporary-disability-benefits-terminated-with-relations.query.result';
import { TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/temporary-disability-benefits-terminated.query.repository.gateway';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedTypeormQueryRepository
  extends BaseTypeormQueryRepository<TemporaryDisabilityBenefitsTerminatedTypeormEntity>
  implements TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway
{
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(TemporaryDisabilityBenefitsTerminatedTypeormEntity)
    repository: Repository<TemporaryDisabilityBenefitsTerminatedTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
    id: TemporaryDisabilityBenefitsTerminatedId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          temporaryDisabilityBenefitsTerminatedResult: true,
          analysisToolRecord: {
            analysisToolClient: true,
          },
          documents: true,
          insuredStatus: {
            documents: true,
          },
          disabilityAnalysis: {
            cids: true,
            documents: true,
            temporaryDisabilityBenefitsTerminatedPreviousBenefit: {
              temporaryDisabilityBenefitsTerminatedPreviousBenefitDocument: true,
            },
          },
          workPeriods: {
            earningsHistory: true,
            temporaryDisabilityBenefitsTerminatedWorkPeriodDocument: true,
          },
          inssBenefits: true,
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      TemporaryDisabilityBenefitsTerminatedTypeormEntity,
      GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult,
    );
  }
}
