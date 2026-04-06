import { AffiliateBankTransferItemResponseDto } from '@module/customer/affiliate-customer/dto/response/affiliate-bank-transfer-item.response.dto';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { ListDataResponseDto } from '@shared/api/util/dto/response/list-data.response.dto';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AffiliateCommissionItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(OrganizationPaymentPlanAffiliateCommissionId)
  public id: OrganizationPaymentPlanAffiliateCommissionId;

  @ResponseDtoValueObjectProperty(OrganizationPaymentPlanId)
  public organizationPaymentPlanId: OrganizationPaymentPlanId;

  @ResponseDtoStringProperty()
  public planName: string;

  @ResponseDtoNumberProperty()
  public planValue: number;

  @ResponseDtoStringProperty({ required: false })
  public customerName?: string;

  @ResponseDtoStringProperty({ required: false })
  public customerEmail?: string;

  @ResponseDtoNumberProperty()
  public commissionPercentage: number;

  @ResponseDtoNumberProperty()
  public discountPercentage: number;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  @ResponseDtoObjectProperty(() => AffiliateBankTransferItemResponseDto, {
    required: false,
  })
  public transfer?: AffiliateBankTransferItemResponseDto;

  protected override readonly _type = AffiliateCommissionItemResponseDto.name;
}

@ResponseDto()
export class ListMyAffiliateCommissionsResponseDto extends ListDataResponseDto<AffiliateCommissionItemResponseDto> {
  @ResponseDtoObjectProperty(() => AffiliateCommissionItemResponseDto, {
    isArray: true,
  })
  public override resource: AffiliateCommissionItemResponseDto[];

  protected override readonly _type =
    ListMyAffiliateCommissionsResponseDto.name;
}
