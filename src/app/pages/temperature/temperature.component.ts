import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import {  ChartOptions } from 'chart.js';
import { DataSet, Temperature } from '../../model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-temperature',
  standalone: false,
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css', '../../styles/charts.css']
})
export class TemperatureComponent implements OnInit {
  
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTemperatureData();
    this.createChartGradient();
  }

  temp!: Temperature[]
  tempData: any
  labels!: Array<number>
  dataSet!: DataSet[]

  chartColor = '#e74c3c'
  gradientFill: any;

  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: '#000',
          font: {
            size: 14,
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
            size: 14,
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

  errorMessage: Error | null = null;

  getTemperatureData() {
    this.httpService.getTemperature()
    .pipe(
      catchError((error) => {
        this.errorMessage = error;
        return [];
      })
    )
    .subscribe((data) => {
      this.tempData = data;
      this.temp = this.tempData.result

      this.labels = this.temp.map((e: Temperature) => e.time);
      this.dataSet = [{
        data: this.temp.map((e: Temperature) => e.land),
        label: 'Temperature Anomaly (°C)',
        fill: true,
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        borderWidth: 1,
        pointBackgroundColor: this.chartColor,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.1
        }];
        console.log(this.temp);
    });
    }

    createChartGradient() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(231, 76, 60, 0.3)');
        gradient.addColorStop(1, 'rgba(231, 76, 60, 0.05)');
        this.gradientFill = gradient;
      }
    }    
  }

