import { CustomerController } from '@shared/api/decorator/class/controller-routing/customer-controller.decorator';

@CustomerController('auth')
export class AuthController {
  protected readonly _type = AuthController.name;
}
