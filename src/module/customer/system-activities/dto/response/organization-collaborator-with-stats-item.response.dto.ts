import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class OrganizationCollaboratorWithStatsItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationMemberId)
  public organizationMemberId: OrganizationMemberId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoValueObjectProperty(Email)
  public email: Email;

  @ResponseDtoValueObjectProperty(FederalDocument)
  public federalDocument: FederalDocument;

  @ResponseDtoDateProperty()
  public registrationDate: Date;

  @ResponseDtoNumberProperty({
    description:
      'Quantidade de peças (legal_pleading) criadas pelo colaborador.',
  })
  public legalPleadingCount: number;

  @ResponseDtoNumberProperty({
    description:
      'Quantidade de registros de análise (analysis_tool_record) criados pelo colaborador.',
  })
  public analysisToolRecordCount: number;

  protected override readonly _type =
    OrganizationCollaboratorWithStatsItemResponseDto.name;
}
