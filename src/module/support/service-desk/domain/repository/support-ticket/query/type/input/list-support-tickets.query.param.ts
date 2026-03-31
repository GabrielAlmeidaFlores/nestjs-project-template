import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export type ListSupportTicketsQueryParamType = {
  page: number;
  limit: number;
  supportType: SupportTypeEnum;
  status: SupportTicketStatusEnum | null;
  search: string | null;
  startDate: Date | null;
  endDate: Date | null;
};
