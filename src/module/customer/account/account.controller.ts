import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';

@CustomerControllerRoute('account')
export class AccountController {
  protected readonly _type = AccountController.name;
}
