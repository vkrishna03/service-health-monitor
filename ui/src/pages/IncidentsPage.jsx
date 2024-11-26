import React from 'react'
import {Table} from '../components/Table'
import rows from "../assets/Incidents.json"

const IncidentsPage = () => {
    const columns = ["No", "Service Name", "Status", "Type", "Priority", "Start Time", "End Time", "Duration"];

    return (
      <div className='rounded-md shadow-md py-8 px-10 h-full'>
          <h1 className='text-2xl font-semibold'>Incidents</h1>
          
          <div className='w-full px-4 py-10'>
              <Table>
                  <Table.Header>
                      {columns.map((column, index) => (
                          <React.Fragment key={index}>
                              <Table.ColumnTitle>{column}</Table.ColumnTitle>
                          </React.Fragment>
                      ))}
                  </Table.Header>
                  <Table.Body>
                      {rows.map((row, index) => (
                          <React.Fragment key={index}>
                              <Table.Row>
                                  <Table.Cell>{index + 1}</Table.Cell>
                                  <Table.Cell>{row.serviceName}</Table.Cell>
                                  <Table.Cell>
                                      <span 
                                          className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                                          row.status == "Resolved" ? "text-green-800 bg-green-200"
                                          : row.status == "In Progress" ? "text-yellow-800 bg-yellow-200"
                                          : "text-red-800 bg-red-200"
                                          } rounded-lg bg-opacity-50`
                                      }>
                                          {row.status}
                                      </span>
                                  </Table.Cell>
                                    <Table.Cell>{row.incidentType}</Table.Cell>
                                    <Table.Cell>{row.priority}</Table.Cell>
                                    <Table.Cell>{row.startTime}</Table.Cell>
                                    <Table.Cell>{row.endTime}</Table.Cell>
                                    <Table.Cell>{row.duration}</Table.Cell>
                              </Table.Row>
                          </React.Fragment>
                      ))}
                  </Table.Body>
              </Table>
          </div>
  
          </div>
    )
}

export default IncidentsPage