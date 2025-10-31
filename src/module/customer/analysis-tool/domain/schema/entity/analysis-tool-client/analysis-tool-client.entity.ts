import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { InvalidAnalysisToolClientBirthDateError } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/error/invalid-analysis-tool-client-date.error';
import { InvalidAnalysisToolClientNameError } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/error/invalid-analysis-tool-client-name.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { AnalysisToolClientEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity.props.interface';
import type { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';

export class AnalysisToolClientEntity extends BaseEntity<AnalysisToolClientId> {
  @Description('Nome do cliente da ferramenta de análise.')
  public readonly name: string | null;

  @Description('Documento federal do cliente da ferramenta de análise.')
  public readonly federalDocument: FederalDocument | null;

  @Description('Email do cliente da ferramenta de análise.')
  public readonly email: Email | null;

  @Description('Senha utilizada para acessar o sistema do INSS.')
  public readonly inssPassword: string | null;

  @Description('Número de telefone do cliente da ferramenta de análise.')
  public readonly phoneNumber: PhoneNumber | null;

  @Description('Data de nascimento do cliente da ferramenta de análise.')
  public readonly birthDate: Date | null;

  @Description('Gênero do cliente da ferramenta de análise.')
  public readonly gender: GenderEnum | null;

  @Description('Tipo do cliente da ferramenta de análise.')
  public readonly clientType: AnalysisToolClientTypeEnum | null;

  @Description(
    'Membro da organização que criou o cliente da ferramenta de análise.',
  )
  public readonly createdBy: OrganizationMemberId;

  @Description(
    'Membro da organização que atualizou o cliente da ferramenta de análise.',
  )
  public readonly updatedBy: OrganizationMemberId;

  protected readonly _type = AnalysisToolClientEntity.name;

  public constructor(props: AnalysisToolClientEntityPropsInterface) {
    super(AnalysisToolClientId, props);

    AnalysisToolClientEntity.validateName(props.name);
    AnalysisToolClientEntity.validateBirthDate(props.birthDate);

    this.name = props.name ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.email = props.email ?? null;
    this.inssPassword = props.inssPassword ?? null;
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

  public static validateBirthDate(date?: Date | null): void {
    if (!date) {
      return;
    }

    const currentDate = new Date();

    const dateWithoutTime = new Date(date.setHours(0, 0, 0, 0));
    const currentWithoutTime = new Date(currentDate.setHours(0, 0, 0, 0));

    const isEqualOrFuture =
      dateWithoutTime.getTime() >= currentWithoutTime.getTime();

    this.validateAllOrThrow(
      [!isEqualOrFuture],
      () => new InvalidAnalysisToolClientBirthDateError(),
    );
  }
}
