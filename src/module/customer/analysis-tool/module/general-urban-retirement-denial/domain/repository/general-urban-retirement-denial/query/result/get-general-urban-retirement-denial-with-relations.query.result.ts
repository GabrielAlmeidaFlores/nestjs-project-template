import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/result/get-general-urban-retirement-denial-time-accelerator.query.result';
import type { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import type { GeneralUrbanRetirementDenialDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-document/general-urban-retirement-denial-document.entity';
import type { GeneralUrbanRetirementDenialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/general-urban-retirement-denial-period.entity';
import type { GeneralUrbanRetirementDenialPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-document/general-urban-retirement-denial-period-document.entity';
import type { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';
import type { GeneralUrbanRetirementDenialResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-result/general-urban-retirement-denial-result.entity';

export class GetGeneralUrbanRetirementDenialWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementDenialId;
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly generalUrbanRetirementDenialResult: GeneralUrbanRetirementDenialResultEntity | null;
  public readonly generalUrbanRetirementDenialDocument:
    | GeneralUrbanRetirementDenialDocumentEntity[]
    | null;
  public readonly generalUrbanRetirementDenialPeriod:
    | GeneralUrbanRetirementDenialPeriodEntity[]
    | null;
  public readonly generalUrbanRetirementDenialPeriodDocument:
    | GeneralUrbanRetirementDenialPeriodDocumentEntity[]
    | null;
  public readonly generalUrbanRetirementDenialPeriodEarningsHistory:
    | GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity[]
    | null;
  public readonly generalUrbanRetirementDenialTimeAccelerator:
    | GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult[]
    | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementDenialWithRelationsQueryResult.name;
}
