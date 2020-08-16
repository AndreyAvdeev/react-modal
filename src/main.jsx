import "./styles.scss";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Modal from "./components/Modal/Index.jsx";

class ModalTest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = "Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
    let title = "Title!";
    return (
      <>
        <Modal
          ref={(e) => (this.modal = e)}
          title=""
          clickOutside={true}
          onHide={() => {
            //callback after modal hide
          }}
        >
          {(data) => {
            return (
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1>Hello,I`am modal window</h1>
                    <p>{data}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-4 mb-4 d-flex justify-content-center">
                    <button
                      onClick={() => {
                        this.modal.hide();
                      }}
                      className="btn btn-danger"
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            );
          }}
        </Modal>
        <div className="m-2">
          <button
            onClick={() => {
              this.modal.show(data, title);
            }}
            className="btn btn-success"
          >
            show modal
          </button>
        </div>
      </>
    );
  }
}

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <ModalTest />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
