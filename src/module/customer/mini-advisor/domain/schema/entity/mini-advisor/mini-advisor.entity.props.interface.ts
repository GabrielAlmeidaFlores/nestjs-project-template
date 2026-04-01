import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import type { ClientGenderEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import type { ClientSituationEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import type { ClientWorkHistoryTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import type { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';

export interface MiniAdvisorEntityPropsInterface extends BaseEntityPropsInterface<MiniAdvisorId> {
  clientSituation: ClientSituationEnum;
  clientAge: number;
  clientGender: ClientGenderEnum;
  clientWorkHistory: ClientWorkHistoryTypeEnum[];
  hasContributedWithInss: boolean;
  clientHasDisabilityOrLimitations: boolean;
  miniAdvisorResult?: MiniAdvisorResultEntity | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
