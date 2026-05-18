import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import type { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-document/rural-or-hybrid-retirement-rejection-document.entity';
import type { RuralOrHybridRetirementRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit/rural-or-hybrid-retirement-rejection-inss-benefit.entity';
import type { RuralOrHybridRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding/rural-or-hybrid-retirement-rejection-legal-proceeding.entity';
import type { RuralOrHybridRetirementRejectionPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period/rural-or-hybrid-retirement-rejection-period.entity';
import type { RuralOrHybridRetirementRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-document/rural-or-hybrid-retirement-rejection-period-document.entity';
import type { RuralOrHybridRetirementRejectionPeriodMemberEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member/rural-or-hybrid-retirement-rejection-period-member.entity';
import type { RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-period-member-document/rural-or-hybrid-retirement-rejection-period-member-document.entity';
import type { RuralOrHybridRetirementRejectionResultEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/rural-or-hybrid-retirement-rejection-result.entity';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/rural-or-hybrid-retirement-rejection-testimonial-witness.entity';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/rural-or-hybrid-retirement-rejection-testimonial-witness-document.entity';
import type { RuralOrHybridRetirementRejectionTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/rural-or-hybrid-retirement-rejection-time-accelerator.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document/rural-or-hybrid-retirement-rejection-work-period-document.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis/rural-or-hybrid-retirement-rejection-work-period-document-analysis.entity';
import type { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history/rural-or-hybrid-retirement-rejection-work-period-earnings-history.entity';

export class GetRuralOrHybridRetirementRejectionWithRelationsQueryResult extends BaseBuildableObject {
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
  public readonly analysisName: string | null;
  public readonly activityType: RuralOrHybridRetirementRejectionActivityTypeEnum | null;
  public readonly applicationSubmissionDate: Date | null;
  public readonly requestedBenefit: RuralOrHybridRetirementRejectionRequestedBenefitEnum | null;
  public readonly dateOfRejection: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly ruralOrHybridRetirementRejectionResult: RuralOrHybridRetirementRejectionResultEntity | null;
  public readonly ruralOrHybridRetirementRejectionDocument:
    | RuralOrHybridRetirementRejectionDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionInssBenefit:
    | RuralOrHybridRetirementRejectionInssBenefitEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionLegalProceeding:
    | RuralOrHybridRetirementRejectionLegalProceedingEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionPeriod:
    | RuralOrHybridRetirementRejectionPeriodEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionPeriodDocument:
    | RuralOrHybridRetirementRejectionPeriodDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionPeriodMember:
    | RuralOrHybridRetirementRejectionPeriodMemberEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionPeriodMemberDocument:
    | RuralOrHybridRetirementRejectionPeriodMemberDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionTestimonialWitness:
    | RuralOrHybridRetirementRejectionTestimonialWitnessEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionTestimonialWitnessDocument:
    | RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriod:
    | RuralOrHybridRetirementRejectionWorkPeriodEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriodDocument:
    | RuralOrHybridRetirementRejectionWorkPeriodDocumentEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis:
    | RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory:
    | RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryEntity[]
    | null;
  public readonly ruralOrHybridRetirementRejectionTimeAccelerator:
    | RuralOrHybridRetirementRejectionTimeAcceleratorEntity[]
    | null;

  protected override readonly _type =
    GetRuralOrHybridRetirementRejectionWithRelationsQueryResult.name;
}
