import { useState } from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

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

const MyDocument = ({posts, users}) => (
    
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
              <Text style={styles.tableCell}>Descripcion</Text> 
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

export default function ReportGenerator({ posts, users }) {
  const [reportType, setReportType] = useState('posts')

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
          {/* <option value="users">Reporte Usuarios</option> */}
        </select>
      </div>
      <div className="flex items-center justify-between">
        <PDFDownloadLink document={<MyDocument posts={posts} />} fileName="sancrist_report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download PDF'
          }
        </PDFDownloadLink>
      </div>
    </div>
  )
}