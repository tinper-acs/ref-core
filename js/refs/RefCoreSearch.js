import React, { Component } from 'react';
import { Input as FormControl, InputGroup } from '@tinper/next-ui';
import '../../css/refcoresearch.css'

class RefCoreSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value || ""
		}
	}
	onChange = (value) => {
		this.setState({ value: value });
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}
	onClear = () => {
		this.setState({ value: '' });
	}
	keypress = (e) => {
		if (e.which !== 13) return;
		this.onSearch(this.state.value)
	}
	onSearch = () => {
		if (this.props.onSearch) {
			this.props.onSearch(this.state.value);
		}
	}
	getFieldid = (str) => {
		const {fieldid} = this.props
		if (!fieldid) return;
		return `${fieldid}_ref_core_search_${str}`
	}
	render() {
		let { language = '', placeholder = '', className = '', show = true } = this.props
		if(!placeholder){
			switch (language) {
				case "en_US":
					placeholder = 'Search'
					break;
				case "fr_FR":
					placeholder = 'Recherche'
					break;
				case "de_DE":
					placeholder = 'Suche'
					break;
				case "ja_JP":
					placeholder = '検索'
					break;
				case "zh_TW":
				case "zh_CN":
				default:
					placeholder = '搜索'
			}
		}
		return (
			<InputGroup
				simple
				className={`ref-core-search ${className} ${ show ? '' : 'ref-core-search-hide'}`}
				fieldid={this.getFieldid('group')}
			>
				<FormControl
					className="ref-core-search-input"
					value={this.state.value}
					onChange={this.onChange}
					onPressEnter={this.keypress}
					placeholder={placeholder}
					type="text"
					fieldid={this.getFieldid('input')}
				/>
				<InputGroup.Button shape="border" onClick={this.onSearch.bind(this)} fieldid={this.getFieldid('btn')}>
					<span className="uf uf-search" fieldid={this.getFieldid('btn_search')}> </span>
			    </InputGroup.Button>
			</InputGroup>
		);
	}
}

export default RefCoreSearch;
