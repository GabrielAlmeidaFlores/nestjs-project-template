import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PowerOfAttorneyGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/power-of-attorney-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PowerOfAttorneyGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/repository/power-of-attorney-generator-analysis-result/query/power-of-attorney-generator.query.repository.gateway';
import { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PowerOfAttorneyGeneratorTypeormQueryRepository implements PowerOfAttorneyGeneratorQueryRepositoryGateway {
  protected readonly _type = PowerOfAttorneyGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PowerOfAttorneyGeneratorTypeormEntity)
    private readonly repository: Repository<PowerOfAttorneyGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: PowerOfAttorneyGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<PowerOfAttorneyGeneratorEntity> {
    const result = await this.repository.findOneBy({ id: id.toString() });
    if (!result) {
      throw new err();
    }
    return this.mapperGateway.map(
      result,
      PowerOfAttorneyGeneratorTypeormEntity,
      PowerOfAttorneyGeneratorEntity,
    );
  }
}
