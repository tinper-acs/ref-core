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
  valueField: PropTypes.string,//真实 value 的键
  value: PropTypes.string,
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
  valueField: 'refpk',//真实 value 的键
  //将 filterRefUrl 改为 mactchUrl
  filterUrl: '',
  wrapClassName: '',
  canClickGoOn: () => { return true; },
  canInputGoOn: () => { return true; },
  filterData: [],
  filterUrlFunc: (value) => { },
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

// const getFilterData = (data, valueField, displayField) => {
//   let filterItems = [], filterDataMap = {};
//   data.forEach(item => {
//     let values = item[valueField];
//     //displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
//     let names = '';
//     if (typeof displayField === 'function') {
//       names = displayField(item);
//     } else {
//       names = displayField.format(item);
//     }
//     filterItems.push(<FilterItem key={values} text={names} value={values} />);
//     filterDataMap[values] = item;
//   });
//   return { filterItems, filterDataMap }
// }

class RefCoreWithInput extends Component {
  constructor(props) {
    super(props);
    // let valueMap = refValParse(props.value) || {};
    this.state = {
      checkedArray: [],
      value:props.value,
      // savedData: '',
      // savedShow: valueMap.refname,
      // filterText: '',
      // filterItems: [],
      filterData: props.filterUrl ? [] : (props.filterData || []),
      // filterDataMap: {},
      // filtering: false,
      showModal: false
    };
    this.childrenComponent = this.props.children;
  }

  componentDidMount() {
    
  }
  
  componentWillReceiveProps(nextProps) {
    // let { filterItems, filterDataMap } = this.getNewFilterData;
		if (nextProps.value !== this.state.value) {
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
          filterData:!nextProps.filterUrl ? nextProps.filterData: this.state.filterData,
          // filterItems:!nextProps.filterUrl ?filterItems : this.state.filterItems,
          // filterDataMap:!nextProps.filterUrl ?filterDataMap:this.state.filterDataMap,
				}, ()=>{
					this.handleChange(nextProps.value,this.state.checkedArray);
				})
		}else{
      this.setState({
        filterData:!nextProps.filterUrl ? nextProps.filterData: this.state.filterData,
        // filterItems:filterItems,
        // filterDataMap:filterDataMap,
      })
			return false;
		}
		return true;
  }
  
  // getNewFilterData= (nextProps) =>{
  //   let  filterItems=[], filterDataMap = {};
  //   if (!is(this.state.filterData, nextProps.filterData) && !this.props.filterUrl) {
  //         return getFilterData(nextProps.filterData, valueField, displayField)
  //   }
  //   return { filterItems,filterDataMap};
  // }

  handleChange = (values, record) => {
    const { onChange, value } = this.props;
    if (values === value) return;
    if (onChange) {
      onChange(values, record);
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

    const { displayField = '{refname}', valueField, onSave } = this.props;
    let values = result.map(item => item[valueField]).join(',');
    let names = result.map(item => {
      if (typeof displayField === 'function') {
        return displayField(item);
      } else {
        return displayField.format(item);
      }
    }).join(';');

    this.setState({
      checkedArray: result,
      value:result,
      // savedData: values,
      // savedShow: names,
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
    // e.stopPropagation();
    // let { dataset = {} } = e.target;
    // if (dataset.type !== 'filteritem') {
    //   return;
    // }
    // let { filterDataMap } = this.state;
    let { displayField = "{refname}", valueField, onSave } = this.props;
    // let filterDataItem = filterDataMap[dataset.value];
    // let savedData = filterDataItem[valueField];
    // //displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
    // let savedShow = '';
    // if (typeof displayField === 'function') {
    //   savedShow = displayField(filterDataItem);
    // } else {
    //   savedShow = displayField.format(filterDataItem);
    // }
    let ids = [];
    let names = selectedArray.map(item => {
      if (typeof displayField === 'function') {
        ids.push(item[valueField])
        return displayField(item);
      } else {
        ids.push(item[valueField])
        return displayField.format(item);
      }
    }).join(';');
    this.setState({
      // savedData, savedShow,
      filtering: false,
      value:selectedArray,
      // checkedArray: [filterDataMap[dataset.value]]
      checkedArray:selectedArray,
    }, () => {
      this.handleChange(JSON.stringify({
        refname: names,
        refpk: ids.join(';'),
        selectedArray
      }));
      // onSave([filterDataItem]);
      onSave(selectedArray);
    })
  }
  onDropdownVisibleChange = (open) =>{
    if(open && !this.state.showModal){
      this.onFilter(this.props.searchValue)
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
      // let { filterItems, filterDataMap } = getFilterData(data, valueField, displayField);
      this.setState({
        filterData:data,
        // filterItems,
        // filterDataMap
      });
    })
  }

  onChangeFormControl = (value) => {
    if (!this.props.canInputGoOn(value)) return;
    // this.setState({
    //   filterText: value,
    //   filtering: true
    // });
    this.onFilter(value);
  }

  // onBlurFormControl = () => {
  //   this.setState({
  //     filterText: '',
  //     filtering: Boolean(this.selectFilter)
  //   });

  // }

  // onFocusFormControl = () => {
  // }
	/**
	 * 控制模糊匹配时选择匹配项文本框失去焦点后 blur 先于 click 触发造成的选择未生效问题
	 */
  // onFilterMouseEnter = () => {
  //   this.selectFilter = true;
  // }
  // onFilterMouseLeave = () => {
  //   this.selectFilter = false;
  // }
  
  onMatchInitValue = (checkedArray) => {
    this.setState({ checkedArray })
  }
  render() {
    var { savedShow, savedData, filterItems, filtering, filterText, checkedArray, showModal,filterData} = this.state;
    const { displayField, valueField, form, rules, className, 
       wrapClassName, disabled, style,searchValue,
       placeholder, theme = 'ref-red',multiple,selectorDisplay=`{refname}`,
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
            showMenuIcon 
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
            inputDisplay={selectorDisplay}
            onDropdownVisibleChange={this.onDropdownVisibleChange}
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