import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdministrativeRequestGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/administrative-request-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { AdministrativeRequestGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/repository/administrative-request-generator-analysis-result/query/administrative-request-generator.query.repository.gateway';
import { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class AdministrativeRequestGeneratorTypeormQueryRepository implements AdministrativeRequestGeneratorQueryRepositoryGateway {
  protected readonly _type =
    AdministrativeRequestGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(AdministrativeRequestGeneratorTypeormEntity)
    private readonly repository: Repository<AdministrativeRequestGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: AdministrativeRequestGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<AdministrativeRequestGeneratorEntity> {
    const result = await this.repository.findOneBy({
      id: id.toString(),
    });

    if (!result) {
      throw new err();
    }

    return this.mapperGateway.map(
      result,
      AdministrativeRequestGeneratorTypeormEntity,
      AdministrativeRequestGeneratorEntity,
    );
  }
}
