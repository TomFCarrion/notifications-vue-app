<template>
  <div>
    <h2>CSV Generator</h2>
    <textarea v-model="csvInput" placeholder="Enter CSV data here"></textarea>
    <button @click="generateCSV">Generate CSV</button>
    <a :href="csvDownloadLink" download="output.csv">Download CSV</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      csvInput: '',
      csvDownloadLink: '',
    };
  },
  methods: {
    generateCSV() {
      // Create a Blob containing the CSV data
      const csvData = new Blob([this.csvInput], { type: 'text/csv' });

      // Generate a URL for the Blob
      this.csvDownloadLink = URL.createObjectURL(csvData);
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>
