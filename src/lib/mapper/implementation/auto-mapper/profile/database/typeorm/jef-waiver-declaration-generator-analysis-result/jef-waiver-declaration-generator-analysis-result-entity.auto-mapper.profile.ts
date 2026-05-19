import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JefWaiverDeclarationGeneratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/jef-waiver-declaration-generator.typeorm.entity';
import { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';

@Injectable()
export class JefWaiverDeclarationGeneratorEntityAutoMapperProfile {
  protected readonly _type = JefWaiverDeclarationGeneratorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JefWaiverDeclarationGeneratorTypeormEntity,
    ): JefWaiverDeclarationGeneratorEntity => {
      return new JefWaiverDeclarationGeneratorEntity({
        ...source,
        id: new JefWaiverDeclarationGeneratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JefWaiverDeclarationGeneratorTypeormEntity,
      JefWaiverDeclarationGeneratorEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: JefWaiverDeclarationGeneratorEntity,
    ): JefWaiverDeclarationGeneratorTypeormEntity => {
      return JefWaiverDeclarationGeneratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      JefWaiverDeclarationGeneratorEntity,
      JefWaiverDeclarationGeneratorTypeormEntity,
      mappingFunction,
    );
  }
}
