import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidCnisFastAnalysisClientNameError } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/error/invalid-cnis-fast-analysis-client-name.error';
import { CnisFastAnalysisClientId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { CnisFastAnalysisClientEntityPropsInterface } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity.props.interface';
import type { QuickCnisAnalysisClientTypeEnum } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/enum/quick-cnis-analysis-client-type.enum';

export class CnisFastAnalysisClientEntity extends BaseEntity<CnisFastAnalysisClientId> {
  public readonly name: string | null;
  public readonly federalDocument: FederalDocument | null;
  public readonly email: Email | null;
  public readonly phoneNumber: PhoneNumber | null;
  public readonly birthDate: Date | null;
  public readonly gender: GenderEnum | null;
  public readonly clientType: QuickCnisAnalysisClientTypeEnum | null;

  protected readonly _type = CnisFastAnalysisClientEntity.name;

  public constructor(props: CnisFastAnalysisClientEntityPropsInterface) {
    super(CnisFastAnalysisClientId, props);

    CnisFastAnalysisClientEntity.validateName(props.name);

    this.name = props.name ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.email = props.email ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
    this.birthDate = props.birthDate ?? null;
    this.gender = props.gender ?? null;
    this.clientType = props.clientType ?? null;
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
        new InvalidCnisFastAnalysisClientNameError({
          maxLength: maxNameLength,
          minLength: minNameLength,
        }),
    );
  }
}
