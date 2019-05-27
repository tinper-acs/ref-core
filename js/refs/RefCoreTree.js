import React, { Component } from 'react';
import Tree from 'bee-tree';
// import 'bee-tree/build/Tree.css'
// import {Tree} from 'tinper-bee';
import { is } from 'immutable';

import '../utils/polyfill_shim.js'
import '../../css/refcoretree.css'
const { TreeNode } = Tree;

const nodeKeysFunc = (item, index) =>{
	return item.id || index;
}
export default class RefCoreTree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHover: "",
			editKey: "",
			checkedKey: []
		};
		this.children = [];
		let { nodeKeys = nodeKeysFunc, displayField = "refname",lazyModal, onLoadData,searchValue} = props;
		let isDisplayFieldFunction = false,isLazyModal=false;
		if (typeof displayField === 'function') {
			isDisplayFieldFunction = true;
		}
		if(lazyModal || typeof(onLoadData)==='function') isLazyModal= true;
		this.children = this.loop(props.data || [],nodeKeys,displayField,isDisplayFieldFunction,isLazyModal,searchValue);
	}
	componentWillReceiveProps(nextProps, nextState){
    if(!is(nextState, this.state) || !is(nextProps, this.props)){
			let { nodeKeys = nodeKeysFunc, displayField = "refname",lazyModal, onLoadData,searchValue} = nextProps;
			let isDisplayFieldFunction = false,isLazyModal=false;
			if (typeof displayField === 'function') {
				isDisplayFieldFunction = true;
			}
			if(lazyModal || typeof(onLoadData)==='function') isLazyModal= true;
      this.children = this.loop(nextProps.data || [],nodeKeys,displayField,isDisplayFieldFunction,isLazyModal,searchValue);
      return true;
    }else{
      return false;
    }
	}
	onMouseEnter = (e) => {

		// return
		this.setState({
			isHover: e.node.props.eventKey
		})
	}
	onDoubleClick = (record, index, event) => {

		this.props.onDoubleClick(record, index, event)
	}
	onMouseLeave = (e, treenode) => {

		// return
		this.setState({
			isHover: "",
			editKey: "",
		})

	}
	checkAllchildren(v, id) {
		// return
		let { checkedKey, isHover } = this.state
		if (v) {
			checkedKey.push(id)
		} else {
			checkedKey.splice(id, 1)
		}
		this.setState({
			checkedKey
		});
		this.props.checkAllchildrenFun(v, id)
	}

	loop = (datas,nodeKeys,displayField,isDisplayFieldFunction,isLazyModal,searchValue='') => {
			// let { nodeKeys = nodeKeysFunc, displayField = "refname" } = this.props;
			return datas.map((item, i) => {
        let key = nodeKeys(item, i);
				let text = isDisplayFieldFunction?displayField(item): displayField.format(item);
				let title = <div className="ref-core-tree-node-text">{text}</div> ;
				if(!!searchValue){
					const index =text.search(searchValue);
					const beforeStr =text.substr(0, index);
					const afterStr =text.substr(index + searchValue.length);
					if(index>-1){
						title = (
							<span>
								{beforeStr}
								<span className={' ref-core-tree-node-text uTreeSearchableFilter'}>{searchValue}</span>
									{afterStr}
								</span>
							) 
					}
				}
				let isLeafAttr ={};
				if(isLazyModal) isLeafAttr.isLeaf = !!item.isLeaf
				if (item.children && item.children.length) {
					return <TreeNode 
					className="ref-core-tree-node" 
					key={key} 
					title={title} 
					// title={<div className="ref-core-tree-node-text">{text}{ checkable ? '' : <i className="ref-core-tree-node-selected" />}</div>} 
					attr={item}  
					{...isLeafAttr}
					>
					{this.loop(item.children,nodeKeys,displayField,isDisplayFieldFunction,isLazyModal,searchValue)}
					</TreeNode>;
				}
				return <TreeNode 
					className="ref-core-tree-node"
					key={key} 
					title={title} 
					attr={item} 
					{...isLeafAttr}
				/>;
			});
	}
	render() {
		let { data, show = true, ...others } = this.props;

		return (
			<div className={`ref-core-tree ${show ? '' : 'ref-core-tree-hide'}`}>
				<Tree {...others} onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} onDoubleClick={this.onDoubleClick.bind(this)}>
					{this.children.map(item=>item)}
				</Tree>
			</div>
		);
	}
}
