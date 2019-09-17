import React, { Component } from 'react';
import Button from 'bee-button';
// import 'bee-button/build/Button.css'
// import {Button} from 'tinper-bee';
import PropTypes from 'prop-types';
import '../../css/refcorebutton.css'
// const propTypes = {
//   buttons: PropTypes.object,
//   ishasemptyBtn: PropTypes.bool,
//   language: PropTypes.string,
// }

// const defaultProps = {
//   buttons: {
//     okText: "确认",
//     cancelText: "取消",
//     clearText: "清空已选",
//   },
//   ishasemptyBtn: true,
//   language: 'zh_CN'
// }
function RefCoreButton(props) {
	const { buttons, language, onClickBtn, emptyBut = true ,footerBtnDom=''} = props;
	let saveButton = '';
	let cancelButton = '';
	let clearButton = '';
	
	switch (language) {
		case "en_US":
			saveButton = 'Ok'
			cancelButton = 'Cancel'
			clearButton = 'Empty'
			break;
		case "zh_TW":
			saveButton = '確認'
			cancelButton = "取消";
			clearButton = '清空已選'
			break;
		case "fr_FR":
			saveButton = 'Confirmation'
			cancelButton = 'Annuler'
			clearButton = 'Videz'
			break;
		case "de_DE":
			saveButton = 'Bestätigt'
			cancelButton = 'Abgesagt'
			clearButton = 'Leer'
			break;
		case "ja_JP":
			saveButton = '確認する'
			cancelButton = '取り消す'
			clearButton = '空を清める'
			break;
		case "zh_CN":
		default:
			saveButton = "确认";
			cancelButton = "取消";
			clearButton = '清空已选';
	}
	if(buttons){
		saveButton = buttons.okText || "确认";
		cancelButton = buttons.cancelText || "取消";
		clearButton = buttons.clearText || '清空已选';
	}
	return (
		<div className="ref-core-button">
			{
				emptyBut ? <Button className='ref-core-button-empty'shape="border"  onClick={()=> onClickBtn('clear')}>{clearButton}</Button> : ''
			}
			{
				!!footerBtnDom ? <div className='ref-core-customed-button'>{React.cloneElement(footerBtnDom)}</div>:null
			}
			<Button shape="border" onClick={() => onClickBtn('cancel')}>
				{cancelButton}
			</Button>
			<Button colors="primary" onClick={() => onClickBtn('save')}>
				{saveButton}
			</Button>
		</div>
	);
}
export default RefCoreButton;
