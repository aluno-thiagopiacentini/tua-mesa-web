export interface WaintingLine {
  id: number;
  name: string;
  company_id: string;
  status: string;
  is_priority: string;
  created_at: Date;
  updated_at: Date;
  qty_total: number;
  max_waiting_minutes: Date;
}
