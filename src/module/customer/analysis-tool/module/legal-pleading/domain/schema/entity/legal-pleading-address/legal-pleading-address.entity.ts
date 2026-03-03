import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidLegalPleadingAddressCityError } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/error/invalid-pleading-address-city.error';
import { InvalidLegalPleadingAddressNeighborhoodError } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/error/invalid-pleading-address-neighborhood.error';
import { InvalidLegalPleadingAddressStreetError } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/error/invalid-pleading-address-street.error';
import { LegalPleadingAddressId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { LegalPleadingAddressEntityPropsInterface } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity.props.interface';

export class LegalPleadingAddressEntity extends BaseEntity<LegalPleadingAddressId> {
  @Description('Código postal (CEP) do endereço da peça processual.')
  public readonly postalCode: PostalCode;

  @Description('Código do estado do endereço relacionado à peça processual.')
  public readonly stateCode: StateCodeEnum;

  @Description('Cidade do endereço relacionado à peça processual.')
  public readonly city: string;

  @Description('Bairro do endereço relacionado à peça processual.')
  public readonly neighborhood: string;

  @Description('Rua do endereço relacionado à peça processual.')
  public readonly street: string;

  @Description('Número do endereço relacionado à peça processual.')
  public readonly addressNumber: number;

  protected readonly _type = LegalPleadingAddressEntity.name;

  public constructor(props: LegalPleadingAddressEntityPropsInterface) {
    super(LegalPleadingAddressId, props);

    LegalPleadingAddressEntity.validateCity(props.city);
    LegalPleadingAddressEntity.validateNeighborhood(props.neighborhood);
    LegalPleadingAddressEntity.validateStreet(props.street);

    this.postalCode = props.postalCode;
    this.stateCode = props.stateCode;
    this.city = props.city;
    this.neighborhood = props.neighborhood;
    this.street = props.street;
    this.addressNumber = props.addressNumber;
  }

  public static validateCity(name?: string | null): void {
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
      () => new InvalidLegalPleadingAddressCityError(),
    );
  }

  public static validateNeighborhood(neighborhood?: string | null): void {
    if (neighborhood === undefined || neighborhood === null) {
      return;
    }

    const minLength = 2;
    const maxLength = 50;
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-]+$/;

    const isValidLength =
      neighborhood.length >= minLength && neighborhood.length <= maxLength;
    const matchesRegex = regex.test(neighborhood);

    this.validateAllOrThrow(
      [isValidLength, matchesRegex],
      () => new InvalidLegalPleadingAddressNeighborhoodError(),
    );
  }

  public static validateStreet(street?: string | null): void {
    if (street === undefined || street === null) {
      return;
    }

    const minLength = 3;
    const maxLength = 100;
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\.\-]+$/;

    const isValidLength =
      street.length >= minLength && street.length <= maxLength;
    const matchesRegex = regex.test(street);

    this.validateAllOrThrow(
      [isValidLength, matchesRegex],
      () => new InvalidLegalPleadingAddressStreetError(),
    );
  }
}
