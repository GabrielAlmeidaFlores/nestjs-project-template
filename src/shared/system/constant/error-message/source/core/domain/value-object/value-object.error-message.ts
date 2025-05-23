import { InvalidEmailError } from '@core/domain/schema/value-object/email/error/invalid-email.error';
import { InvalidFederalDocumentError } from '@core/domain/schema/value-object/federal-document/error/invalid-federal-document.error';
import { InvalidGuidError } from '@core/domain/schema/value-object/guid/error/invalid-guid.error';
import { InvalidPhoneNumberError } from '@core/domain/schema/value-object/phone-number/error/invalid-phone-number.error';
import { InvalidPostalCodeError } from '@core/domain/schema/value-object/postal-code/error/invalid-postal-code.error';
import { InvalidUrlError } from '@core/domain/schema/value-object/url/error/invalid-url.error';
import { ErrorMessageOutputModel } from '@shared/system/constant/error-message/model/output/error-message.output.model';

export const valueObjectErrorMessage = {
  [InvalidGuidError.name]: new ErrorMessageOutputModel({
    default: 'O id informado não é válido',
  }),
  [InvalidEmailError.name]: new ErrorMessageOutputModel({
    default: 'O email informado não é válido',
  }),
  [InvalidFederalDocumentError.name]: new ErrorMessageOutputModel({
    default: 'O documento informado não é válido',
  }),
  [InvalidPhoneNumberError.name]: new ErrorMessageOutputModel({
    default: 'O número de celular informado não é válido',
  }),
  [InvalidPostalCodeError.name]: new ErrorMessageOutputModel({
    default: 'O CEP informado não é válido',
  }),
  [InvalidUrlError.name]: new ErrorMessageOutputModel({
    default: 'A URL informada não é válida',
  }),
} as const;
