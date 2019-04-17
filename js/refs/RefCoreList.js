import React, { Component } from 'react';
import Checkbox from 'bee-checkbox';
import 'bee-checkbox/build/Checkbox.css'
// import {Checkbox} from 'tinper-bee';
import PropTypes from 'prop-types';
import '../../css/refcorelist.css'
const propTypes = {
	data: PropTypes.array,
	multiple: PropTypes.bool,
	selectArray: PropTypes.array,
	refListChecked: PropTypes.func,
	onClickBtn: PropTypes.func,
	language: PropTypes.string
}

const defaultProps = {
	data: [],
	multiple: false,
	selectArray: [],
	refListChecked: () => { },
	onClickBtn: () => { },
	language: ''
}
class RefCoreList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: []
		}
	}
	componentWillMount() {

	}
	onDoubleClick = (checkid) => {
		const { data, multiple } = this.props;
		let selectArray = [];
		if (multiple) {
			data.forEach((item, index) => {
				if (item.refpk == checkid) {
					item.checked = !item.checked;
				} else {
					item.checked = false;
				}
				if (item.checked) {
					selectArray.push(item)
				}
			})
			this.props.refListChecked(selectArray)
			setTimeout(() => {
				this.props.onClickBtn('save')
			}, 100)
		}
	}
	changeCheck = (checkid) => {

		const { data, multiple } = this.props;
		let selectArray = [];
		if (multiple) {
			data.forEach((item, index) => {
				if (item.refpk == checkid) {
					item.checked = !item.checked;
				} else {
					item.checked = false;
				}
				if (item.checked) {
					selectArray.push(item)
				}
			})
		} else {
			data.forEach((item, index) => {
				if (item.refpk == checkid) {
					item.checked = !item.checked;
				}
				if (item.checked) {
					selectArray.push(item)
				}
			})
		}
		this.props.refListChecked(selectArray)
	}
	render() {
		const { data, selectArray, language } = this.props
		let nodata = "没有查询到数据"
		switch (language) {
			case "zh_CN":
				nodata = '没有查询到数据'

				break;
			case "en_US":
				nodata = 'No query to data'
				break;
			case "zh_TW":
				nodata = '沒有査詢到數據'
				break;
			case "fr_FR":
				nodata = 'Pas de données'
				break;
			case "de_DE":
				nodata = 'Keine abfrage zu Daten'
				break;
			case "ja_JP":
				nodata = 'データが検索されていません'
				break;
			default:
				nodata = '没有查询到数据'
		}
		const loop = data => data.map((item, index) => {
			item.checked = false
			selectArray.forEach(element => {
				if (item.refpk == element.refpk) {
					item.checked = true
				}
			});
			return (
				<div className="ref-core-list-checkbox" key={index} >
					<Checkbox colors="info" onDoubleClick={() => this.onDoubleClick(item.refpk)} checked={item.checked} onChange={() => this.changeCheck(item.refpk)}>{item.refname}</Checkbox>
				</div>
			);
		});
		return (
			<div className="ref-core-list">
				{
					data.length ?
						loop(data) : <div className="ref-core-nodata">{nodata}</div>

				}
			</div>
		);
	}
}

RefCoreList.propTypes = propTypes;
RefCoreList.defaultProps = defaultProps;
export default RefCoreList;
