// import React, {Component} from 'react';
// import Icon from 'bee-icon';
// import ScrollArea from 'react-scrollbar';
// import '../../css/refcorecheckbox.css'
// import 'bee-icon/build/Icon.css'

// class RefCoreTreeCheckedList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   removeOne(item, event) {
//     const removeOne = this.props.removeOne;
//     removeOne(item);
//   }

//   render() {
//     const data = this.props.selectedArray;
//     const clearAll = this.props.clearAll;
//     const loop = datas => datas.map((item) => {
//       return (
//         <div className="item" key={item.refpk}>{item.refname}
//           <span className="remove" onClick={this.removeOne.bind(this, item)}>
//           <Icon
//             type="uf-del"/>
//         </span>
//         </div>
//       );
//     });
//     const center = {textAlign: "center", marginTop: 20}
//     return (

//       <div className="ref-core-checkbox ">
//         <div className="head">
//           已选择(<span>{data.length}</span>)
//           {
//             data.length ? <span className="clear" onClick={clearAll}>清除</span> : null
//           }
//         </div>
//         <ScrollArea speed={0.8} className="scroll" horizontal={false}>
//           <div className="list">
//             {
//               data.length ?
//                 loop(data) :
//                 <div style={center}>无数据!~</div>
//             }
//           </div>
//         </ScrollArea>
//       </div>
//     );
//   }
// }

// export default RefCoreTreeCheckedList;
