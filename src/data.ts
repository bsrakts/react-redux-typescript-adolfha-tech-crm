import { SeriesType } from "./type";

export const tableHeadList: String[] = [
  'Image',
  'First Name',
  'Last Name',
  'Age',
  'Gender',
  'Email',
  'Phone',
  'Birth Date'
]

export const apexLineConfig = (series:SeriesType[], categories: string[], stockValue:number[]) => (
  {
    series,
    options: {
        chart: {
            height: 350,
            type: 'line' as const,
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 10,
                left: 7,
                blur: 10,
                opacity: 0.1,
            },
            toolbar: {
                show: true,
                download: true,
            },
        },
        colors: ['#D602D4'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth' as const,
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.1
            },
        },
        markers: {
            size: 1,
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Category',
            },
            type: 'category' as const,
        },
        yaxis: {
            title: {
                text: 'Aktivite'
            },
            min: Math.min(...stockValue) > 5 ? Math.min(...stockValue) - 5 : Math.min(...stockValue),
            max: Math.max(...stockValue) + 5,
            forceNiceScale: true,
            tickAmount: 5
        },
        tooltip: {
          style: {
              fontSize: '13px',
          },
          y: {
              formatter: function (val: number) {
                  return val + ''
              },
          },
          x: {
              formatter: function () {
                  return ''
              },
          },
      },
        legend: {
            position: 'top' as const,
            horizontalAlign: 'right' as const,
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    },
}
)

export const apexPieConfig = (series:number[], labels:string[]) => ({
  series,
  options: {
    chart: {
      width: 380,
      height:500,
      type: 'pie' as const,
    },
    labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 400
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },
});

export const apexBarConfig = (series:number[], categories:string[]) => ({
  series: [
   {
    data: series
   }
  ],
  options: {
    chart: {
      type: 'bar' as const,
      height: 250
    },
    colors: ['#d0e6bc'],
    plotOptions: {
      bar: {
        borderRadius: 1,
        barHeight: '50%',
        horizontal: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories,
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 400
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },
})
