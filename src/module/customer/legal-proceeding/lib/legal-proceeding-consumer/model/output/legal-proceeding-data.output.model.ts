import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { LegalProceedingStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/enum/legal-proceeding-status.enum';

export class LegalProceedingDataOutputModel extends BaseBuildableObject {
  public recipient: object[];
  public recipientLawyer: object[];
  public status?: LegalProceedingStatusEnum;
  public type?: string;
  public lastUpdated?: Date;
  public deadline?: Date;
  public textContent?: string;

  protected override readonly _type = LegalProceedingDataOutputModel.name;
}
