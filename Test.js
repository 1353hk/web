/* 

import Test from '../Test'; //测试而已

{this.state.isDev && (
  <Test opt={this.state.devOpt} set={e => this.setState(e)} />

  // 折叠
  <Test opt={this.state.devOpt} set={e => this.setState(e)} isOpen={false} />
)}

let { isDev, devOpt } = this.state;

*/

import React from 'react';

const Test = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**是否显示 */ isShow: true,
    };
  }
  static defaultProps = {
    /**选项列表 */ opt: {},
    /**是否展开 */ isOpen: true,
  };

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
        <details open={this.props.isOpen}>
          <summary>DEV OPTS</summary>

          {Object.keys(opt).map((key, index) => (
            <label
              key={key}
              htmlFor={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid',
                cursor: 'pointer',
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

          <button
            style={{
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={this.onClose}
          >
            Ⅹ
          </button>
        </details>
      </div>
    ) : null;
  }

  componentWillMount() {}

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
