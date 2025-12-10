import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsRemunerationCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-remuneration/command/retirement-planning-rpps-remuneration.command.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { RetirementPlanningRppsRemunerationEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/retirement-planning-rpps-remuneration.entity';
import { RetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration/value-object/retirement-planning-rpps-remuneration-id.value-object';
import { CreateRetirementPlanningRppsRemunerationRequestDto } from '@module/customer/analysis-tool/dto/request/create-retirement-planning-rpps-remuneration-request.dto';
import { CreateRetirementPlanningRppsRemunerationResponseDto } from '@module/customer/analysis-tool/dto/response/create-retirement-planning-rpps-remuneration.response.dto';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';

@Injectable()
export class CreateRetirementPlanningRppsRemunerationUseCase {
  protected readonly _type =
    CreateRetirementPlanningRppsRemunerationUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsRemunerationCommandRepositoryGateway)
    private readonly retirementPlanningRppsRemunerationCommandRepositoryGateway: RetirementPlanningRppsRemunerationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    retirementPlanningRppsId: RetirementPlanningRppsId,
    dto: CreateRetirementPlanningRppsRemunerationRequestDto,
  ): Promise<CreateRetirementPlanningRppsRemunerationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRpps =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRppsNotFoundError,
      );

    const transactionOperations = [];

    for (const remunerationDto of dto.remunerations) {
      const normalizedDateToDayOne = new Date(
        remunerationDto.date.getFullYear(),
        remunerationDto.date.getMonth(),
        1,
      );

      const remunerationEntity = new RetirementPlanningRppsRemunerationEntity({
        id: new RetirementPlanningRppsRemunerationId(),
        date: normalizedDateToDayOne,
        amount: remunerationDto.amount,
        retirementPlanningRpps,
      });

      transactionOperations.push(
        this.retirementPlanningRppsRemunerationCommandRepositoryGateway.createRetirementPlanningRppsRemuneration(
          remunerationEntity,
        ),
      );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionOperations,
    );
    await transaction.commit();

    return CreateRetirementPlanningRppsRemunerationResponseDto.build({
      retirementPlanningRppsId: retirementPlanningRpps.id,
    });
  }
}
