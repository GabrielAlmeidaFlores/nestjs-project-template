import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FullOpinionGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/full-opinion-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { FullOpinionGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/repository/full-opinion-generator-analysis-result/query/full-opinion-generator.query.repository.gateway';
import { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class FullOpinionGeneratorTypeormQueryRepository implements FullOpinionGeneratorQueryRepositoryGateway {
  protected readonly _type = FullOpinionGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(FullOpinionGeneratorTypeormEntity)
    private readonly repository: Repository<FullOpinionGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: FullOpinionGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<FullOpinionGeneratorEntity> {
    const result = await this.repository.findOneBy({
      id: id.toString(),
    });

    if (!result) {
      throw new err();
    }

    return this.mapperGateway.map(
      result,
      FullOpinionGeneratorTypeormEntity,
      FullOpinionGeneratorEntity,
    );
  }
}
