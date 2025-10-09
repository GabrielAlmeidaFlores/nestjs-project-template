import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidAnalysisToolClientNameError } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/error/invalid-analysis-tool-client-name.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity.props.interface';
import type { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';

export class AnalysisToolClientEntity extends BaseEntity<AnalysisToolClientId> {
  public readonly name: string | null;
  public readonly federalDocument: FederalDocument | null;
  public readonly email: Email | null;
  public readonly phoneNumber: PhoneNumber | null;
  public readonly birthDate: Date | null;
  public readonly gender: GenderEnum | null;
  public readonly clientType: AnalysisToolClientTypeEnum | null;
  public readonly createdBy: OrganizationMemberId;
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AnalysisToolClientEntity.name;

  public constructor(props: AnalysisToolClientEntityPropsInterface) {
    super(AnalysisToolClientId, props);

    AnalysisToolClientEntity.validateName(props.name);

    this.name = props.name ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.email = props.email ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
    this.birthDate = props.birthDate ?? null;
    this.gender = props.gender ?? null;
    this.clientType = props.clientType ?? null;
    this.createdBy = props.createdBy;
    this.updatedBy = props.updatedBy;
  }

  public static validateName(name?: string | null): void {
    if (name === undefined || name === null) {
      return;
    }

    const minNameLength = 3;
    const maxNameLength = 50;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    const hasMinimumLength = name.length >= minNameLength;
    const hasMaximumLength = name.length <= maxNameLength;
    const matchesAllowedCharacters = nameRegex.test(name);

    this.validateAllOrThrow(
      [hasMinimumLength, hasMaximumLength, matchesAllowedCharacters],
      () =>
        new InvalidAnalysisToolClientNameError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }
}
