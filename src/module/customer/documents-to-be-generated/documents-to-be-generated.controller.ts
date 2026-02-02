import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';

@CustomerControllerRoute('documents-to-be-generated')
export class DocumentsToBeGeneratedController {
  protected readonly _type = DocumentsToBeGeneratedController.name;
}
