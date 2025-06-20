import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateAsaasCustomerOutputModel {
  public id: string;
  public name: string;
  public email: string;
  public mobilePhone: string;
  public cpfCnpj: string;

  protected readonly _type = CreateAsaasCustomerOutputModel.name;

  public constructor(
    props: PublicPropertyType<CreateAsaasCustomerOutputModel>,
  ) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.mobilePhone = props.mobilePhone;
    this.cpfCnpj = props.cpfCnpj;
  }
}
