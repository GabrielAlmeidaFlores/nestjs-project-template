import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { GetMiniAdvisorResultQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';
import type { ClientGenderEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import type { ClientSituationEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import type { ClientWorkHistoryTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import type { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';

export class GetMiniAdvisorWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: MiniAdvisorId;
  public readonly createdById: OrganizationMemberId;
  public readonly updatedById: OrganizationMemberId;
  public readonly clientSituation: ClientSituationEnum;
  public readonly clientAge: number;
  public readonly clientGender: ClientGenderEnum;
  public readonly clientWorkHistory: ClientWorkHistoryTypeEnum[];
  public readonly hasContributedWithInss: boolean;
  public readonly clientHasDisabilityOrLimitations: boolean;
  public readonly miniAdvisorResult: GetMiniAdvisorResultQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetMiniAdvisorWithRelationsQueryResult.name;
}
