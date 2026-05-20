import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PovertyDeclarationGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/poverty-declaration-generator.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { PovertyDeclarationGeneratorQueryRepositoryGateway } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/repository/poverty-declaration-generator-analysis-result/query/poverty-declaration-generator.query.repository.gateway';
import { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';

import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';

@Injectable()
export class PovertyDeclarationGeneratorTypeormQueryRepository implements PovertyDeclarationGeneratorQueryRepositoryGateway {
  protected readonly _type = PovertyDeclarationGeneratorTypeormQueryRepository.name;

  public constructor(
    @InjectRepository(PovertyDeclarationGeneratorTypeormEntity)
    private readonly repository: Repository<PovertyDeclarationGeneratorTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {}

  public async findOneByIdOrFail(
    id: PovertyDeclarationGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<PovertyDeclarationGeneratorEntity> {
    const result = await this.repository.findOneBy({ id: id.toString() });
    if (!result) {
      throw new err();
    }
    return this.mapperGateway.map(
      result,
      PovertyDeclarationGeneratorTypeormEntity,
      PovertyDeclarationGeneratorEntity,
    );
  }
}
