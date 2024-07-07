'use client';
import React, { useState } from 'react';
import _ from 'lodash';
import '../components/DataTable.module.css' ;


const DataTable = ({ data }) => {
  const [filter, setFilter] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [groupingColumn, setGroupingColumn] = useState('');
  const pageSize = 10;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSort = (column) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(order);
  };

  const handleGroupingChange = (event) => {
    setGroupingColumn(event.target.value);
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = _.orderBy(filteredData, [sortColumn], [sortOrder]);

  const groupedData = groupingColumn ? _.groupBy(sortedData, groupingColumn) : { all: sortedData };

  const paginatedData = _.chunk(groupedData['all'] || [], pageSize)[currentPage - 1] || [];

  return (
    <div className="flex">
      <Sidebar onGroupingChange={handleGroupingChange} groupingColumn={groupingColumn} />
      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold mb-4">Data Table</h1>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter"
          className="mb-4 p-2 border border-gray-300"
        />
        <table className="min-w-full border-collapse block md:table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="cursor-pointer">ID</th>
              <th onClick={() => handleSort('name')} className="cursor-pointer">Name</th>
              <th onClick={() => handleSort('category')} className="cursor-pointer">Category</th>
              <th onClick={() => handleSort('subcategory')} className="cursor-pointer">Subcategory</th>
              <th onClick={() => handleSort('createdAt')} className="cursor-pointer">Created At</th>
              <th onClick={() => handleSort('updatedAt')} className="cursor-pointer">Updated At</th>
              <th onClick={() => handleSort('price')} className="cursor-pointer">Price</th>
              <th onClick={() => handleSort('salePrice')} className="cursor-pointer">Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedData).map((group, idx) => (
              <React.Fragment key={idx}>
                {groupingColumn && group !== 'all' && (
                  <tr>
                    <td colSpan="8" className="bg-gray-200 p-2">{group}</td>
                  </tr>
                )}
                {groupedData[group].map((item, index) => (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="p-2">{item.id}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.subcategory}</td>
                    <td className="p-2">{item.createdAt}</td>
                    <td className="p-2">{item.updatedAt}</td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">{item.salePrice}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredData.length / pageSize)}>Next</button>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ onGroupingChange, groupingColumn }) => {
  return (
    <div className="sidebar p-4 border border-gray-300 w-64">
      <h2 className="font-bold mb-4">Create Groups</h2>
      <select onChange={onGroupingChange} value={groupingColumn} className="mb-4 p-2 border border-gray-300 w-full">
        <option value="">Select a column</option>
        <option value="category">Category</option>
        <option value="subcategory">Subcategory</option>
        {/* Add more options as needed */}
      </select>
      <button className="bg-blue-500 text-white p-2 w-full">Apply grouping</button>
    </div>
  );
};
const ParentComponent = () => {
  const [columnsVisibility, setColumnsVisibility] = useState({
    category: true,
    subcategory: true,
    // Initialize other columns as needed
  });

  const handleVisibilityChange = (column) => {
    setColumnsVisibility(prevState => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  return (
    <div>
      <Sidebar onVisibilityChange={handleVisibilityChange} columnsVisibility={columnsVisibility} />
      <DataTable columnsVisibility={columnsVisibility} />
    </div>
  );
};


export default DataTable;
export { Sidebar , ParentComponent};