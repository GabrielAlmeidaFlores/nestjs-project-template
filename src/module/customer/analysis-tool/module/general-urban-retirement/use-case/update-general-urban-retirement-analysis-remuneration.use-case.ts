import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GeneralUrbanRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/general-urban-retirement-analysis.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/command/general-urban-retirement-analysis-remuneration.command.repository.gateway';
import { GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/general-urban-retirement-analysis-remuneration.query.repository.gateway';
import { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';
import { GeneralUrbanRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.entity';
import { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';
import { UpdateGeneralUrbanRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/request/update-general-urban-retirement-analysis-remuneration.request.dto';
import { UpdateGeneralUrbanRetirementAnalysisRemunerationResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement/dto/response/update-general-urban-retirement-analysis-remuneration.response.dto';
import { GeneralUrbanRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/general-urban-retirement/error/general-urban-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateGeneralUrbanRetirementAnalysisRemunerationUseCase {
  protected readonly _type =
    UpdateGeneralUrbanRetirementAnalysisRemunerationUseCase.name;

  public constructor(
    @Inject(GeneralUrbanRetirementAnalysisQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisQueryRepositoryGateway: GeneralUrbanRetirementAnalysisQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisRemunerationQueryRepositoryGateway: GeneralUrbanRetirementAnalysisRemunerationQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway)
    private readonly generalUrbanRetirementAnalysisRemunerationCommandRepositoryGateway: GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    generalUrbanRetirementAnalysisId: GeneralUrbanRetirementAnalysisId,
    dto: UpdateGeneralUrbanRetirementAnalysisRemunerationRequestDto,
  ): Promise<UpdateGeneralUrbanRetirementAnalysisRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysis =
      await this.generalUrbanRetirementAnalysisQueryRepositoryGateway.findOneByGeneralUrbanRetirementAnalysisIdAndOrganizationIdWithRelationsOrFail(
        generalUrbanRetirementAnalysisId,
        organizationSessionData.organizationId,
        GeneralUrbanRetirementAnalysisNotFoundError,
      );

    const currentRemunerations =
      await this.generalUrbanRetirementAnalysisRemunerationQueryRepositoryGateway.findByGeneralUrbanRetirementAnalysisIdAndOrganizationIdAndAuthIdentityId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        generalUrbanRetirementAnalysisId,
      );

    const transactionOperations: TransactionType[] = [];

    for (const currentRemuneration of currentRemunerations) {
      transactionOperations.push(
        this.generalUrbanRetirementAnalysisRemunerationCommandRepositoryGateway.deleteGeneralUrbanRetirementAnalysisRemuneration(
          currentRemuneration.id,
        ),
      );
    }

    const analysisEntity = new GeneralUrbanRetirementAnalysisEntity({
      id: analysis.id,
      careerStartDate: analysis.careerStartDate,
      publicServiceStartDate: analysis.publicServiceStartDate,
    });

    for (const remunerationDto of dto.remunerations) {
      const normalizedDateToDayOne = new Date(
        remunerationDto.remunerationDate.getFullYear(),
        remunerationDto.remunerationDate.getMonth(),
        1,
      );

      const remunerationEntity =
        new GeneralUrbanRetirementAnalysisRemunerationEntity({
          id: new GeneralUrbanRetirementAnalysisRemunerationId(),
          remunerationDate: normalizedDateToDayOne,
          remunerationAmount: remunerationDto.remunerationAmount,
          generalUrbanRetirementAnalysis: analysisEntity,
        });

      transactionOperations.push(
        this.generalUrbanRetirementAnalysisRemunerationCommandRepositoryGateway.createGeneralUrbanRetirementAnalysisRemuneration(
          remunerationEntity,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateGeneralUrbanRetirementAnalysisRemunerationResponseDto.build({
      generalUrbanRetirementAnalysisId,
    });
  }
}
