import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { GetRuralTimelineAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/query/result/get-rural-timeline-analysis-inss-benefit.query.result';
import type { GetRuralTimelineAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/query/result/get-rural-timeline-analysis-legal-proceeding.query.result';
import type { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import type { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import type { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import type { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';
import type { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import type { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import type { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import type { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import type { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import type { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';
import type { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import type { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';
import type { RuralTimelineAnalysisPeriodLandOwnershipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/enum/rural-timeline-analysis-period-land-ownership-type.enum';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export class GetRuralTimelineAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisDocumentId;
  public readonly type: RuralTimelineAnalysisDocumentTypeEnum;
  public readonly document: string;

  protected override readonly _type =
    GetRuralTimelineAnalysisDocumentQueryResult.name;
}

export class GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult extends BaseBuildableObject {
  public readonly contributionDate: Date;
  public readonly contributionAmount: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult.name;
}

export class GetRuralTimelineAnalysisCnisContributionPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisCnisContributionPeriodId;
  public readonly employmentRelationshipSource: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly qualifyingPeriod: number | null;
  public readonly status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum | null;
  public readonly averageContributionAmount: DecimalValue | null;
  public readonly contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;
  public readonly externalSupplementationIntent: boolean;
  public readonly cnisDocument: string | null;
  public readonly ruralTimelineCnisContributionPeriodUnderMinimum: GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodQueryResult.name;
}

export class GetRuralTimelineAnalysisPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodDocumentId;
  public readonly documentYear: number | null;
  public readonly documentHolderType: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum | null;
  public readonly selfOwned: boolean | null;
  public readonly probatoryPurpose: string | null;
  public readonly analyzedAt: Date | null;
  public readonly document: string;
  public readonly type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodDocumentQueryResult.name;
}

export class GetRuralTimelineAnalysisPeriodResidenceQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodResidenceId;
  public readonly city: string;
  public readonly stateCode: StateCodeEnum;
  public readonly distanceToPropertyKm: DecimalValue;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodResidenceQueryResult.name;
}

export class GetRuralTimelineAnalysisPeriodPropertyQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodPropertyId;
  public readonly propertyName: string | null;
  public readonly ownerName: string | null;
  public readonly postalCode: PostalCode | null;
  public readonly stateCode: StateCodeEnum | null;
  public readonly city: string | null;
  public readonly neighborhood: string | null;
  public readonly street: string | null;
  public readonly streetNumber: string | null;
  public readonly landOwnershipType: RuralTimelineAnalysisPeriodLandOwnershipTypeEnum | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodPropertyQueryResult.name;
}

export class GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult extends BaseBuildableObject {
  public readonly type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;
  public readonly content: string | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult.name;
}

export class GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult extends BaseBuildableObject {
  public readonly name: string;
  public readonly federalDocument: FederalDocument;
  public readonly kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;
  public readonly receivesRuralBenefit: boolean;
  public readonly benefitNumber: string | null;
  public readonly cnisDocument: string | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult.name;
}

export class GetRuralTimelineAnalysisPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodId;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly workerType: RuralTimelineAnalysisPeriodWorkerTypeEnum | null;
  public readonly workRegimeType: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum | null;
  public readonly productionDestination: ProductionDestinationEnum | null;
  public readonly documentAnalysis: string | null;
  public readonly ruralTimelineAnalysisPeriodDocument: GetRuralTimelineAnalysisPeriodDocumentQueryResult[];
  public readonly ruralTimelineAnalysisPeriodResidence: GetRuralTimelineAnalysisPeriodResidenceQueryResult | null;
  public readonly ruralTimelineAnalysisPeriodProperty: GetRuralTimelineAnalysisPeriodPropertyQueryResult | null;
  public readonly ruralTimelineAnalysisPeriodEconomicAspects: GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult[];
  public readonly ruralTimelineAnalysisPeriodFamilyGroupMember: GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult[];

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodQueryResult.name;
}

export class GetRuralTimelineAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisId;
  public readonly ruralTimelineCompleteAnalysis: string | null;
  public readonly ruralTimelineSimplifiedAnalysis: string | null;
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;
  public readonly workRegime: RuralTimelineAnalysisWorkRegimeEnum;
  public readonly ruralTimelineAnalysisInssBenefit: GetRuralTimelineAnalysisInssBenefitQueryResult[];
  public readonly ruralTimelineAnalysisLegalProceeding: GetRuralTimelineAnalysisLegalProceedingQueryResult[];
  public readonly ruralTimelineAnalysisPeriod: GetRuralTimelineAnalysisPeriodQueryResult[];
  public readonly ruralTimelineDocument: GetRuralTimelineAnalysisDocumentQueryResult[];
  public readonly ruralTimelineCnisContributionPeriod: GetRuralTimelineAnalysisCnisContributionPeriodQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisWithRelationsQueryResult.name;
}
