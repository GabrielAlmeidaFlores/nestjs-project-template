import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateAsaasCustomerInputModel {
  public name: string;
  public email: string;
  public mobilePhone: string;
  public cpfCnpj: string;

  protected readonly _type = CreateAsaasCustomerInputModel.name;

  public constructor(props: PublicPropertyType<CreateAsaasCustomerInputModel>) {
    this.name = props.name;
    this.email = props.email;
    this.mobilePhone = props.mobilePhone;
    this.cpfCnpj = props.cpfCnpj;
  }
}
