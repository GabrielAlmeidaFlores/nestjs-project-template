import { Inject, Injectable } from '@nestjs/common';

import { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { DisabilityRetirementPlanningQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/disability-retirement-planning.query.repository.gateway';
import { DisabilityRetirementPlanningRemunerationQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/disability-retirement-planning-remuneration.query.repository.gateway';
import { GetDisabilityRetirementPlanningRemunerationListQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning-remuneration/query/result/get-disability-retirement-planning-remuneration-list.query.result';
import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { ListDisabilityRetirementPlanningRemunerationRequestDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/request/list-disability-retirement-planning-remuneration.request.dto';
import { GetDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/get-disability-retirement-planning-remuneration.response.dto';
import { ListDisabilityRetirementPlanningRemunerationResponseDto } from '@module/customer/analysis-tool/module/disability-retirement-planning/dto/response/list-disability-retirement-planning-remuneration.response.dto';
import { DisabilityRetirementPlanningNotFoundError } from '@module/customer/analysis-tool/module/disability-retirement-planning/error/disability-retirement-planning-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

const PLANO_REAL_START_DATE = '1994-07-01T00:00:00';
const MONTH_KEY_PAD_LENGTH = 2;

@Injectable()
export class ListDisabilityRetirementPlanningRemunerationUseCase {
  protected readonly _type =
    ListDisabilityRetirementPlanningRemunerationUseCase.name;

  private readonly planoRealStartDate: Date;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningQueryRepositoryGateway: DisabilityRetirementPlanningQueryRepositoryGateway,
    @Inject(DisabilityRetirementPlanningRemunerationQueryRepositoryGateway)
    private readonly disabilityRetirementPlanningRemunerationQueryRepositoryGateway: DisabilityRetirementPlanningRemunerationQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
  ) {
    this.planoRealStartDate = new Date(PLANO_REAL_START_DATE);
  }

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
    dto: ListDisabilityRetirementPlanningRemunerationRequestDto,
  ): Promise<ListDisabilityRetirementPlanningRemunerationResponseDto> {
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

    const remunerations =
      await this.disabilityRetirementPlanningRemunerationQueryRepositoryGateway.findByDisabilityRetirementPlanningId(
        disabilityRetirementPlanningId,
      );

    const remunerationByMonthKey = this.buildRemunerationMap(remunerations);
    const allMonths = this.generateMonthRange(
      this.planoRealStartDate,
      new Date(),
    );
    const allResources = allMonths.map((month) => {
      const existing = remunerationByMonthKey.get(this.monthKey(month));

      if (!existing) {
        return GetDisabilityRetirementPlanningRemunerationResponseDto.build({
          remunerationDate: month,
        });
      }

      const remunerationDetail =
        this.remunerationCalculatorGateway.calculateRemuneration(
          RemunerationDataInputModel.build({
            remunerationDate: existing.remunerationDate,
            remunerationAmount: new DecimalValue(existing.remunerationAmount),
          }),
        );

      return GetDisabilityRetirementPlanningRemunerationResponseDto.build({
        remunerationDate: existing.remunerationDate,
        remunerationAmount: existing.remunerationAmount,
        correctionFactor: remunerationDetail.correctionFactor,
        updatedRemunerationAmount: remunerationDetail.updatedRemunerationAmount,
      });
    });

    const startIndex = (dto.page - 1) * dto.limit;
    const paginatedResource = allResources.slice(
      startIndex,
      startIndex + dto.limit,
    );

    return ListDisabilityRetirementPlanningRemunerationResponseDto.build({
      ...new ListDataOutputModel({
        page: dto.page,
        limit: dto.limit,
        totalItems: allResources.length,
        resource: paginatedResource,
      }),
    });
  }

  private buildRemunerationMap(
    remunerations: GetDisabilityRetirementPlanningRemunerationListQueryResult[],
  ): Map<string, GetDisabilityRetirementPlanningRemunerationListQueryResult> {
    const map = new Map<
      string,
      GetDisabilityRetirementPlanningRemunerationListQueryResult
    >();

    for (const remuneration of remunerations) {
      map.set(this.monthKey(remuneration.remunerationDate), remuneration);
    }

    return map;
  }

  private monthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(MONTH_KEY_PAD_LENGTH, '0')}`;
  }

  private generateMonthRange(startDate: Date, endDate: Date): Date[] {
    const months: Date[] = [];
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    while (current <= end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }
}
