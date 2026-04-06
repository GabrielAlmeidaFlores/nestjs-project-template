import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { SpecialRetirementGrantPeriodObservationCommandRepositoryGateway } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-observation/command/special-retirement-grant-period-observation.command.repository.gateway';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import { SpecialRetirementGrantPeriodObservationEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-observation/special-retirement-grant-period-observation.entity';
import { CreateSpecialRetirementGrantPeriodObservationRequestDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/request/create-special-retirement-grant-period-observation.request.dto';
import { CreateSpecialRetirementGrantPeriodObservationResponseDto } from '@module/customer/analysis-tool/module/special-retirement-grant/dto/response/create-special-retirement-grant-period-observation.response.dto';
import { SpecialRetirementGrantNotFoundError } from '@module/customer/analysis-tool/module/special-retirement-grant/error/special-retirement-grant-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateSpecialRetirementGrantPeriodObservationUseCase {
  protected readonly _type =
    CreateSpecialRetirementGrantPeriodObservationUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(SpecialRetirementGrantPeriodObservationCommandRepositoryGateway)
    private readonly observationCommandRepositoryGateway: SpecialRetirementGrantPeriodObservationCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    specialRetirementGrantId: SpecialRetirementGrantId,
    periodId: SpecialRetirementGrantPeriodId,
    dto: CreateSpecialRetirementGrantPeriodObservationRequestDto,
  ): Promise<CreateSpecialRetirementGrantPeriodObservationResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const record =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsBySpecialRetirementGrantIdAndOrganizationIdAndAuthIdentityIdOrFail(
        specialRetirementGrantId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        SpecialRetirementGrantNotFoundError,
      );

    if (record.specialRetirementGrant === null) {
      throw new SpecialRetirementGrantNotFoundError();
    }

    const grant = new SpecialRetirementGrantEntity({
      ...record.specialRetirementGrant,
      specialRetirementGrantResult: null,
      specialRetirementGrantBenefit: null,
      specialRetirementGrantLegalProceeding: null,
      specialRetirementGrantDocument: null,
      createdBy: record.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const period = new SpecialRetirementGrantPeriodEntity({
      id: periodId,
      specialRetirementGrant: grant,
      shouldConsiderPeriod: true,
      shouldConsiderLastRemunerationAsExitDate: false,
    });

    const observation = new SpecialRetirementGrantPeriodObservationEntity({
      observation: dto.observation,
      specialRetirementGrantPeriod: period,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.observationCommandRepositoryGateway.createSpecialRetirementGrantPeriodObservation(
        observation,
      ),
    ]);
    await transaction.commit();

    return CreateSpecialRetirementGrantPeriodObservationResponseDto.build({
      specialRetirementGrantPeriodObservationId: observation.id,
    });
  }
}
