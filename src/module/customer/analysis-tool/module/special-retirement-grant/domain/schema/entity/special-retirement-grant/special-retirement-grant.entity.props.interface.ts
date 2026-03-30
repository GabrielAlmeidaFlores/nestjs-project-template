import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import type { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import type { SpecialRetirementGrantDocumentEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-document/special-retirement-grant-document.entity';
import type { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';
import type { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';

export interface SpecialRetirementGrantEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantId> {
  name: string;
  specialActivity: boolean;
  cnisDocument: string;
  specialRetirementGrantResult?: SpecialRetirementGrantResultEntity | null;
  specialRetirementGrantDocument?:
    | SpecialRetirementGrantDocumentEntity[]
    | null;
  specialRetirementGrantBenefit?: SpecialRetirementGrantBenefitEntity[] | null;
  specialRetirementGrantLegalProceeding?:
    | SpecialRetirementGrantLegalProceedingEntity[]
    | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
