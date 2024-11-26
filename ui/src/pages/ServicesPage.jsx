import React from 'react'
import { Table } from '../components/Table'
import rows from "../assets/Services.json"

const ServicesPage = () => {

    const columns = ["No", "Service Name", "Status", "Uptime", "Url", "Last Checked"];

  return (
    <div className='rounded-md shadow-md py-8 px-10 h-full'>
        <h1 className='text-2xl font-semibold'>Services</h1>
        
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
                                <Table.Cell>{row.name}</Table.Cell>
                                <Table.Cell>
                                    <span 
                                        className={`p-1.5 text-xs font-medium uppercase tracking-wider ${
                                        row.status == "UP" ? "text-green-800 bg-green-200"
                                        : row.status == "DOWN" ? "text-yellow-800 bg-yellow-200"
                                        : "text-gray-800 bg-gray-200"
                                        } rounded-lg bg-opacity-50`
                                    }>
                                        {row.status}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>{row.uptime}</Table.Cell>
                                <Table.Cell>
                                    <a href={row.url}>{row.url}</a>
                                </Table.Cell>
                                <Table.Cell>{row.lastChecked}</Table.Cell>

                            </Table.Row>
                        </React.Fragment>
                    ))}
                </Table.Body>
            </Table>
        </div>

        </div>
  )
}

export default ServicesPage