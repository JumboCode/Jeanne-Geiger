import { useTable, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table'
import React from 'react'

const OverviewTable = (props) => {
  return MyTable(props.columns, props.data, props.linkName, props.page)
}

function getLink (linkName, dataset) {
  if (linkName === 'adminOverview') {
    return '/admin/view-site?com_id=' + dataset.community_id + '&com_name=' + dataset.community_name
  } else if (linkName === 'siteOverview') {
    return '/site/case-view?case_id=' + dataset.case_id
  }
}

// source: https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/sorting
function MyTable (columns, data, linkName, page) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  // show only 20 entries at a time
  const start = (page - 1) * 20
  const end = (page * 20 > rows.length) ? (rows.length % 20) + start : page * 20
  const currentPageRows = rows.slice(start, end)

  return (
    <>
      <Table striped border hover {...getTableProps()} >
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {currentPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr onClick={() => { window.location.href = getLink(linkName, data[((page - 1) * 20) + i]) }} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <br />
      <div>Showing {currentPageRows.length} entries out of {rows.length}</div>
    </>
  )
}

export default OverviewTable
