<template>
    <header>
        <h1>Company Data</h1>
    </header>

    <div class="csv-generator">
        <div class="input-container">
            <textarea v-model="csvInput" class="csv-input" placeholder="Enter CSV data here"></textarea>
            <button @click="generateCSV" class="generate-button">Generate CSV</button>
            <button @click="fetchData" class="generate-button">Refresh Table</button>
        </div>
        <table v-if="fetchedData.length > 0" class="data-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in fetchedData" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td>{{ row.company_name }}</td>
                    <td>{{ row.employee_name }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.salary }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <footer>
        <a href="/company" class="footer-item active">Company</a>
        <a href="/" class="footer-item ">Notifications</a>
        <span class="footer-item ">Logout</span>
    </footer>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const csvInput = ref<string>('');
const fetchedData = ref<any[]>([]);

const apiUrl = import.meta.env.VITE_COMPANY_URL;

const generateCSV = async () => {
    try {
        const csvData = new Blob([csvInput.value], { type: 'text/csv' });
        const formData = new FormData();

        formData.append('csv', csvData, 'output.csv');

        const response = await axios.post(apiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Server response:', response.data);

    } catch (error) {
        console.error('Error sending CSV file:', error);
    }
};

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:8080/', {
            headers: {
                'Accept': 'application/json',
            },
        });
        fetchedData.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    fetchData();
});

</script>
  
  
<style scoped>
.csv-generator {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 4rem;
    margin-bottom: 4rem;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.csv-input {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.generate-button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.generate-button:hover {
    background-color: #0056b3;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.data-table th,
.data-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.data-table th {
    font-weight: bold;
}

header {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    height: 4rem;
    font-size: 0.6rem;
    font-weight: 400;
    justify-content: center;
    align-items: center;
    z-index: 100;
    border-bottom: 1px solid #ffffff33;
}

footer {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    background-color: #2f384c;
    z-index: 100;
}

.footer-item {
    color: white;
    text-decoration: none;
}

.active {
    font-weight: bold;
}
</style>