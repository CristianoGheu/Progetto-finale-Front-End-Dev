 import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { DataSet, PolarIce } from '../../model';
import { catchError } from 'rxjs';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-polar-ice',
  standalone: false,
  templateUrl: './polar-ice.component.html',
  styleUrls: ['./polar-ice.component.css', '../../styles/charts.css']
})
export class PolarIceComponent implements OnInit {

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getPolarIceData();
    this.createChartGradient();
  }

  polarIce!: PolarIce[]
  polarIceData: any;
  dataSet!: DataSet[]
  labels!: string[]
  chartColor: string= '#1abc9c'
  gradientFill: any;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 10,
        max: 30,
        title: {
          display: true,
          text: 'Million square km',
          color: '#000',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          color: '#000',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  errorMessage: Error | null = null

  getPolarIceData(){
    this.httpService.getPolarIce()
    .pipe(catchError((error) => {
      this.errorMessage = error;
      console.error('Errore durante il recupero dei dati:', error);
      return [];
    }))
    .subscribe((data) => {
      this.polarIceData = data;

      if (this.polarIceData && this.polarIceData.arcticData && this.polarIceData.arcticData.data) {
        this.polarIce = this.polarIceData.arcticData.data;

        const parsedData = Object.entries(this.polarIce).map(([key, value]: [string, any]) => ({
          yearMonth: `${key.slice(0, 4)}-${key.slice(4, 6)}`, 
          value: value.value 
        }));

        this.labels = parsedData.map((item) => item.yearMonth); 
        this.dataSet = [{
          data: parsedData.map((item) => item.value), 
          label: 'Extent', 
          fill: true,
          backgroundColor: this.gradientFill,
          borderColor: this.chartColor,
          pointBackgroundColor: this.chartColor,
          borderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.1,
        }];
      } else {
        this.labels = [];
        this.dataSet = [];
      }
      console.log(this.polarIce);
    });
  }

  createChartGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(26, 188, 156, 0.4)');
      gradient.addColorStop(1, 'rgba(26, 188, 156, 0)');
      this.gradientFill = gradient;
    }
  }
} 
