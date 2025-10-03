import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CnisFastAnalysisClientTypeEnum } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client/enum/cnis-fast-analysis-client-type.enum';
import type { CnisFastAnalysisClientId } from '@module/customer/analysis-tools/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';

export interface CnisFastAnalysisClientEntityPropsInterface
  extends BaseEntityPropsInterface<CnisFastAnalysisClientId> {
  name?: string | null;
  federalDocument?: FederalDocument | null;
  birthDate?: Date | null;
  gender?: GenderEnum | null;
  email?: Email | null;
  phoneNumber?: PhoneNumber | null;
  clientType?: CnisFastAnalysisClientTypeEnum | null;
}
