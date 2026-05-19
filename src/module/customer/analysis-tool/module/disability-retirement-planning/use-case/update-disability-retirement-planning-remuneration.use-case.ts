import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/command/disability-retirement-planning-remuneration.command.repository.gateway';
import { DisabilityRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/disability-retirement-planning-remuneration.query.repository.gateway';
import { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { DisabilityRetirementPlanningRemunerationEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.entity';
import { UpdateDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/update-disability-retirement-planning-remuneration.request.dto';
import { UpdateDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/update-disability-retirement-planning-remuneration.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { DisabilityRetirementPlanningRemunerationCalculationNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-remuneration-calculation-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateDisabilityRetirementPlanningRemunerationUseCase {
  protected readonly _type =
    UpdateDisabilityRetirementPlanningRemunerationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRemunerationQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRemunerationQueryRepositoryGateway: DisabilityRetirementPlanningRemunerationQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRemunerationCommandRepositoryGateway)
    private readonly disabilityRetirementPlanningRemunerationCommandRepositoryGateway: DisabilityRetirementPlanningRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    dto: UpdateDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<UpdateDisabilityRetirementPlanningRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const planning =
      await this.disabilityRetirementPlanningQueryRepositoryGateway.findOneDisabilityRetirementPlanningByIdWithRelations(
        disabilityRetirementPlanningId,
      );

    if (!planning) {
      throw new DisabilityRetirementPlanningNotFoundError();
    }

    const disabilityRetirementPlanningEntity =
      new DisabilityRetirementPlanningEntity({
        id: disabilityRetirementPlanningId,
        currentPosition: planning.currentPosition,
        federativeEntity: planning.federativeEntity,
        state: planning.state,
        municipality: planning.municipality,
        longTimeDisability: planning.longTimeDisability,
        publicServiceStartDate: planning.publicServiceStartDate,
        careerStartDate: planning.careerStartDate,
        analysisName: planning.analysisName,
      });

    const existingRemunerations =
      await this.disabilityRetirementPlanningRemunerationQueryRepositoryGateway.findByDisabilityRetirementPlanningId(
        disabilityRetirementPlanningId,
      );

    const transactionOperations: TransactionType[] = [];

    for (const existing of existingRemunerations) {
      transactionOperations.push(
        this.disabilityRetirementPlanningRemunerationCommandRepositoryGateway.deleteDisabilityRetirementPlanningRemuneration(
          existing.id,
        ),
      );
    }

    for (const remunerationDto of dto.remunerations) {
      const normalizedDateToDayOne = new Date(
        remunerationDto.remunerationDate.getFullYear(),
        remunerationDto.remunerationDate.getMonth(),
        1,
      );

      const remunerationEntity =
        new DisabilityRetirementPlanningRemunerationEntity({
          disabilityRetirementPlanning: disabilityRetirementPlanningEntity,
          remunerationDate: normalizedDateToDayOne,
          remunerationAmount: remunerationDto.remunerationAmount,
        });

      transactionOperations.push(
        this.disabilityRetirementPlanningRemunerationCommandRepositoryGateway.createDisabilityRetirementPlanningRemuneration(
          remunerationEntity,
        ),
      );
    }

    if (transactionOperations.length === 0) {
      throw new DisabilityRetirementPlanningRemunerationCalculationNotFoundError();
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );

    await transaction.commit();

    return UpdateDisabilityRetirementPlanningRemunerationResponseDto.build({
      disabilityRetirementPlanningId: planning.id,
    });
  }
}
