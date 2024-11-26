import React from 'react'
import {Table} from '../components/Table'
import rows from "../assets/Logs.json"

const LogsPage = () => {
    const columns = ["No", "Service Name", "Uptime Percentage", "Downtime (in min)"];

    return (
      <div className='rounded-md shadow-md py-8 px-10 h-full'>
          <h1 className='text-2xl font-semibold'>Incidents</h1>
          
          
          <div className='w-full px-4 py-10'>
                <div className='flex items-center justify-end mb-4'>
                <span>Total Checks:{"   "} 1000</span>    
                </div>
                
                
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
                                    <Table.Cell>{row.name}</Table.Cell>
                                    <Table.Cell>{row.uptime_percentage}</Table.Cell>
                                    <Table.Cell>{row.downtime_duration}</Table.Cell>
                              </Table.Row>
                          </React.Fragment>
                      ))}
                  </Table.Body>
              </Table>
          </div>
  
          </div>
    )
}

export default LogsPage