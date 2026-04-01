import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { ClientGenderEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-gender.enum';
import { ClientSituationEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-situation.enum';
import { ClientWorkHistoryTypeEnum } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/enum/client-work-history-type.enum';
import { MiniAdvisorEntityPropsInterface } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity.props.interface';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';

export class MiniAdvisorEntity extends BaseEntity<MiniAdvisorId> {
  public readonly clientSituation: ClientSituationEnum;
  public readonly clientAge: number;
  public readonly clientGender: ClientGenderEnum;
  public readonly clientWorkHistory: ClientWorkHistoryTypeEnum[];
  public readonly hasContributedWithInss: boolean;
  public readonly clientHasDisabilityOrLimitations: boolean;
  public readonly miniAdvisorResult: MiniAdvisorResultEntity | null;
  public readonly createdBy: OrganizationMemberId;
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = MiniAdvisorEntity.name;

  public constructor(props: MiniAdvisorEntityPropsInterface) {
    super(MiniAdvisorId, props);
    this.clientSituation = props.clientSituation;
    this.clientAge = props.clientAge;
    this.clientGender = props.clientGender;
    this.clientWorkHistory = props.clientWorkHistory;
    this.hasContributedWithInss = props.hasContributedWithInss;
    this.clientHasDisabilityOrLimitations =
      props.clientHasDisabilityOrLimitations;
    this.miniAdvisorResult = props.miniAdvisorResult ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }
}
