import type {BaseEntityPropsInterface} from '@core/domain/schema/entity/base/base.entity.props.interface';
import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionId } from './value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';

export interface RuralOrHybridRetirementRejectionEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionId> {
  organizationId: string;
  organizationMemberId: string;
  analysisToolRecordId: string;
  federativeEntity: string;
  state: string | null;
  municipality: string | null;
  analysisName: string;
  currentPosition: string | null;
  activityType: string | null;
  publicServiceStartDate: Date | null;
  careerStartDate: Date | null;
  inssBenefitIds: string[];
  legalProceedingIds: string[];
  periodIds: string[];
  periodMemberIds: string[];
  testimonialWitnessIds: string[];
  workPeriodIds: string[];
  timeAcceleratorIds: string[];
  resultId: string | null;
}

export class RuralOrHybridRetirementRejectionEntity extends BaseEntity<RuralOrHybridRetirementRejectionId> {
  public readonly organizationId: string;
  public readonly organizationMemberId: string;
  public readonly analysisToolRecordId: string;
  public readonly federativeEntity: string;
  public readonly state: string | null;
  public readonly municipality: string | null;
  public readonly analysisName: string;
  public readonly currentPosition: string | null;
  public readonly activityType: string | null;
  public readonly publicServiceStartDate: Date | null;
  public readonly careerStartDate: Date | null;
  public readonly inssBenefitIds: string[];
  public readonly legalProceedingIds: string[];
  public readonly periodIds: string[];
  public readonly periodMemberIds: string[];
  public readonly testimonialWitnessIds: string[];
  public readonly workPeriodIds: string[];
  public readonly timeAcceleratorIds: string[];
  public readonly resultId: string | null;

  protected readonly _type = RuralOrHybridRetirementRejectionEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionId, props);
    this.organizationId = props.organizationId;
    this.organizationMemberId = props.organizationMemberId;
    this.analysisToolRecordId = props.analysisToolRecordId;
    this.federativeEntity = props.federativeEntity;
    this.state = props.state ?? null;
    this.municipality = props.municipality ?? null;
    this.analysisName = props.analysisName;
    this.currentPosition = props.currentPosition ?? null;
    this.activityType = props.activityType ?? null;
    this.publicServiceStartDate = props.publicServiceStartDate ?? null;
    this.careerStartDate = props.careerStartDate ?? null;
    this.inssBenefitIds = props.inssBenefitIds ?? [];
    this.legalProceedingIds = props.legalProceedingIds ?? [];
    this.periodIds = props.periodIds ?? [];
    this.periodMemberIds = props.periodMemberIds ?? [];
    this.testimonialWitnessIds = props.testimonialWitnessIds ?? [];
    this.workPeriodIds = props.workPeriodIds ?? [];
    this.timeAcceleratorIds = props.timeAcceleratorIds ?? [];
    this.resultId = props.resultId ?? null;
  }
}
