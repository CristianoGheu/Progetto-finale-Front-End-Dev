import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ChartOptions } from 'chart.js';
import { Co2, DataSet } from '../../model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-co2',
  standalone: false,
  templateUrl: './co2.component.html',
  styleUrls: ['./co2.component.css', '../../styles/charts.css']
})
export class Co2Component implements OnInit {

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getCo2Data();
    this.createChartGradient();
  }

  co2!: Co2[];
  co2Data: any

  dataSet!: DataSet[] 
  labels!: number[]

  chartColor = '#9b59b6'
  gradientFill: any;
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Part per million (ppm)',
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
  }

  errorMessage: Error | null = null

  getCo2Data() {
    this.httpService.getCo2()
    .pipe(
      catchError((error) => {
        this.errorMessage = error;
        return [];
      })
    )
    .subscribe((data) => {
      this.co2Data = data;
      this.co2 = this.co2Data.co2;
      this.labels = this.co2.map((e: Co2) => e.year);
      this.dataSet = [{
        data: this.co2.map((e: Co2) => e.trend), label: 'Carbon Dioxide',
        fill: true,
        backgroundColor: this.gradientFill, 
        borderColor: this.chartColor,
        pointBackgroundColor: this.chartColor,
        borderWidth: 0,
        pointRadius: 3,
        pointHoverRadius: 7,
        tension: 0.1,
        }];
      console.log(this.co2);
    });
  }

  createChartGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(52, 152, 219, 0.4)'); 
      gradient.addColorStop(1, 'rgba(52, 152, 219, 0)');
      this.gradientFill = gradient;
    }
  }  
}
