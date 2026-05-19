import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import { PermanentIncapacityBenefitTerminatedInssBenefitEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/permanent-incapacity-benefit-terminated-inss-benefit.entity';
import { PermanentIncapacityBenefitTerminatedInssBenefitId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-inss-benefit/value-object/permanent-incapacity-benefit-terminated-inss-benefit-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
      PermanentIncapacityBenefitTerminatedInssBenefitEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedInssBenefitEntity => {
          if (!source.permanentIncapacityBenefitTerminated) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedInssBenefitEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedInssBenefitEntity({
            id: new PermanentIncapacityBenefitTerminatedInssBenefitId(
              source.id,
            ),
            inssBenefit: source.inssBenefit,
            permanentIncapacityBenefitTerminatedId:
              new PermanentIncapacityBenefitTerminatedId(
                source.permanentIncapacityBenefitTerminated.id,
              ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      PermanentIncapacityBenefitTerminatedInssBenefitEntity,
      PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedInssBenefitEntity,
        ): PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity =>
          PermanentIncapacityBenefitTerminatedInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            permanentIncapacityBenefitTerminated:
              PermanentIncapacityBenefitTerminatedTypeormEntity.build({
                id: source.permanentIncapacityBenefitTerminatedId.toString(),
              } as PermanentIncapacityBenefitTerminatedTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
