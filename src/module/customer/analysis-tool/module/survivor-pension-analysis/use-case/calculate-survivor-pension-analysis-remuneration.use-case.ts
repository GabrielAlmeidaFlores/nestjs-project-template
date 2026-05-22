import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { CalculateSurvivorPensionAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/request/calculate-survivor-pension-analysis-remuneration.request.dto';
import { CalculateSurvivorPensionAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/calculate-survivor-pension-analysis-remuneration.response.dto';
import { SurvivorPensionAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/survivor-pension-analysis/dto/response/survivor-pension-analysis-remuneration.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CalculateSurvivorPensionAnalysisRemunerationUseCase {
  protected readonly _type =
    CalculateSurvivorPensionAnalysisRemunerationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: CalculateSurvivorPensionAnalysisRemunerationRequestDto,
  ): Promise<CalculateSurvivorPensionAnalysisRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const remunerations = dto.remunerations.map((remuneration) =>
      RemunerationDataInputModel.build({
        remunerationDate: remuneration.remunerationDate,
        remunerationAmount: new DecimalValue(remuneration.remunerationAmount),
      }),
    );
    const calculation =
      this.remunerationCalculatorGateway.calculate(remunerations);
    const remunerationDetails = remunerations.map((remuneration) =>
      this.remunerationCalculatorGateway.calculateRemuneration(remuneration),
    );

    return CalculateSurvivorPensionAnalysisRemunerationResponseDto.build({
      ...calculation,
      remunerations: remunerationDetails.map((remuneration) =>
        SurvivorPensionAnalysisRemunerationResponseDto.build({
          remunerationDate: remuneration.remunerationDate,
          remunerationAmount: remuneration.remunerationAmount,
          correctionFactor: remuneration.correctionFactor,
          updatedRemunerationAmount: remuneration.updatedRemunerationAmount,
        }),
      ),
    });
  }
}
