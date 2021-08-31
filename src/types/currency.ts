export interface Currency {
  timestamp: number;
  source: string;
  quotes: { [key: string]: number };
}

export interface CurrencyTime {
  value: number;
  timestamp: number;
}
