import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { MaternityPayGrantEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';

@Injectable()
export class MaternityPayGrantEntityAutoMapperProfile {
  protected readonly _type = MaternityPayGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayGrantTypeormEntity,
    ): MaternityPayGrantEntity => {
      const maternityPayGrantResultId =
        source.maternityPayGrantResult !== null &&
        source.maternityPayGrantResult !== undefined
          ? new MaternityPayGrantResultId(source.maternityPayGrantResult.id)
          : null;

      return new MaternityPayGrantEntity({
        id: new MaternityPayGrantId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        triggeringEvent: source.triggeringEvent,
        triggeringEventDate: source.triggeringEventDate,
        cnisDocument: source.cnisDocument,
        myInssPassword: source.myInssPassword,
        isTriggeringEventDateValid: source.isTriggeringEventDateValid,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        isUnemployedAtTriggeringEventDate:
          source.isUnemployedAtTriggeringEventDate,
        isRuralInsured: source.isRuralInsured,
        ruralPeriodStartDate: source.ruralPeriodStartDate,
        ruralPeriodEndDate: source.ruralPeriodEndDate,
        ruralPeriodDocumentDescription: source.ruralPeriodDocumentDescription,
        maternityPayGrantResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayGrantTypeormEntity,
      MaternityPayGrantEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayGrantEntity,
    ): MaternityPayGrantTypeormEntity => {
      const maternityPayGrantResult =
        source.maternityPayGrantResultId !== null
          ? MaternityPayGrantResultTypeormEntity.build({
              id: source.maternityPayGrantResultId.toString(),
            } as MaternityPayGrantResultTypeormEntity)
          : undefined;

      return MaternityPayGrantTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        triggeringEvent: source.triggeringEvent,
        triggeringEventDate: source.triggeringEventDate,
        cnisDocument: source.cnisDocument,
        myInssPassword: null,
        isTriggeringEventDateValid: source.isTriggeringEventDateValid,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        isUnemployedAtTriggeringEventDate:
          source.isUnemployedAtTriggeringEventDate,
        isRuralInsured: source.isRuralInsured,
        ruralPeriodStartDate: source.ruralPeriodStartDate,
        ruralPeriodEndDate: source.ruralPeriodEndDate,
        ruralPeriodDocumentDescription: source.ruralPeriodDocumentDescription,
        maternityPayGrantResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayGrantEntity,
      MaternityPayGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
