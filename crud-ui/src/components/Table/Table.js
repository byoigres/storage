import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const changeBackgroundColor = keyframes`
  from {
    background-color: #3F51B5;
    color: white;
  }

  to {
    background-color: transparent;
    color: currentColor;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  padding: 10rem;
  table-layout: initial;
  width: 100%;
`;

const TableHeader = styled.th`
  border-bottom: 0.2rem solid black;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem;
  text-align: left;
  vertical-align: middle;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #C1C3D1;
  font-size: 1rem;
  font-weight: normal;
  animation: ${props => props.highlight ? `${changeBackgroundColor} 2s 1 normal` : 'unset'}
`;

const TableData = styled.td`
  border-bottom: 1px solid #C1C3D1;
  font-size: 1rem;
  font-weight: normal;
`;

export const ColumnMeta = styled.div`
  display: flex;
  justify-content: space-around;

  > :not(:last-child) {
    margin-right: 5px;
  }
`;

const TableContainer = ({ columns, data }) => (
  <Table>
    <thead>
      <TableRow>
        {columns.map(column => (
          <TableHeader key={column.id}>{column.text}</TableHeader>
        ))}
      </TableRow>
    </thead>
    <tbody>
      {
        data.map(rowData => (
          <TableRow
            key={rowData.id}
            highlight={parseInt(rowData.highlight, 0) === parseInt(rowData.id, 10)}
          >
            {
              rowData.row.map(column => (
                <TableData
                  key={column.id}
                >
                  {column.component}
                </TableData>
              ))
            }
          </TableRow>
        ))
      }
    </tbody>
  </Table>
);

TableContainer.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default TableContainer;
