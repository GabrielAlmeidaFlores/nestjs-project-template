import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';

@CustomerControllerRoute('legal-proceeding')
export class LegalProceedingController {
  protected readonly _type = LegalProceedingController.name;
}
