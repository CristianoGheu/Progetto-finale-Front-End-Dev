import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { DataSet, No2 } from '../../model';
import { ChartOptions } from 'chart.js';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-no2',
  standalone: false,
  templateUrl: './no2.component.html',
  styleUrls: ['./no2.component.css', '../../styles/charts.css']
})
export class No2Component implements OnInit {

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
   this.getNo2Data();
   this.createChartGradient();
  }

  no2!: No2[];
  no2Data: any;

  dataSet!: DataSet[]
  labels!: Array<number>
  chartColor = '#e67e22'
  gradientFill: any;
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Nitrous Oxide (ppb)',
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

  getNo2Data(){
    this.httpService.getNo2()
    .pipe(catchError((error) => {
      this.errorMessage = error; return [];})
    )
    .subscribe((data) => {
      this.no2Data = data;
      this.no2 = this.no2Data.nitrous
      this.labels = this.no2.map((e: No2) => e.date);
      this.dataSet = [{data: this.no2.map((e: No2) => e.average), label: 'Nitrous Oxide',
         fill: true,
         backgroundColor: this.gradientFill,
         borderColor: this.chartColor,  
         pointBackgroundColor: this.chartColor,
         borderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 7,     
          tension: 0.1,
        }];      
      console.log(this.no2);
    })
  }

  createChartGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(230, 126, 34, 0.4)');
      gradient.addColorStop(1, 'rgba(230, 126, 34, 0)');
      this.gradientFill = gradient;
    }
  } 
}
