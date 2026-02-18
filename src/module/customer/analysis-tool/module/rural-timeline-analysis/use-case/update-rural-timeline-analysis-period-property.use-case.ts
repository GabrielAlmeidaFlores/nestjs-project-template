import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/command/rural-timeline-analysis-period-property.command.repository.gateway';
import { RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/query/rural-timeline-analysis-period-property.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import { UpdateRuralTimelineAnalysisPeriodPropertyRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-property.request.dto';
import { UpdateRuralTimelineAnalysisPeriodPropertyResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-property.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodPropertyNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-property-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisPeriodPropertyUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisPeriodPropertyUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodPropertyQueryRepositoryGateway: RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodPropertyCommandRepositoryGateway: RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    _periodId: RuralTimelineAnalysisPeriodId,
    propertyId: RuralTimelineAnalysisPeriodPropertyId,
    dto: UpdateRuralTimelineAnalysisPeriodPropertyRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodPropertyResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    );

    const existingProperty =
      await this.ruralTimelineAnalysisPeriodPropertyQueryRepositoryGateway.findOneById(
        propertyId,
      );

    if (existingProperty === null) {
      throw new RuralTimelineAnalysisPeriodPropertyNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisPeriodPropertyEntity({
      id: propertyId,
      propertyName: dto.propertyName ?? existingProperty.propertyName,
      ownerName: dto.ownerName ?? existingProperty.ownerName,
      postalCode: dto.postalCode ?? existingProperty.postalCode,
      stateCode: dto.stateCode ?? existingProperty.stateCode,
      city: dto.city ?? existingProperty.city,
      neighborhood: dto.neighborhood ?? existingProperty.neighborhood,
      street: dto.street ?? existingProperty.street,
      streetNumber: dto.streetNumber ?? existingProperty.streetNumber,
      landOwnershipType:
        dto.landOwnershipType ?? existingProperty.landOwnershipType,
      createdAt: existingProperty.createdAt,
      updatedAt: existingProperty.updatedAt,
      deletedAt: existingProperty.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisPeriodPropertyCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodProperty(
        updatedEntity,
      ),
    );

    await transaction.commit();

    const response = new UpdateRuralTimelineAnalysisPeriodPropertyResponseDto();
    response.success = true;

    return response;
  }
}
