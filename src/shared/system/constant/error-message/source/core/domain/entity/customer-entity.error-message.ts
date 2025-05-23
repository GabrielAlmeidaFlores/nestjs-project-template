import { InvalidCustomerNameError } from '@core/domain/schema/entity/customer/error/invalid-customer-name.error';
import { InvalidCustomerPasswordError } from '@core/domain/schema/entity/customer/error/invalid-custommer-password.error';
import { ErrorMessageOutputModel } from '@shared/system/constant/error-message/model/output/error-message.output.model';

export const customerEntityErrorMessage = {
  [InvalidCustomerNameError.name]: new ErrorMessageOutputModel({
    default: 'O nome informado não é válido',
  }),
  [InvalidCustomerPasswordError.name]: new ErrorMessageOutputModel({
    default: 'A senha informada não é válida',
  }),
};
