import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { post, get } from '../utils/request'
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
// import 'bee-form-control/build/FormControl.css'
// import 'bee-input-group/build/InputGroup.css'
// import 'bee-icon/build/Icon.css'
import { is } from 'immutable';
import '../../css/refcorewithinput.css';
import '../utils/polyfill_shim.js'
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
	matchUrl: PropTypes.string,
	param: PropTypes.object,
	style: PropTypes.object,
	// displayField: PropTypes.string,//显示内容的键
	valueField: PropTypes.string,//真实 value 的键
	filterUrl: PropTypes.string,
	value: PropTypes.string,
	wrapClassName: PropTypes.string,
	canClickGoOn: PropTypes.func,
	canInputGoOn: PropTypes.func,
	filterData:PropTypes.array,
	filterUrlFunc:PropTypes.func,
}

const defaultProps = {
	className: '',
	backdrop: true,
	style: {
		width: 200
	},
	param: {
		refCode: 'test_common',//test_common||test_grid||test_tree||test_treeTable
	},
	onCancel: function (p) {
	},
	onSave: function (sels) {
	},
	value: '',
	// displayField: 'refname',//显示内容的键
	valueField: 'refpk',//真实 value 的键
	//将 filterRefUrl 改为 mactchUrl
	matchUrl: '',
	filterUrl: '',
	wrapClassName: '',
	canClickGoOn:()=>{return true;},
	canInputGoOn:()=>{return true;},
	filterData:[],
	filterUrlFunc:(value)=>{},
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

const getFilterData = (data,valueField,displayField) =>{
	let filterItems = [], filterDataMap = {};
	data.forEach(item => {
		let values = item[valueField];
		//displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
		let names = '';
		if (typeof displayField === 'function') {
			names = displayField(item);
		} else {
			names = displayField.format(item);
		}
		filterItems.push(<FilterItem key={values} text={names} value={values} />);
		filterDataMap[values] = item;
	});
	return {filterItems,filterDataMap}
}

class RefCoreWithInput extends Component {
	constructor(props) {
		super(props);
		let valueMap = refValParse(props.value) || {}; 
		this.state = {
			checkedArray: [],
			savedData: '',
			savedShow: valueMap.refname,
			filterText: '',
			filterItems: [],
			filterData:props.filterUrl?[]:(props.filterData || []),
			filterDataMap: {},
			filtering: false,
			showModal: false
		};
		this.childrenComponent = this.props.children;
	}

	componentDidMount() {
		// this.setValues();
		// this.initComponent(this.props)
	}
	// shouldComponentUpdate(nextProps, nextState){
	// 	return true;
	// }
	componentWillReceiveProps(nextProps) {
		let {valueField, displayField = "{refname}",filterUrl} = this.props;
		if (nextProps.value !== this.props.value) {
				let valueMap = refValParse(nextProps.value) || {}; 
				// let { valueField } = this.props;
				let { checkedArray } = this.state;
				let diffValue = checkedArray.some(item=>{
					return !Boolean(~valueMap.refpk.indexOf(item[valueField]));
				});
				if(!is(this.state.filterData,nextProps.filterData)&&!filterUrl){
					let {filterItems,filterDataMap} = getFilterData(nextProps.filterData,valueField,displayField)
					this.setState({
						filterItems,
						filterDataMap,
						filterData:nextProps.filterData,
						checkedArray: diffValue ? [] : checkedArray,
						savedShow: valueMap.refname
					}, ()=>{
						this.handleChange(nextProps.value);
					})
				}else{
					this.setState({
						checkedArray: diffValue ? [] : checkedArray,
						savedShow: valueMap.refname
					}, ()=>{
						this.handleChange(nextProps.value);
					})
				}
				
		}else{
			//filterUrl不存在，只传入filterData
			if(!is(this.state.filterData,nextProps.filterData)&&!filterUrl){
				let {filterItems,filterDataMap} = getFilterData(nextProps.filterData,valueField,displayField)
				this.setState({
					filterItems,
					filterDataMap,
					filterData:nextProps.filterData,
				})
			}
			return false;
		}
		return true;
	}
	// componentWillReceiveProps(nextProp) {
	// 	if (nextProp.value !== this.props.value) {
	// 		this.initComponent(nextProp);
	// 	}
	// }
	handleChange = (values, record) => {
		const { onChange, value } = this.props;
		if(values === value) return;
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
			savedData: values,
			savedShow: names,
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
		if(!this.props.canClickGoOn()) return;
		this.setState({ 
			isClick: true,
			showModal: true 
		});
	}

	onClickFilterItem = (e) => {
		e.stopPropagation();
		let { dataset = {} } = e.target;
		if (dataset.type !== 'filteritem') {
			return;
		}
		let { filterDataMap } = this.state;
		let { displayField = "{refname}", valueField, onSave } = this.props;
		let filterDataItem = filterDataMap[dataset.value];
		let savedData = filterDataItem[valueField];
		//displayField 存在两种形态，通过字符匹配和函数匹配来获得展示的字段
		let savedShow = '';
		if (typeof displayField === 'function') {
			savedShow = displayField(filterDataItem);
		} else {
			savedShow = displayField.format(filterDataItem);
		}
		this.setState({
			savedData, savedShow,
			filtering: false,
			checkedArray: [filterDataMap[dataset.value]]
		}, () => {

			this.handleChange(JSON.stringify({
				refname: savedShow,
				refpk: dataset.value
			}), );
			onSave([filterDataItem]);
		})
	}
	onFilter = (content) => {
		let { filterUrl, param, valueField, displayField = "{refname}" } = this.props;
		//20190417这里修改逻辑，如果filterUrl存在，使用下面逻辑，否则回调然后用户传数据进来
		if(!filterUrl){
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
			let {filterItems,filterDataMap} = getFilterData(data,valueField,displayField);
			this.setState({
				filterItems,
				filterDataMap
			});
		})
	}
	onChangeFormControl = (value) => {
		if(!this.props.canInputGoOn(value)) return;
		this.setState({
			filterText: value,
			filtering: true
		});
		this.onFilter(value);
	}
	onBlurFormControl = () => {
		this.setState({
			filterText: '',
			filtering: Boolean(this.selectFilter)
		});

	}
	onFocusFormControl = () =>{
	}
	/**
	 * 控制模糊匹配时选择匹配项文本框失去焦点后 blur 先于 click 触发造成的选择未生效问题
	 */
	onFilterMouseEnter = () => {
		this.selectFilter = true;
	}
	onFilterMouseLeave = () => {
		this.selectFilter = false;
	}
	onMatchInitValue = (checkedArray) => {
		this.setState({checkedArray})
	}
	render() {
		var { savedShow, savedData, filterItems, filtering, filterText, checkedArray, showModal} = this.state;
    const { displayField, valueField, form, rules, className, wrapClassName, 
      disabled, style, placeholder,theme='ref-red' , clearBut='false'} = this.props;
    let {menuIcon=<span className={`uf uf-navmenu ${disabled ? 'ref-input-wrap-display' : ''}`}> </span>} = this.props;
		let childrenProps = Object.assign(Object.assign({}, this.props), {
			showModal: showModal ,
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
				<InputGroup simple
					style={{
						width: '100%'
					}}>
					<FormControl
						disabled={disabled}
						type="text"
						style={{
							width: '100%'
						}}
						{
							...savedShow ? {readOnly: "readonly"} : ''
						}
						placeholder={placeholder}
						value={filtering ? filterText : savedShow}
						onFocus={this.onFocusFormControl}
						onChange={this.onChangeFormControl}
						onBlur={this.onBlurFormControl}
					/>
					<InputGroup.Button className={`clear-icon ${(disabled || !checkedArray.length || !clearBut)?'hide':''}`} shape='border' onClick={()=>this.onSaveModal([])}>
						<span className={`uf uf-close-c ${(disabled || !checkedArray.length || !clearBut)?'hide':''}`}></span>
					</InputGroup.Button>
					<InputGroup.Button shape="border" onClick={this.handleClick}>
						{menuIcon}
					</InputGroup.Button>
				</InputGroup>
				{
					React.cloneElement(this.childrenComponent,childrenProps)
				}
				<div className="ref-input-wrap-filter-panel" style={{ display: filtering ? '' : 'none', width: style.width || 200 }}>
					<ul
						onClick={this.onClickFilterItem}
						onMouseEnter={this.onFilterMouseEnter}
						onMouseLeave={this.onFilterMouseLeave}
					>
						{
							filterItems.length ? filterItems.map(item => {
								return item
							}) : <li className="ref-filter-empty">没有匹配到数据</li>
						}
					</ul>
				</div>
			</div>
		);
	}
}
RefCoreWithInput.propTypes = propTypes;
RefCoreWithInput.defaultProps = defaultProps;
export default RefCoreWithInput;