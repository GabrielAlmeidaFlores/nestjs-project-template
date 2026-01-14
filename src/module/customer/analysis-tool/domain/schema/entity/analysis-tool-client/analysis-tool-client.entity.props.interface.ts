import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

export interface AnalysisToolClientEntityPropsInterface extends BaseEntityPropsInterface<AnalysisToolClientId> {
  name?: string | null;
  federalDocument?: FederalDocument | null;
  inssPassword?: string | null;
  birthDate?: Date | null;
  gender?: GenderEnum | null;
  email?: Email | null;
  phoneNumber?: PhoneNumber | null;
  clientType?: AnalysisToolClientTypeEnum | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
