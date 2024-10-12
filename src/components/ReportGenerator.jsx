import { useState } from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 
  }
})

const MyDocument = ({posts}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>SanCrist Report</Text>
        <View style={styles.table}> 
          <View style={styles.tableRow}> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>ID</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Problema</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Descripción</Text> 
            </View> 
            <View style={styles.tableCol}> 
              <Text style={styles.tableCell}>Estado</Text> 
            </View> 
          </View>
          {posts.map((post) => (
            <View style={styles.tableRow} key={post.id}> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{post.id}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{post.problema}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{post.body}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{post.estado}</Text> 
              </View> 
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
)

export default function ReportGenerator({ posts }) {
  const [reportType, setReportType] = useState('posts')

  // Filtrar los datos para incluir solo las columnas relevantes
  const filteredData = posts.map(post => ({
    ID: post.id,
    Problema: post.problema,
    Descripción: post.body,
    Estado: post.estado
  }))


  // Exportar a Excel con columnas específicas
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report")
    XLSX.writeFile(workbook, 'sancrist_report.xlsx')
  }

  // Exportar a CSV con columnas específicas
  const exportToCSV = () => {
    const csv = Papa.unparse(filteredData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'sancrist_report.csv')
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="report-type">
          Tipo de Reporte
        </label>
        <select
          id="report-type"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="posts">Reporte Publicaciones</option>
          {/* Puedes agregar más tipos de reportes aquí */}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <PDFDownloadLink document={<MyDocument posts={posts} />} fileName="sancrist_report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Cargando documento...' : 'Descargar PDF'
          }
        </PDFDownloadLink>

        <button
          onClick={exportToExcel}
          className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Descargar Excel
        </button>

        <button
          onClick={exportToCSV}
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Descargar CSV
        </button>
      </div>
    </div>
  )
}
