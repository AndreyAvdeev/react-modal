import "./style/style.scss";
import React, { Component } from "react";

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      data: "",
      offset: [],
      isDown: false,
      draggable_element: null,
    };
  }

  componentDidMount() {
    document.addEventListener("click",this.handleClickOutside.bind(this),false);
  }

  componentWillUnmount() {
    document.removeEventListener("click",this.handleClickOutside.bind(this),false);
  }

  handleClickOutside(e) {
    this.props.clickOutside &&
      e.target.className == "modal-wrapper open" && this.hide();
  }

  show(data = {}, title = "") {
    document.body.classList.add("scroll-off");
    this.setState({ show: true, data, eventTitle: title }, () => {
      this.renderModal();
    });
  }

  hide() {
    setTimeout(() => {
      document.body.classList.remove("scroll-off");
      if (this.state.show) {
        this.setState({ show: false }, () => {
          document.removeEventListener(
            "click",
            this.handleClickOutside.bind(this),
            false
          );
          this.props.onHide();
        });
      }
    }, 50);
  }

  _dragStart(e) {
      e.preventDefault();
      this.setState({
        isDown: true,
        offset: [
          this.draggable_element.offsetLeft - e.clientX,
          this.draggable_element.offsetTop - e.clientY,
        ],
      });
  }

  _dragMove(e) {
      e.preventDefault();
      if (this.state.isDown) {
        this.draggable_element.style.marginLeft =
          e.clientX + this.state.offset[0] + "px";
        this.draggable_element.style.marginTop =
          e.clientY + this.state.offset[1] + "px";
        this.draggable_element.style.cursor = "move";
      }
  }

  _dragCancel() {
    this.setState({ isDown: false }, () => {
      this.draggable_element.style.cursor = "default";
    });
  }

  renderModal() {
    let { children } = this.props;
    let title = this.state.eventTitle || this.props.title;
    let renderChild = null;

    if (isFunction(children)) {
      renderChild = this.props.children(this.state.data, this.hide.bind(this));
    } else {
      renderChild = this.props.children;
    }

    if (renderChild && this.props.draggable) {
      this.draggable_element = document.getElementById("modal_id");
    }

    return (
      <div id='modal_id' className="modal"
        onMouseMove={this.props.draggable && this._dragMove.bind(this)}
        onMouseUp={this.props.draggable && this._dragCancel.bind(this)}
        onMouseDown={this.props.draggable && this._dragStart.bind(this)}
      >
        <div className="modal_head">
          <h5>{title}</h5>
          <i onClick={this.hide.bind(this)}>
            <svg
              className="icon_close"
              viewBox="0 0 365.696 365.696"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" />
            </svg>
          </i>
        </div>
        <div className="modal_content">{renderChild}</div>
      </div>
    );
  }

  render() {
    return (
      <div onMouseMove={this.draggable_element && this._dragMove.bind(this)}
      className={this.state.show ? "modal-wrapper open" : "modal-wrapper"}>
        {this.state.show && this.renderModal()}
      </div>
    );
  }
}

Modal.defaultProps = {
  title: "",
  eventTitle: "",
  clickOutside: true,
  draggable: false,
  onHide: () => {},
};
