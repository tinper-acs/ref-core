import React, {Component} from 'react';
import '../utils/polyfill_shim.js';

import {fetchJ} from '../utils/request';


export default class RefCoreGlobal extends Component {
    constructor(props){
        super(props);
        this.state = {
            // checkedArray: props.checkedArray,
        }
    }

    componentDidMount(){
        // var self = this;
        // var { refType , checkedArray } = this.props;
        // var tempCheckedArray = checkedArray;
        // if(this.props.onBeforeAjax){
        //     this.props.onBeforeAjax('begin')
        // }
        // //对checkedArray作判断
        // function ajaxWrap(val){
        //     var value = {};
        //     var url = option.refModelUrl.totalDataUrl
        //     fetchJ(url,{
        //         ...option.param,
        //         pk_val:val,
        //     })
        //     // .then( (response) => { return JSON.parse(response); })
        //     .then( ({ data }) => {
        //         var checkedArray = data.filter(({refpk})=>{
        //             return tempCheckedArray.indexOf(refpk)>-1
        //         })
        //         checkedArray = checkedArray.map((v,k)=>{
        //             v.key = v.refpk;
        //             return v
        //         })
        //         self.setState({
        //             checkedArray,
        //         })
        //         // return checkedArray;
        //     })
        //     .catch(()=>{
        //         self.setState({
        //             checkedArray:[]
        //         })
        //     })
        // }
        // if(!checkedArray || checkedArray==[] || checkedArray.length === 0 ){
        //     checkedArray = [];
        // }else{
        //     if(typeof(checkedArray[0]) === 'object'){
        //         //todo nothing
        //     }else{
        //         ajaxWrap(checkedArray);
        //     }
        // }
    }

    render(){
        // var { checkedArray } = this.state;
        return (
            <div>
                { React.cloneElement(
                    this.props.children,
                    {...this.props}
                )}
            </div>            
        )
    }

}
