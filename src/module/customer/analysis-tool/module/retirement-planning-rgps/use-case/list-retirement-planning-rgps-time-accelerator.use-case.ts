import { Inject } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { ListRetirementPlanningRgpsTimeAcceleratorQueryParam } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/param/list-retirement-planning-rgps-time-accelerator.query.param';
import { GetRetirementPlanningRgpsTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/result/get-retirement-planning-rgps-time-accelerator.query.result';
import { RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-time-accelerator/query/retirement-planning-rgps-time-accelerator.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { ListRetirementPlanningRgpsTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/list-retirement-planning-rgps-time-accelerator.request.dto';
import { GetRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/get-retirement-planning-rgps-time-accelerator.response.dto';
import { ListRetirementPlanningRgpsTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/list-retirement-planning-rgps-time-accelerator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
export class ListRetirementPlanningRgpsTimeAcceleratorUseCase {
  protected readonly _type =
    ListRetirementPlanningRgpsTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway)
    private readonly retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway: RetirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListRetirementPlanningRgpsTimeAcceleratorRequestDto,
  ): Promise<ListRetirementPlanningRgpsTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }
    const listParam = new ListRetirementPlanningRgpsTimeAcceleratorQueryParam({
      ...dto,
      retirementPlanningRgps: dto.retirementPlanningRgpsId,
    });

    const listQueryResult =
      await this.retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway.listByRetirementPlanningRgpsId(
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        listParam,
      );

    const resource = listQueryResult.resource.map((item) =>
      GetRetirementPlanningRgpsTimeAcceleratorResponseDto.build({
        ...item,
        contributionTime: JSON.stringify(
          this.totalWorkPeriod(item.periodStart, item.periodEnd),
        ),
      }),
    );
    const acceleratorTimes =
      await this.retirementPlanningRgpsTimeAcceleratorQueryRepositoryGateway.findByRetirementPlanningRgpsId(
        dto.retirementPlanningRgpsId,
      );

    const total = this.totalWorkPeriodFromArray(acceleratorTimes);

    return ListRetirementPlanningRgpsTimeAcceleratorResponseDto.build({
      ...listQueryResult,
      resource,
      total,
    });
  }

  private totalWorkPeriod(
    startDate?: Date | string | number | null,
    endDate?: Date | string | number | null,
  ): {
    years: number;
    months: number;
    days: number;
  } {
    const s = this.toDate(startDate);
    const e = this.toDate(endDate);
    const MONTHS_IN_YEAR = 12;
    const THIRTY_DAYS = 30;
    const THIRTY_ONES_DAYS = 31;
    const FEBRUARY_DAYS = 28;
    const LEAP_FEBRUARY_DAYS = 29;

    if (!s || !e) {
      return { years: 0, months: 0, days: 0 };
    }

    const inclusiveEnd = new Date(e);
    inclusiveEnd.setDate(inclusiveEnd.getDate() + 1);

    const startYear = s.getFullYear();
    const startMonth = s.getMonth();
    const startDay = s.getDate();

    const endYear = inclusiveEnd.getFullYear();
    const endMonth = inclusiveEnd.getMonth();
    const endDay = inclusiveEnd.getDate();

    let years = endYear - startYear;
    let months = endMonth - startMonth;
    let days = endDay - startDay;

    if (days < 0) {
      months--;

      const previousMonth = (endMonth - 1 + MONTHS_IN_YEAR) % MONTHS_IN_YEAR;
      const yearOfPreviousMonth = endMonth === 0 ? endYear - 1 : endYear;

      const LEAP_YEAR_DIVISOR = 4;
      const CENTURY_DIVISOR = 100;
      const QUADRICENTENNIAL_DIVISOR = 400;

      const isLeapYear =
        (yearOfPreviousMonth % LEAP_YEAR_DIVISOR === 0 &&
          yearOfPreviousMonth % CENTURY_DIVISOR !== 0) ||
        yearOfPreviousMonth % QUADRICENTENNIAL_DIVISOR === 0;

      const daysInPreviousMonth =
        [
          THIRTY_ONES_DAYS,
          isLeapYear ? LEAP_FEBRUARY_DAYS : FEBRUARY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
          THIRTY_DAYS,
          THIRTY_ONES_DAYS,
        ][previousMonth] ?? THIRTY_ONES_DAYS;

      days += daysInPreviousMonth;
    }

    if (months < 0) {
      years--;
      months += MONTHS_IN_YEAR;
    }

    return { years, months, days };
  }

  private totalWorkPeriodFromArray(
    items: GetRetirementPlanningRgpsTimeAcceleratorQueryResult[],
  ): {
    years: number;
    months: number;
    days: number;
  } {
    let totalYears = 0;
    let totalMonths = 0;
    let totalDays = 0;

    for (const item of items) {
      const period = this.totalWorkPeriod(item.periodStart, item.periodEnd);
      totalYears += period.years;
      totalMonths += period.months;
      totalDays += period.days;
    }

    const DAYS_IN_MONTH_APPROX = 30;
    const MONTHS_IN_YEAR = 12;

    totalMonths += Math.floor(totalDays / DAYS_IN_MONTH_APPROX);
    totalDays = totalDays % DAYS_IN_MONTH_APPROX;

    totalYears += Math.floor(totalMonths / MONTHS_IN_YEAR);
    totalMonths = totalMonths % MONTHS_IN_YEAR;

    return { years: totalYears, months: totalMonths, days: totalDays };
  }

  private toDate(d?: Date | string | number | null): Date | null {
    if (d === undefined || d === null) {
      return null;
    }
    if (d instanceof Date) {
      return isNaN(d.getTime()) ? null : d;
    }
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
}
