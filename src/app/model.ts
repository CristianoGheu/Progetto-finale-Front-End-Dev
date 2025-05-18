export interface Temperature {
  time: number;
  station: number;
  land: number;
}
export interface Co2 {
  year: number;
  month: number;
  day: number;
  cycle: number;
  trend: number;
}
export interface Methane {
  date: number;
  average: number;
  trend: number;
  averageUnc: number;
  trendUnc: number;
}
export interface No2 {
  date: number;
  average: number;
  trend: number;
  averageUnc: number;
  trendUnc: number;
}

export interface PolarIce {
  Column1: number
  area: number
  dataType: string
  extent: number
  hemisphere: string
  month: number
  rank: number
  year: number
  value: number
  }

export interface DataSet {
  data: any[]
  label: string
  fill: boolean 
  borderWidth: number
  tension: number
  pointRadius: number
  pointHoverRadius: number
  backgroundColor: string
  borderColor: string
  pointBackgroundColor: string
}