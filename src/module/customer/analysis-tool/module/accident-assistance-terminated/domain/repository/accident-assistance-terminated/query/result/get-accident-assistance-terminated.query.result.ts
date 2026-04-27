import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import type { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import type { AccidentAssistanceTerminatedCategoryEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-category.enum';
import type { AccidentAssistanceTerminatedExtensionRequestStatusEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/enum/accident-assistance-terminated-extension-request-status.enum';
import type { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';

export class GetAccidentAssistanceTerminatedQueryResult extends BaseBuildableObject {
  public readonly id: AccidentAssistanceTerminatedId;
  public readonly der: Date;
  public readonly denialDate: Date;
  public readonly category: AccidentAssistanceTerminatedCategoryEnum;
  public readonly inssPassword: string | null;
  public readonly analysisName: string | null;
  public readonly benefitCessationReason: string;
  public readonly hadPreviousIncapacityBenefit: boolean;
  public readonly previousIncapacityBenefitNumber: string | null;
  public readonly previousIncapacityBenefitStartDate: Date | null;
  public readonly previousIncapacityBenefitEndDate: Date | null;
  public readonly extensionRequestStatus: AccidentAssistanceTerminatedExtensionRequestStatusEnum | null;
  public readonly dib: Date | null;
  public readonly dcb: Date | null;
  public readonly inssBenefitNumber: string | null;
  public readonly accidentDate: Date | null;
  public readonly accidentDescription: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly accidentAssistanceTerminatedResult: AccidentAssistanceTerminatedResultTypeormEntity | null;
  public readonly accidentAssistanceTerminatedDocument: AccidentAssistanceTerminatedDocumentTypeormEntity[];

  protected override readonly _type =
    GetAccidentAssistanceTerminatedQueryResult.name;
}
