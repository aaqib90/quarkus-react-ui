import React from 'react'
import styled from 'styled-components'

import { useTable, useGroupBy, useExpanded } from 'react-table'

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
        :last-child {
            td {
            border-bottom: 0;
            }
        }
        }

        th,
        td {
        margin: 0;
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;

        :last-child {
            border-right: 0;
        }
        }
    }
  `
function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state: { groupBy, expanded },
    } = useTable(
      {
        columns,
        data,
      },
      useGroupBy,
      useExpanded // useGroupBy would be pretty useless without useExpanded ;)
    )
  
    // We don't want to render all of the rows for this example, so cap
    // it at 100 for this use case
    const firstPageRows = rows.slice(0, 100)
  
    return (
      <>
        {/* <pre>
          <code>{JSON.stringify({ getTableProps }, null, 2)}</code>
        </pre> */}
        
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                      </span>
                    ) : null}
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        // For educational purposes, let's color the
                        // cell depending on what type it is given
                        // from the useGroupBy hook
                        {...cell.getCellProps()}
                        style={{
                          background: cell.isGrouped
                            ? '#0aff0082'
                            : cell.isAggregated
                            ? '#ffa50078'
                            : cell.isPlaceholder
                            ? '#ff000042'
                            : 'white',
                        }}
                      >
                        {cell.isGrouped ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <span {...row.getToggleRowExpandedProps()}>
                             
                            </span>{' '}
                            {cell.render('Cell')} ({row.subRows.length})
                          </>
                        ) : cell.isAggregated ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          cell.render('Aggregated')
                        ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          cell.render('Cell')
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <br />
        <div>Showing the first  results of {rows.length} rows</div>
      </>
    )
}

function EmployeeTable(props) {
    const {employeesData} = props;
    const columns = React.useMemo(
        () => [
          {
            Header: 'Employe List',
            columns: [
              {
                Header: 'Id',
                accessor: 'id',
                // Use a two-stage aggregator here to first
                // count the total rows being aggregated,
                // then sum any of those counts if they are
                // aggregated further
                // aggregate: 'count',
                // Aggregated: ({ value }) => `${value} Names`,
              },
              {
                Header: 'Name',
                accessor: 'employee_name',
                // Use another two-stage aggregator here to
                // first count the UNIQUE values from the rows
                // being aggregated, then sum those counts if
                // they are aggregated further
                // aggregate: 'uniqueCount',
                // Aggregated: ({ value }) => `${value} Unique Names`,
              },
              {
                Header: 'Age',
                accessor: 'employee_age',
                // Use another two-stage aggregator here to
                // first count the UNIQUE values from the rows
                // being aggregated, then sum those counts if
                // they are aggregated further
                // aggregate: 'uniqueCount',
                // Aggregated: ({ value }) => `${value} Unique Names`,
              },
            ],
          }
        ],
        []
      )

      return (
        <Styles>
            <Table columns={columns} data={employeesData} />
        </Styles>
      )

}

export default EmployeeTable