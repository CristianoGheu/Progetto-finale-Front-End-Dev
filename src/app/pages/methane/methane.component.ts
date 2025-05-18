import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ChartOptions } from 'chart.js';
import { DataSet, Methane } from '../../model';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-methane',
  standalone: false,
  templateUrl: './methane.component.html',
  styleUrls: ['./methane.component.css', '../../styles/charts.css']
})
export class MethaneComponent implements OnInit {

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getMethaneData();
    this.createChartGradient();
  }

  methane!: Methane[];
  methaneData: any;

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
          text: 'Part per billion (ppb)',
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

  getMethaneData(){
    this.httpService.getMethane()
    .pipe(catchError((error) => {
      this.errorMessage = error;
      return [];
    })
    )
    .subscribe((data) => {
      this.methaneData = data;
      this.methane = this.methaneData.methane
      this.labels = this.methane.map((e: Methane) => e.date);
      this.dataSet = [{data: this.methane.map((e: Methane) => e.average), label: 'Methane',
         fill: true,
         backgroundColor: this.gradientFill, 
         borderColor: this.chartColor,
         pointBackgroundColor: this.chartColor,
         borderWidth: 1,
          pointRadius: 4,
          pointHoverRadius: 7,
          tension: 0.1,
        }];
      console.log(this.methane); 
    });
  }

  createChartGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(155, 89, 182, 0.4)'); 
      gradient.addColorStop(1, 'rgba(155, 89, 182, 0)');
      this.gradientFill = gradient;
    }
  }  
   
}
