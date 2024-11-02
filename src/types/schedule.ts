export interface Schedule {
  id: number;
  title: string;
  description?: string;
  start: string;
  end: string;
  type: "event" | "meeting" | "worship" | "other";
  location?: string;
  allDay: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ScheduleFormData = Omit<Schedule, "id" | "createdAt" | "updatedAt">;

export interface CalendarViewState {
  view: "month" | "week" | "day";
  date: Date;
}
