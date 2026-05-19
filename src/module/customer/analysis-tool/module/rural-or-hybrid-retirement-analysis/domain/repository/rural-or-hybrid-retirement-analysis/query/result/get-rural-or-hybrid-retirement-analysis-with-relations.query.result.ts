import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralOrHybridRetirementAnalysisActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-activity-type.enum';
import type { RuralOrHybridRetirementAnalysisRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-requested-benefit.enum';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-document/rural-or-hybrid-retirement-analysis-document.entity';
import type { RuralOrHybridRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period/rural-or-hybrid-retirement-analysis-period.entity';
import type { RuralOrHybridRetirementAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-document/rural-or-hybrid-retirement-analysis-period-document.entity';
import type { RuralOrHybridRetirementAnalysisPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member/rural-or-hybrid-retirement-analysis-period-member.entity';
import type { RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-period-member-document/rural-or-hybrid-retirement-analysis-period-member-document.entity';
import type { RuralOrHybridRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/rural-or-hybrid-retirement-analysis-result.entity';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/rural-or-hybrid-retirement-analysis-testimonial-witness.entity';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/rural-or-hybrid-retirement-analysis-testimonial-witness-document.entity';
import type { RuralOrHybridRetirementAnalysisTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/rural-or-hybrid-retirement-analysis-time-accelerator.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/rural-or-hybrid-retirement-analysis-work-period.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document/rural-or-hybrid-retirement-analysis-work-period-document.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis/rural-or-hybrid-retirement-analysis-work-period-document-analysis.entity';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history/rural-or-hybrid-retirement-analysis-work-period-earnings-history.entity';

export class GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
  public readonly analysisName: string | null;
  public readonly activityType: RuralOrHybridRetirementAnalysisActivityTypeEnum | null;
  public readonly requestedBenefit: RuralOrHybridRetirementAnalysisRequestedBenefitEnum | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly ruralOrHybridRetirementAnalysisResult: RuralOrHybridRetirementAnalysisResultEntity | null;
  public readonly ruralOrHybridRetirementAnalysisDocument:
    | RuralOrHybridRetirementAnalysisDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisPeriod:
    | RuralOrHybridRetirementAnalysisPeriodEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisPeriodDocument:
    | RuralOrHybridRetirementAnalysisPeriodDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisPeriodMember:
    | RuralOrHybridRetirementAnalysisPeriodMemberEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisPeriodMemberDocument:
    | RuralOrHybridRetirementAnalysisPeriodMemberDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisTestimonialWitness:
    | RuralOrHybridRetirementAnalysisTestimonialWitnessEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisTestimonialWitnessDocument:
    | RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriod:
    | RuralOrHybridRetirementAnalysisWorkPeriodEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriodDocument:
    | RuralOrHybridRetirementAnalysisWorkPeriodDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis:
    | RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory:
    | RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryEntity[]
    | null;
  public readonly ruralOrHybridRetirementAnalysisTimeAccelerator:
    | RuralOrHybridRetirementAnalysisTimeAcceleratorEntity[]
    | null;

  protected override readonly _type =
    GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult.name;
}
