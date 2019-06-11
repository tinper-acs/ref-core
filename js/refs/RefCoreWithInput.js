import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { post, get } from '../utils/request'
import { is } from 'immutable';
import '../../css/refcorewithinput.css';
import '../utils/polyfill_shim.js'
import Select from 'menu-selector';

const refValParse = (value) => {
  if(!value) return {refname: '', refpk: ''};

  try{
      let valueMap = JSON.parse(value);
      if(!valueMap.hasOwnProperty('refname') || !valueMap.hasOwnProperty('refpk')){
          return {refname: '', refpk: ''};
      }else{
          return valueMap;
      }
  }catch(e) {
      return {refname: '', refpk: ''};
  }
}

const propTypes = {
  param: PropTypes.object,
  style: PropTypes.object,
  displayField: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),//显示内容的键
  inputDisplay: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),//新的，input展示内容
  valueField: PropTypes.string,//真实 value 的键
  value: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),
  wrapClassName: PropTypes.string,
  canClickGoOn: PropTypes.func,
  canInputGoOn: PropTypes.func,
  filterUrl: PropTypes.string,
  filterData: PropTypes.array,
  filterUrlFunc: PropTypes.func,
}

const defaultProps = {
  className: '',
  backdrop: true,
  style: {
    width: 300
  },
  param: {
    refCode: 'test_grid',//test_common||test_grid||test_tree||test_treeTable
  },
  onCancel: function (p) {
  },
  onSave: function (sels) {
  },
  value: '',
  displayField: '{refname}',//显示内容的键
  inputDisplay: '{refname}',
  valueField: 'refpk',//真实 value 的键
  //将 filterRefUrl 改为 mactchUrl
  filterUrl: '',
  wrapClassName: '',
  canClickGoOn: () => { return true; },
  canInputGoOn: () => { return true; },
  filterData: [],
  filterUrlFunc: (value) => { },
  showMenuIcon:true,
  showArrow:false,
}


const FilterItem = (props) => {
  return (
    <li
      className={`ref-filter-item`}
      onClick={(e) => {
        if (e.target.dataset.type !== 'filteritem') {
          e.target.dataset.type = 'filteritem'
        }
      }}
      data-value={props.value}
      data-type="filteritem"

    >
      {props.text}
    </li>
  );
}

class RefCoreWithInput extends Component {
  constructor(props) {
    super(props);
    // let valueMap = refValParse(props.value) || {};
    this.state = {
      checkedArray: [],
      value:props.value,
      filterData: props.filterUrl ? [] : (props.filterData || []),
      showModal: false,
      searchValue:props.searchValue,
    };
    this.childrenComponent = this.props.children;
    this.init = true;
  }

  componentDidMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
        if(Array.isArray(nextProps.value)){
          //因为修改onChange的传参顺序，第一个是
          this.setState({
            filterData:!nextProps.filterUrl&& !is(nextprops.filterData,this.props.filterData)? nextProps.filterData: this.state.filterData,
          });
          return false
        };
				let valueMap = refValParse(nextProps.value) || {}; 
				let { valueField } = this.props;
				let { checkedArray } = this.state;
				let diffValue = checkedArray.some(item=>{
					return !Boolean(~valueMap.refpk.indexOf(item[valueField]));
        });
				this.setState({
          checkedArray: diffValue ? [] : checkedArray,
          value:diffValue? [] : checkedArray,
          savedShow: valueMap.refname,
            filterData:!nextProps.filterUrl&& !is(nextprops.filterData,this.props.filterData)? nextProps.filterData: this.state.filterData,
				}, ()=>{
					this.handleChange(nextProps.value,this.state.checkedArray);
				})
		}else{
      this.setState({
            filterData:!nextProps.filterUrl&& !is(nextprops.filterData,this.props.filterData)? nextProps.filterData: this.state.filterData,
      })
			return false;
		}
		return true;
  }
  

  handleChange = (values, record) => {
    const { onChange, value } = this.props;
    if (values === value) return;
    if (onChange) {
      // onChange(values, record);
      onChange(record,values);

    }
  }
  onCancelModal = (p) => {

    this.setState({
      isClick: false,
      showModal: false
    })
    this.props.onCancel(p, this.refDom);
  }

  onSaveModal = (result) => {

    const { inputDisplay = '{refname}', valueField, onSave } = this.props;
    let values = result.map(item => item[valueField]).join(',');
    let names = result.map(item => {
      if (typeof inputDisplay === 'function') {
        return inputDisplay(item);
      } else {
        return inputDisplay.format(item);
      }
    }).join(';');

    this.setState({
      checkedArray: result,
      value:result,
      isClick: false,
      showModal: false
    }, () => {
      onSave(result, names, this.refDom);
      this.handleChange(JSON.stringify({
        refname: names,
        refpk: values
      }), result);
    })
  }
	/**
	 * 点击打开参照弹出层时，做字段校验。
	 */
  handleClick = () => {
    let { isClick } = this.state
    if (this.props.disabled || isClick) {
      return
    }
    if (!this.props.canClickGoOn()) return;
    this.setState({
      isClick: true,
      showModal: true
    });
  }

  onClickFilterItem = (status,id,item,selectedArray) => {
    let { inputDisplay = "{refname}", valueField, onSave } = this.props;
    let ids = [];
    let names = selectedArray.map(item => {
      if (typeof inputDisplay === 'function') {
        ids.push(item[valueField])
        return inputDisplay(item);
      } else {
        ids.push(item[valueField])
        return inputDisplay.format(item);
      }
    }).join(';');
    this.setState({
      filtering: false,
      value:selectedArray,
      checkedArray:selectedArray,
    }, () => {
      this.handleChange(
        JSON.stringify({
        refname: names,
        refpk: ids.join(';'),
       
      }), selectedArray);
      onSave(selectedArray);
    })
  }
  onDropdownVisibleChange = (open) =>{
    if(open && !this.state.showModal && this.init){
      this.init = false;
      this.onFilter(this.state.searchValue)
    }
  }

  onFilter = (content) => {
    let { filterUrl, param, valueField, displayField = "{refname}" } = this.props;
    //20190417这里修改逻辑，如果filterUrl存在，使用下面逻辑，否则回调然后用户传数据进来
    if (!filterUrl) {
      this.props.filterUrlFunc(content);
      return false;
    }
    if (!content) return;
    get(filterUrl, {
      ...param,
      refCode: param.refCode,
      content: content
    }).then((response) => {
      let { data } = response;
      this.setState({
        filterData:data,
      });
    })
  }

  onChangeFormControl = (value) => {
    if (!this.props.canInputGoOn(value)) return;
    this.setState({
      searchValue:value
    },()=>{
      this.onFilter(value);
    })
   
  }

  onMatchInitValue = (checkedArray) => {
    this.setState({ checkedArray })
  }
  render() {
    var {  checkedArray, showModal,filterData} = this.state;
    const { displayField, valueField, className, 
       wrapClassName, disabled, style,searchValue,
       placeholder, theme = 'ref-red',multiple,inputDisplay=`{refname}`,
       showMenuIcon=true,showArrow=false,
    } = this.props;
    let {value} = this.state;
    
    let childrenProps = Object.assign(Object.assign({}, this.props), {
      showModal: showModal,
      checkedArray: checkedArray,
      onCancel: this.onCancelModal,
      onSave: this.onSaveModal,
      onMatchInitValue: this.onMatchInitValue
    });
    delete childrenProps.children;

    return (
      <div className={`ref-input-wrap ${wrapClassName} ${theme}`}
        style={{
          ...style
        }}
      >
        <Select
            style={{
              width: '100%'
            }}
            transitionName="rc-tree-select-dropdown-slide-up"
            choiceTransitionName="rc-tree-select-selection__choice-zoom"
            showSearch
            allowClear
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onSearch={this.onChangeFormControl}
            onMenuIconClick={this.handleClick}
            searchValue={searchValue}
            valueList={filterData}
            onSelectorChange={this.onClickFilterItem}
            displayField={displayField}
            valueField={valueField}
            className={className}
            multiple={multiple}
            inputDisplay={inputDisplay}
            onDropdownVisibleChange={this.onDropdownVisibleChange}
            showMenuIcon={showMenuIcon}
            showArrow={showArrow}
          >
				</Select>
        {
          React.cloneElement(this.childrenComponent, childrenProps)
        }

      </div>
    );
  }
}
RefCoreWithInput.propTypes = propTypes;
RefCoreWithInput.defaultProps = defaultProps;
export default RefCoreWithInput;