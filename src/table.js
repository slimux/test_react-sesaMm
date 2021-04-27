import React from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import movieService from './api/movies'

const tableHead = {
  original_title: "Movie Name",
  poster_path: "Poster"
};

const Table = () => {
  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState([]);
  const [allData, setAllData] = React.useState([])

  React.useEffect(() => {
    movieService.getAll().then(res => {
      setAllData(res.data)
      setCollection(cloneDeep(allData.slice(0, countPerPage)));
    })
  }, [])
  React.useEffect( () => {

    if (!value) {
      updatePage(1);
    } else {
      const query = value.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        allData
          .filter(item => item.original_title.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }
  }, [value]);

  const updatePage = p => {
    movieService.getAll().then(res => {
      setCurrentPage(p);
      const to = countPerPage * p;
      const from = to - countPerPage;
      setCollection(cloneDeep(res.data.slice(from, to)));  
    })
    
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      if (keyD === 'poster_path')
        return <td key ={i}>
          <img src={formatImagePath(key[keyD])} height={150}/>
        </td>
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const formatImagePath = (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index })
    );
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
      <div class="search">
        <input
          placeholder="Search Movie by title"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
    </>
  );
};
export default Table;
