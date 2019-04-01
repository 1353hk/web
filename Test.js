/* 

import Test from '../Test'; //测试而已

{this.state.isDev && (
  <Test opt={this.state.devOpt} set={e => this.setState(e)} />
)}

let { isDev, devOpt } = this.state;

*/

import React from 'react';

const Test = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
    };
  }

  static defaultProps = { opt: {} };
  componentWillMount() {}

  render() {
    let opt = this.props.opt;

    return this.state.isShow ? (
      <div
        style={{
          position: 'fixed',
          top: '50px',
          zIndex: 9999,
          padding: '6px',
          color: '#fff',
          background: 'rgba(0,0,0,.5)',
        }}
      >
        {Object.keys(opt).map((key, index) => (
          <label
            key={key}
            htmlFor={key}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid',
            }}
          >
            <span>{`${index + 1}. ${key}`}</span>
            <input
              type="checkbox"
              id={key}
              checked={opt[key]}
              onChange={this.onChange}
            />
          </label>
        ))}

        <div style={{ textAlign: 'center' }} onClick={this.onClose}>
          <button>关闭</button>
        </div>
      </div>
    ) : null;
  }

  onChange = e => {
    let { id, checked } = e.target;
    this.props.set({
      devOpt: {
        ...this.props.opt,
        [id]: checked,
      },
    });
  };

  onClose = e => {
    this.setState({ isShow: false });
  };
};

export default Test;
