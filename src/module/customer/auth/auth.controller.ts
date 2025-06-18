import { CustomerController } from '@shared/api/decorator/class/controller-routing/customer-controller.decorator';

@CustomerController('auth')
export class AuthController {
  protected readonly _type = AuthController.name;

  // @BuildEndpointSpecification({
  //   summary: 'Customer signup',
  //   secure: false,
  //   http: {
  //     path: 'sign-up',
  //     method: RequestMethod.POST,
  //   },
  //   successResponse: {
  //     statusCode: HttpStatus.NO_CONTENT,
  //     description: 'Customer signed up successfully',
  //   },
  // })
  // public async signUp(@Body() dto: SignUpRequestDto): Promise<void> {
  //   return await this.signUpUseCase.execute(dto);
  // }
}
