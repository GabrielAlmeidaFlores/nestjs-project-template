import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';

import type { MaternityPayGrantBenefitTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-benefit-triggering-event.enum';
import type { MaternityPayGrantTriggeringEventEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/enum/maternity-pay-grant-triggering-event.enum';
import type { MaternityPayGrantEntityPropsInterface } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/maternity-pay-grant.entity.props.interface';
import type { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';
import type { MaternityPayGrantCategoryEnum } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/enum/maternity-pay-grant-category.enum';

export class MaternityPayGrantEntity extends BaseEntity<MaternityPayGrantId> {
  public readonly analysisName: string | null;
  public readonly category: MaternityPayGrantCategoryEnum | null;
  public readonly triggeringEvent: MaternityPayGrantTriggeringEventEnum | null;
  public readonly triggeringEventDate: Date | null;
  public readonly cnisDocument: string | null;
  public readonly myInssPassword: string | null;
  public readonly isTriggeringEventDateValid: boolean | null;
  public readonly isCurrentlyUnemployed: boolean | null;
  public readonly isUnemployedAtTriggeringEventDate: boolean | null;
  public readonly isRuralInsured: boolean | null;
  public readonly ruralPeriodStartDate: Date | null;
  public readonly ruralPeriodEndDate: Date | null;
  public readonly ruralPeriodDocumentDescription: string | null;
  public readonly benefitTriggeringEvent: MaternityPayGrantBenefitTriggeringEventEnum | null;
  public readonly benefitTriggeringEventDate: Date | null;
  public readonly maternityPayGrantResultId: MaternityPayGrantResultId | null;

  protected readonly _type = MaternityPayGrantEntity.name;

  public constructor(props: MaternityPayGrantEntityPropsInterface) {
    super(MaternityPayGrantId, props);
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.triggeringEvent = props.triggeringEvent ?? null;
    this.triggeringEventDate = props.triggeringEventDate ?? null;
    this.cnisDocument = props.cnisDocument ?? null;
    this.myInssPassword = props.myInssPassword ?? null;
    this.isTriggeringEventDateValid = props.isTriggeringEventDateValid ?? null;
    this.isCurrentlyUnemployed = props.isCurrentlyUnemployed ?? null;
    this.isUnemployedAtTriggeringEventDate =
      props.isUnemployedAtTriggeringEventDate ?? null;
    this.isRuralInsured = props.isRuralInsured ?? null;
    this.ruralPeriodStartDate = props.ruralPeriodStartDate ?? null;
    this.ruralPeriodEndDate = props.ruralPeriodEndDate ?? null;
    this.ruralPeriodDocumentDescription =
      props.ruralPeriodDocumentDescription ?? null;
    this.benefitTriggeringEvent = props.benefitTriggeringEvent ?? null;
    this.benefitTriggeringEventDate = props.benefitTriggeringEventDate ?? null;
    this.maternityPayGrantResultId = props.maternityPayGrantResultId ?? null;
  }
}
