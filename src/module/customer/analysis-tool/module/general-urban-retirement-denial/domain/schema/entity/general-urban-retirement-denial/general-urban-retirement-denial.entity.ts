import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import { GeneralUrbanRetirementDenialId } from './value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';

import type { GeneralUrbanRetirementDenialEntityPropsInterface } from './general-urban-retirement-denial.entity.props.interface';
import type { GeneralUrbanRetirementDenialResultId } from '../general-urban-retirement-denial-result/value-object/general-urban-retirement-denial-result-id/general-urban-retirement-denial-result-id.value-object';
import type { GeneralUrbanRetirementDenialCategoryEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/enum/general-urban-retirement-denial-category.enum';

export class GeneralUrbanRetirementDenialEntity extends BaseEntity<GeneralUrbanRetirementDenialId> {
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly generalUrbanRetirementDenialResultId: GeneralUrbanRetirementDenialResultId | null;
  public readonly requestedBenefitType: string | null;
  public readonly category: GeneralUrbanRetirementDenialCategoryEnum | null;

  protected readonly _type = GeneralUrbanRetirementDenialEntity.name;

  public constructor(props: GeneralUrbanRetirementDenialEntityPropsInterface) {
    super(GeneralUrbanRetirementDenialId, props);
    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.generalUrbanRetirementDenialResultId =
      props.generalUrbanRetirementDenialResultId ?? null;
    this.requestedBenefitType = props.requestedBenefitType ?? null;
    this.category = props.category ?? null;
  }
}
