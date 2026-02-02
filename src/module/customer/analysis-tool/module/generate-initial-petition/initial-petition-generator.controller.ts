import { RequestMethod, HttpStatus, Body } from '@nestjs/common';

import { CreateInitialPetitionGeneratorRequestDto } from '@module/customer/analysis-tool/module/generate-initial-petition/dto/request/create-initial-petition-generator-analysis-result.request.dto';
import { CreateInitialPetitionGeneratorResponseDto } from '@module/customer/analysis-tool/module/generate-initial-petition/dto/response/create-initial-petition-generator-analysis-result.response.dto';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';
import { CreateInitialPetitionGeneratorUseCase } from '@module/customer/analysis-tool/module/generate-initial-petition/use-case/create-initial-petition-generator.use-case';

@CustomerControllerRoute('analysis-tool/generate-initial-petition')
export class GenerateInitialPetitionController {
  protected readonly _type = GenerateInitialPetitionController.name;

  public constructor(
    private readonly createInitialPetitionGeneratorUseCase: CreateInitialPetitionGeneratorUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar análise completa do gerador de petição inicial',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateInitialPetitionGeneratorRequestDto,
    },
    tag: ['gerador-petição-inicial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Análise do gerador de petição inicial criada com sucesso.',
      type: CreateInitialPetitionGeneratorResponseDto,
    },
    guard: [],
  })
  public async createInitialPetitionGenerator(
    @Body()
    dto: CreateInitialPetitionGeneratorRequestDto,
  ): Promise<CreateInitialPetitionGeneratorResponseDto> {
    return await this.createInitialPetitionGeneratorUseCase.execute(
      dto,
    );
  }
}
