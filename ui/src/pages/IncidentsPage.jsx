import React from 'react'
import {Table} from '../components/Table'
// import rows from "../assets/Incidents.json"
import { fetchIncidents } from '../api/services'
import useFetchData from '../hooks/useFetchData'

const IncidentsPage = () => {

    const {data: incidents, loading, error} = useFetchData(fetchIncidents);

    const columns = ["No", "Service Name", "Status", "Type", "Priority", "Start Time", "End Time", "Duration"];
    const rows = incidents.map(incident => ({
        serviceName: incident.serviceName,
        status: incident.status,
        incidentType: incident.incidentType,
        priority: incident.priority,
        startTime: new Date(incident.startTime).toLocaleString(),
        endTime: incident.endTime ? new Date(incident.endTime).toLocaleString() : "-",
        duration: incident.duration,
        type: incident.type
    }));

    if (loading) {
        return <div>Loading...</div>;
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    };

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
                                    <Table.Cell>{row.type}</Table.Cell>
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