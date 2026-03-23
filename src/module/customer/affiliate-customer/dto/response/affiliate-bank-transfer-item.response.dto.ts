import { AffiliateBankTransferId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/value-object/affiliate-bank-transfer-id/affiliate-bank-transfer-id.value-object';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { OrganizationPaymentPlanAffiliateCommissionId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/value-object/organization-payment-plan-affiliate-commission-id/organization-payment-plan-affiliate-commission-id.value-object';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';
import { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AffiliateBankTransferItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(AffiliateBankTransferId)
  public id: AffiliateBankTransferId;

  @ResponseDtoValueObjectProperty(OrganizationPaymentPlanAffiliateCommissionId)
  public affiliatePlanCommissionId: OrganizationPaymentPlanAffiliateCommissionId;

  @ResponseDtoValueObjectProperty(BankPaymentId)
  public bankPaymentId: BankPaymentId;

  @ResponseDtoValueObjectProperty(BankTransferId)
  public bankTransferId: BankTransferId;

  @ResponseDtoStringProperty({ required: false })
  public bankExternalId?: string;

  @ResponseDtoNumberProperty()
  public amount: number;

  @ResponseDtoEnumProperty(TransferStatusEnum)
  public status: TransferStatusEnum;

  @ResponseDtoStringProperty()
  public pixAddressKey: string;

  @ResponseDtoEnumProperty(PixAddressKeyTypeEnum)
  public pixAddressKeyType: PixAddressKeyTypeEnum;

  @ResponseDtoDateProperty({ required: false })
  public transferDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public description?: string;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = AffiliateBankTransferItemResponseDto.name;
}
