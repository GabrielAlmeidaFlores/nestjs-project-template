import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AccidentAssistanceTerminatedQueryRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated/query/accident-assistance-terminated.query.repository.gateway';
import { AccidentAssistanceTerminatedPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/repository/accident-assistance-terminated-period/command/accident-assistance-terminated-period.command.repository.gateway';
import { AccidentAssistanceTerminatedId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated/value-object/accident-assistance-terminated-id/accident-assistance-terminated-id.value-object';
import { AccidentAssistanceTerminatedPeriodEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/accident-assistance-terminated-period.entity';
import { CreateAccidentAssistanceTerminatedPeriodRequestDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/request/create-accident-assistance-terminated-period.request.dto';
import { CreateAccidentAssistanceTerminatedPeriodResponseDto } from '@module/customer/analysis-tool/module/accident-assistance-terminated/dto/response/create-accident-assistance-terminated-period.response.dto';
import { AccidentAssistanceTerminatedNotFoundError } from '@module/customer/analysis-tool/module/accident-assistance-terminated/error/accident-assistance-terminated-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateAccidentAssistanceTerminatedPeriodUseCase {
  protected readonly _type =
    CreateAccidentAssistanceTerminatedPeriodUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedQueryRepositoryGateway)
    private readonly accidentAssistanceTerminatedQueryRepositoryGateway: AccidentAssistanceTerminatedQueryRepositoryGateway,
    @Inject(AccidentAssistanceTerminatedPeriodCommandRepositoryGateway)
    private readonly accidentAssistanceTerminatedPeriodCommandRepositoryGateway: AccidentAssistanceTerminatedPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    accidentAssistanceTerminatedId: AccidentAssistanceTerminatedId,
    dto: CreateAccidentAssistanceTerminatedPeriodRequestDto,
  ): Promise<CreateAccidentAssistanceTerminatedPeriodResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.accidentAssistanceTerminatedQueryRepositoryGateway.findOneAccidentAssistanceTerminatedByIdOrFail(
      accidentAssistanceTerminatedId,
      AccidentAssistanceTerminatedNotFoundError,
    );

    const period = new AccidentAssistanceTerminatedPeriodEntity({
      sequencial: dto.sequencial,
      periodName: dto.periodName,
      periodStart: dto.periodStart,
      ...(dto.periodEnd !== undefined && { periodEnd: dto.periodEnd }),
      category: dto.category,
      isPendency: dto.isPendency,
      competenceBelowTheMinimum: dto.competenceBelowTheMinimum,
      ...(dto.contributionAverage !== undefined && {
        contributionAverage: dto.contributionAverage,
      }),
      typeOfContribution: dto.typeOfContribution,
      status: dto.status,
    });

    const createPeriodTransaction =
      this.accidentAssistanceTerminatedPeriodCommandRepositoryGateway.createAccidentAssistanceTerminatedPeriod(
        accidentAssistanceTerminatedId,
        period,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      createPeriodTransaction,
    );
    await transaction.commit();

    return CreateAccidentAssistanceTerminatedPeriodResponseDto.build({
      accidentAssistanceTerminatedPeriodId: period.id,
    });
  }
}
