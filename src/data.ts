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

export const apexPieConfig = (series:number[], labels:string[]) => ({
  series,
  options: {
    chart: {
      width: 380,
      type: 'pie' as const,
    },
    labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  },
});
