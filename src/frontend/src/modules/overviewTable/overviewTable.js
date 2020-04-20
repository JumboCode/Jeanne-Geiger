import { useTable, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table'
import React from 'react'

const OverviewTable = (props) => {
  console.log(props.columns)
  var filtered = props.columns.filter(obj => !props.filter_columns.includes(obj.Header) )
  return MyTable(filtered, props.data, props.linkName)
}

function getLink (linkName, dataset) {
  if (linkName === 'adminOverview') {
    return '/admin/view-site?com_id=' + dataset.community_id + '&com_name=' + dataset.community_name
  } else if (linkName === 'siteOverview') {
    return '/site/case-view?case_id=' + dataset.case_id
  }
}

// source: https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/sorting
function MyTable (columns, data, linkName) {
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

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          document.querySelectorAll('tr[data-href]').forEach(row => {
            row.addEventListener('click', () => {
              window.location.href = row.dataset.href
            })
          })
        })
      </script>
      <Table striped border hover {...getTableProps()}>
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
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr data-href={getLink(linkName, data[i])} {...row.getRowProps()}>
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
      <div>Showing the first {rows.length > 20 ? 20 : rows.length} results of {rows.length} rows</div>
    </>
  )
}

export default OverviewTable
