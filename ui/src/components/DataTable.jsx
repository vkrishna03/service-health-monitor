import React from 'react'
import { Table } from './Table'
import PropTypes from 'prop-types'

const DataTable = ({columns, rows}) => {
  return (
    <div>DataTable</div>
  )
}

DataTable.PropTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DataTable