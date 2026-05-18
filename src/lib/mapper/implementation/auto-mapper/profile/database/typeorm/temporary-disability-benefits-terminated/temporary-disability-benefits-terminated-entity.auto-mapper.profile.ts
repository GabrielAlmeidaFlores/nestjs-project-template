import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-result.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    ): TemporaryDisabilityBenefitsTerminatedEntity => {
      const resultId =
        source.temporaryDisabilityBenefitsTerminatedResult !== null &&
        source.temporaryDisabilityBenefitsTerminatedResult !== undefined
          ? new TemporaryDisabilityBenefitsTerminatedResultId(
              source.temporaryDisabilityBenefitsTerminatedResult.id,
            )
          : null;

      return new TemporaryDisabilityBenefitsTerminatedEntity({
        id: new TemporaryDisabilityBenefitsTerminatedId(source.id),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        benefitCessationDate: source.benefitCessationDate,
        category: source.category,
        myInssPassword: source.myInssPassword,
        benefitCessationReason: source.benefitCessationReason,
        temporaryDisabilityBenefitsTerminatedResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsTerminatedEntity,
    ): TemporaryDisabilityBenefitsTerminatedTypeormEntity => {
      const result =
        source.temporaryDisabilityBenefitsTerminatedResultId !== null
          ? TemporaryDisabilityBenefitsTerminatedResultTypeormEntity.build({
              id: source.temporaryDisabilityBenefitsTerminatedResultId.toString(),
            } as TemporaryDisabilityBenefitsTerminatedResultTypeormEntity)
          : null;

      return TemporaryDisabilityBenefitsTerminatedTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        requestEntryDate: source.requestEntryDate,
        benefitCessationDate: source.benefitCessationDate,
        category: source.category,
        myInssPassword: source.myInssPassword,
        benefitCessationReason: source.benefitCessationReason,
        temporaryDisabilityBenefitsTerminatedResult: result,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedEntity,
      TemporaryDisabilityBenefitsTerminatedTypeormEntity,
      constructUsing(convert),
    );
  }
}
