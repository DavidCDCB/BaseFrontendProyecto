export interface IPayroll {
	id: number;
  starDate: string;
  endDate: string;
  description: string;
  accruals: number;
  deductions: number;
  settlement: number;
}
