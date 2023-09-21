import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Pagination from "react-bootstrap/Pagination";
import 'bootstrap/dist/css/bootstrap.min.css';


const Homee = () => {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filteredData = data.filter((element) =>
      element.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPageData(filteredData);
  };

  const getdata = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleNext = () => {
    if (page === pageCount) return page;
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page === 1) return page;
    setPage(page - 1);
  };

  useEffect(() => {
    getdata();
  }, [page]);

  useEffect(() => {
    const pagedatacount = Math.ceil(data.length / 5);
    setPageCount(pagedatacount);

    if (page) {
      const LIMIT = 5;
      const skip = LIMIT * page;
      const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
      setPageData(dataskip);
    }
  }, [data, page]);

  return (
    <div className="container">
      <h1 className="my-4">User Data</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="table_div">
        {isLoading ? (
          <div className="d-flex justify-content-center my-4">
            Loading... <Spinner animation="border" variant="danger" />
          </div>
        ) : (
          <Table striped bordered hover>
            <thead className="bg-primary text-white">
              <tr>
                <th>Id</th>
                <th>Price</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((element, index) => (
                <tr key={index}>
                  <td>{element.id}</td>
                  <td>${element.price.toFixed(2)}</td>
                  <td>{element.title}</td>
                  <td>
                    <img
                      src={element.thumbnail}
                      style={{ width: 60, height: 60 }}
                      alt=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <Pagination>
          <Pagination.Prev onClick={handlePrevious} disabled={page === 1} />
          {Array(pageCount)
            .fill(null)
            .map((ele, index) => (
              <Pagination.Item
                key={index}
                active={page === index + 1 ? true : false}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
        </Pagination>
      </div>
    </div>
  );
};

export default Homee;
