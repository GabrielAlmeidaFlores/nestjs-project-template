import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/result/get-general-urban-retirement-grant-time-accelerator.query.result';
import { GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/general-urban-retirement-grant-time-accelerator.query.repository.gateway';
import { ListGeneralUrbanRetirementGrantTimeAcceleratorRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/list-general-urban-retirement-grant-time-accelerator.request.dto';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/get-general-urban-retirement-grant-time-accelerator.response.dto';
import { ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/list-general-urban-retirement-grant-time-accelerator.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListGeneralUrbanRetirementGrantTimeAcceleratorUseCase {
  protected readonly _type =
    ListGeneralUrbanRetirementGrantTimeAcceleratorUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway)
    private readonly generalUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway: GeneralUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    dto: ListGeneralUrbanRetirementGrantTimeAcceleratorRequestDto,
  ): Promise<ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const acceleratorTimes =
      await this.generalUrbanRetirementGrantTimeAcceleratorQueryRepositoryGateway.findByGeneralUrbanRetirementGrantId(
        dto.generalUrbanRetirementGrantId,
      );

    const resource = acceleratorTimes.map((item) =>
      GetGeneralUrbanRetirementGrantTimeAcceleratorResponseDto.build({
        ...item,
        contributionTime: JSON.stringify(
          this.totalWorkPeriod(item.periodStart, item.periodEnd),
        ),
      }),
    );

    const total = this.totalWorkPeriodFromArray(acceleratorTimes);

    const totalItems = resource.length;
    return ListGeneralUrbanRetirementGrantTimeAcceleratorResponseDto.build({
      resource,
      total,
      page: 1,
      limit: totalItems || 1,
      totalItems,
      totalPages: 1,
      amountItemsCurrentPage: totalItems,
    });
  }

  private totalWorkPeriod(
    startDate?: Date | string | number | null,
    endDate?: Date | string | number | null,
  ): { years: number; months: number; days: number } {
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
    items: GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult[],
  ): { years: number; months: number; days: number } {
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

  private toDate(
    d?: Date | string | number | null,
  ): Date | null {
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
