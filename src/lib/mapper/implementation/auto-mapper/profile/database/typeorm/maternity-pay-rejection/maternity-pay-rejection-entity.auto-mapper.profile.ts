import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { MaternityPayRejectionEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/maternity-pay-rejection.entity';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

@Injectable()
export class MaternityPayRejectionEntityAutoMapperProfile {
  protected readonly _type = MaternityPayRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionTypeormEntity,
    ): MaternityPayRejectionEntity => {
      const resultId =
        source.maternityPayRejectionResult !== null &&
        source.maternityPayRejectionResult !== undefined
          ? new MaternityPayRejectionResultId(
              source.maternityPayRejectionResult.id,
            )
          : null;

      return new MaternityPayRejectionEntity({
        id: new MaternityPayRejectionId(source.id),
        triggeringEvent: source.triggeringEvent,
        analysisName: source.analysisName,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        category: source.category,
        triggeringEventDate: source.triggeringEventDate,
        estimatedTriggeringEventDate: source.estimatedTriggeringEventDate,
        workAccidentOrSevereDesease: source.workAccidentOrSevereDesease,
        clientWasUnemployedOnBenefitOrDisabilityStartDate:
          source.clientWasUnemployedOnBenefitOrDisabilityStartDate,
        clientWasRuralInsuredOnBenefitOrDisabilityStartDate:
          source.clientWasRuralInsuredOnBenefitOrDisabilityStartDate,
        thirdPartyDocumentRelationDescription:
          source.thirdPartyDocumentRelationDescription,
        maternityPayRejectionResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionTypeormEntity,
      MaternityPayRejectionEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionEntity,
    ): MaternityPayRejectionTypeormEntity => {
      return MaternityPayRejectionTypeormEntity.build({
        id: source.id.toString(),
        triggeringEvent: source.triggeringEvent,
        analysisName: source.analysisName,
        isCurrentlyUnemployed: source.isCurrentlyUnemployed,
        category: source.category,
        triggeringEventDate: source.triggeringEventDate,
        estimatedTriggeringEventDate: source.estimatedTriggeringEventDate,
        workAccidentOrSevereDesease: source.workAccidentOrSevereDesease,
        clientWasUnemployedOnBenefitOrDisabilityStartDate:
          source.clientWasUnemployedOnBenefitOrDisabilityStartDate,
        clientWasRuralInsuredOnBenefitOrDisabilityStartDate:
          source.clientWasRuralInsuredOnBenefitOrDisabilityStartDate,
        thirdPartyDocumentRelationDescription:
          source.thirdPartyDocumentRelationDescription,
        ...(source.maternityPayRejectionResultId !== null && {
          maternityPayRejectionResult:
            MaternityPayRejectionResultTypeormEntity.build({
              id: source.maternityPayRejectionResultId.toString(),
            } as MaternityPayRejectionResultTypeormEntity),
        }),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionEntity,
      MaternityPayRejectionTypeormEntity,
      constructUsing(convert),
    );
  }
}
