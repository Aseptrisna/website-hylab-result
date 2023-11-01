import React, { useState, useEffect } from "react";
import "../assets/css/image.css";
import Service from "../service";
import Icon from "../assets/image/sand-clock.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";

function ImageList() {
  const [imageData, setImageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = {
      page: currentPage,
      limit: imagesPerPage,
    };
    setTimeout(() => {
      getData(data);
    }, 1000);
  }, []);

  const getData = async (data) => {
    Service.getData(data)
      .then((data) => {
        setLoading(false);
        setImageData(data.data.datahasil);
        // setTotalPages(data.data.totalPages);
        console.log(data.data.datahasil);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  };

  // console.log(totalPages)
  // console.log(imagesPerPage)

  const paginate = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    const data = {
      page: pageNumber,
      limit: imagesPerPage,
    };
    setTimeout(() => {
      getData(data);
    }, 2000);
  };

  const copyToClipboard = async (text, index) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Update the copied property for the specific image
    const updatedImageData = [...imageData];
    updatedImageData[index].unit = true;
    setImageData(updatedImageData);

    // Reset the 'copied' state after a few seconds
    setTimeout(() => {
      updatedImageData[index].unit = false;
      setImageData(updatedImageData);
    }, 2000); // Reset after 3 seconds (adjust as needed)
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading">
          <div className="spinner">
            <img
              src={Icon}
              className="card-img-top img-fluid"
              alt=""
              style={{
                margin: "auto",
                display: "block",
                width: "80px",
                height: "80px",
                marginTop: "20px",
                alignContent: "center",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="container">
           <button
            className="reload-button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
       
          <br></br>
          <div className="row">
            {imageData.map((image, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4" border="warning">
                  <img
                    src={'https://hylab.pptik.id/data/raw_data/'+image.file_name}
                    className="card-img-top img-fluid"
                    alt={image.file_name}
                    style={{
                      margin: "auto",
                      display: "block",
                      width: "330px",
                      height: "250px",
                      marginTop: "20px",
                      alignContent: "center",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="card-body">
                    {/* <h5 className="card-title">
                      ID RFID:{image.guid}
                      <button
                        className={`copy-button ${image.unit ? "copied" : ""}`}
                        onClick={() => copyToClipboard(image.guid, index)}
                      >
                        {image.unit ? "Copied!" : "Copy"}
                      </button>
                    </h5> */}
                    <h5 className="card-title">{image.name}</h5>
                    <p className="card-time">{image.time}</p>
                    {/* <h5 className="card-time">{image.user.UNIT}</h5> */}
                    {/* <Card className="text-center">
                      <Card.Header>Featured</Card.Header>
                      <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                          With supporting text below as a natural lead-in to
                          additional content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        2 days ago
                      </Card.Footer>
                    </Card> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(totalPages / imagesPerPage + 1) },
              (_, index) => (
                <div key={index}>
                  <button
                    className={index + 1 === currentPage ? "active" : ""}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </div>
              )
            )}
          </div>
          <div className="footer">
            <p>&copy; 2023 PPTIK</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageList;
