import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CreateAsaasCustomerOutputModel extends BaseBuildableObject {
  public id: string;
  public name: string;
  public email: string;
  public mobilePhone: string;
  public cpfCnpj: string;

  protected override readonly _type = CreateAsaasCustomerOutputModel.name;
}
