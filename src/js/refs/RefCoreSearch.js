import React, { Component } from 'react';
// import FormControl from 'bee-form-control';
// import InputGroup from 'bee-input-group';
// import 'bee-form-control/build/FormControl.css'
// import 'bee-input-group/build/InputGroup.css'
import {FormControl,InputGroup} from 'tinper-bee';
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
			<InputGroup simple
				className={`ref-core-search ${className} ${ show ? '' : 'ref-core-search-hide'}`}
			>
				<FormControl
					className="ref-core-search-input"
					value={this.state.value}
					onChange={this.onChange}
					onKeyPress={this.keypress}
					placeholder={placeholder}
					type="text"
				/>
				<InputGroup.Button shape="border" 
					className="ref-core-search-icon-search"
					onClick={this.onSearch.bind(this)}>
				</InputGroup.Button>
			</InputGroup>

		);
	}
}

export default RefCoreSearch;
