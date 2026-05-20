import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PovertyDeclarationGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/poverty-declaration-generator.typeorm.entity';
import { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';

@Injectable()
export class PovertyDeclarationGeneratorEntityAutoMapperProfile {
  protected readonly _type =
    PovertyDeclarationGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: PovertyDeclarationGeneratorTypeormEntity,
    ): PovertyDeclarationGeneratorEntity => {
      return new PovertyDeclarationGeneratorEntity({
        ...source,
        id: new PovertyDeclarationGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      PovertyDeclarationGeneratorTypeormEntity,
      PovertyDeclarationGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: PovertyDeclarationGeneratorEntity,
    ): PovertyDeclarationGeneratorTypeormEntity => {
      return PovertyDeclarationGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      PovertyDeclarationGeneratorEntity,
      PovertyDeclarationGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
