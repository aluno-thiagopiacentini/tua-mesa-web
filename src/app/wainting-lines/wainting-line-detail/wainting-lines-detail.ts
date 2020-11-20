interface WaintingLines {
  cancelled_at: Date;
  completed_at: Date;
  customer_id: number;
  customer_name: string;
  customer_phone_number: string;
  first_call_at: Date;
  id: number;
  joined_at: Date;
  second_call_at: Date;
  status: number;
  waiting_line_id: number;
}

interface Summary {
    max_waiting_minutes: number;
    qty_total: number;
}

export interface WaintingLinesDetail {
  data: WaintingLines[];
  summary: Summary;
}

interface Customer {
  id: NumberConstructor;
}

export interface NextCustomer {
  data: Customer;
}