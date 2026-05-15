import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NotFoundError } from '@core/error/not-found.error';
import { BaseTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.query.repository';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PermanentIncapacityBenefitTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/permanent-incapacity-benefit-terminated.query.repository.gateway';
import { GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/repository/permanent-incapacity-benefit-terminated/query/result/get-permanent-incapacity-benefit-terminated-with-relations.query.result';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PermanentIncapacityBenefitTerminatedTypeormQueryRepository
  extends BaseTypeormQueryRepository<PermanentIncapacityBenefitTerminatedTypeormEntity>
  implements PermanentIncapacityBenefitTerminatedQueryRepositoryGateway
{
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PermanentIncapacityBenefitTerminatedTypeormEntity)
    repository: Repository<PermanentIncapacityBenefitTerminatedTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public async findOneByPermanentIncapacityBenefitTerminatedIdOrFailWithRelations(
    id: PermanentIncapacityBenefitTerminatedId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult> {
    const data = await this.findOneOrFail(
      {
        where: { id: id.toString() },
        relations: {
          permanentIncapacityBenefitTerminatedResult: true,
          documents: true,
          insuredStatus: {
            documents: true,
          },
          disabilityAnalysis: {
            cids: true,
            documents: true,
          },
          workPeriods: {
            earningsHistory: true,
          },
          inssBenefits: true,
          analysisToolRecord: {
            analysisToolClient: true,
          },
        },
      },
      err,
    );

    return this.mapperGateway.map(
      data,
      PermanentIncapacityBenefitTerminatedTypeormEntity,
      GetPermanentIncapacityBenefitTerminatedWithRelationsQueryResult,
    );
  }
}
