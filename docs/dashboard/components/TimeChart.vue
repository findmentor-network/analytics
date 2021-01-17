<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: ['origin', 'span', 'range'],
  async mounted() {
    const data = await fetch(
      `https://dashboard.analytx.dev/count/${this.origin}?span=${this.span}&range=${this.range}`
    ).then((res) => res.json())

    this.renderChart(
      {
        labels: data.labels,
        datasets: [
          {
            label: 'Visit',
            backgroundColor: '#f87979',
            data: data.data,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false }
    )
  },
}
</script>
