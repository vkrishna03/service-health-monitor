import React from 'react';
import PropTypes from 'prop-types';
import cn from "../utils/cn";

const Header = ({ children, ...props }) => (
  <thead className="rounded-md" {...props}>
    <tr className="bg-default">{children}</tr>
  </thead>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

const ColumnTitle = ({ children, widthClassNames, ...props }) => (
  <th
    scope="col"
    className={cn(
      "text-default p-3 text-left text-sm font-bold uppercase",
      !widthClassNames ? "w-auto" : widthClassNames
    )}
    {...props}
  >
    {children}
  </th>
);

ColumnTitle.propTypes = {
  children: PropTypes.node.isRequired,
  widthClassNames: PropTypes.string,
};

const Body = ({ children }) => (
  <tbody className="divide-subtle divide-y rounded-md">{children}</tbody>
);

Body.propTypes = {
  children: PropTypes.node.isRequired,
};

const Row = ({ children }) => <tr>{children}</tr>;

Row.propTypes = {
  children: PropTypes.node.isRequired,
};

const Cell = ({ children, widthClassNames }) => (
  <td
    className={cn(
      "text-default relative px-3 py-2 text-sm font-medium",
      !widthClassNames ? "w-auto" : widthClassNames
    )}
  >
    {children}
  </td>
);

Cell.propTypes = {
  children: PropTypes.node.isRequired,
  widthClassNames: PropTypes.string,
};

export const Table = ({ children }) => (
  <div className="bg-default border-gray-400 border-opacity-50 overflow-x-auto overflow-y-hidden rounded-md border">
    <table className="divide-gray-400 divide-opacity-45 w-full divide-y rounded-md">
      {children}
    </table>
  </div>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
};

Table.Header = Header;
Table.ColumnTitle = ColumnTitle;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
