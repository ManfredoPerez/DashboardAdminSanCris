import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { fetchPostsGrafico } from "../services/postService"

// Importar los componentes de Chart.js necesarios
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Charts = () => {
    const [postStatusData, setPostStatusData] = useState({
        inProcess: 0,
        finalized: 0,
        assigned: 0
    })

    // Función para obtener los datos de las publicaciones
    const getPostStatusData = async () => {
        const result = await fetchPostsGrafico()
        if (result.success) {
            const posts = result.data

            // Contar los estados de las publicaciones
            const assigned = posts.filter(post => post.estado === 'pendiente').length
            const inProcess = posts.filter(post => post.estado === 'en progreso').length
            const finalized = posts.filter(post => post.estado === 'finalizado').length

            setPostStatusData({ assigned, inProcess, finalized })
        }
    }

    useEffect(() => {
        getPostStatusData()
    }, [])

    // Datos para el gráfico de barras horizontales
    const barChartData = {
        labels: ['Pendiente', 'En Proceso', 'Finalizado'],
        datasets: [
            {
                label: 'Estados de Publicaciones',
                data: [postStatusData.assigned, postStatusData.inProcess, postStatusData.finalized],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                borderWidth: 1
            }
        ]
    }

    // Opciones para el gráfico de barras horizontales
    const options = {
        indexAxis: 'y',  // Esto hace que las barras sean horizontales
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                // display: true,
                // text: 'Estados de las Publicaciones',
            },
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    }

    return (
        <div style={{ width: '500px', margin: 'auto' }}>
            {/* <h2>Gráfico de Barras Horizontales de Estados de Publicaciones</h2> */}
            {/* <div style={{ width: '500px', margin: 'auto' }}> */}
                <Bar data={barChartData} options={options} />
            {/* </div> */}
        </div>
    )
}

export default Charts



// const assigned = posts.filter(post => post.estado === 'asignado').length
// const inProcess = posts.filter(post => post.estado === 'en progreso').length
// const finalized = posts.filter(post => post.estado === 'finalizado').length