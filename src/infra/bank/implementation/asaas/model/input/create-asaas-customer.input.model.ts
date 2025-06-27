import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CreateAsaasCustomerInputModel extends BaseBuildableObject {
  public name: string;
  public email: string;
  public mobilePhone: string;
  public cpfCnpj: string;

  protected override readonly _type = CreateAsaasCustomerInputModel.name;
}
