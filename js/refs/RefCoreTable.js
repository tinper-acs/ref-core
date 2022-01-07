import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Checkbox, Pagination } from "@tinper/next-ui"
import '../../css/refcoretable.css'
class RefCoreTable extends Component {
  //选择列表参数
  static defaultProps = {
    prefixCls: "wui-table",
    multiSelect: {
      type: "checkbox",
      param: "key",
    }
  };
  constructor(props){
    super(props);
    this.onSelectTableItems = this.onSelectTableItems.bind(this);
    this.onClickBtn = this.onClickBtn.bind(this);
  }

  // initScroll = (refTable) => {
  //   // 监听滚动加载u-table-tbody
  //   let self = this;
  //   refTable.addEventListener('scroll', self.props.onSendData(refTable), false);
  // }
  
  componentDidMount(){
    var refTable = ReactDOM.findDOMNode(this.refTable).getElementsByClassName('u-table-body')[0];
    if(!this.props.hasPage && refTable){
      this.props.onSendData(refTable);
    }else{
      //todo nothing
    }
  }
  handleSelect(eventKey){
    this.props.handlePageSelect(eventKey);
  }
  onSelectTableItems(v,autoSave){
    this.props.onTableSelect(v,autoSave);
  }
  onClickBtn(v){
    this.props.onClickBtn(v);
  }
  //全选/全不选
  onAllCheckChange = () => {
    let self = this;
    let checkedArray = [];
    let listData = self.state.data.concat();
    for (var i = 0; i < self.state.checkedArray.length; i++) {
      checkedArray[i] = !self.state.checkedAll;
    }
    self.setState({
      checkedAll: !self.state.checkedAll,
      checkedArray: checkedArray,
    });
    var a = listData.slice().filter((v,k)=>{
      return checkedArray[k]==true;
    })
    this.onSelectTableItems(a);
  };
  //对某一个checkbox的点击事件
  onCheckboxChange = (text, record, index) => {
    let self = this;
    let allFlag = false;
    let checkedArray = self.state.checkedArray.concat();
    checkedArray[index] = !self.state.checkedArray[index];
    for (var i = 0; i < self.state.checkedArray.length; i++) {
      if (checkedArray[i] == false) {
        allFlag = false;
        break;
      } else {
        allFlag = true;
      }
    }
    self.setState({
      checkedAll: allFlag,
      checkedArray: checkedArray,
    });
    var a = this.state.data.slice().filter((v,k)=>{
      return checkedArray[k]==true;
    })
    this.onSelectTableItems(a)
  };
  clickRowHandler = (record, index, event) => {
    let checkedArray = this.state.checkedArray.concat();
    if(this.props.multiple){
      checkedArray = checkedArray.map((v,k)=>{
        if(k !== index){
          return false;
        }
      })
    }
    checkedArray[index] = !this.state.checkedArray[index];
    this.setState({
        checkedArray: checkedArray
    });
    var a = this.state.data.slice().filter((v,k)=>{
      return checkedArray[k]==true;
    })

    this.onSelectTableItems(a);
  }
  clickRowDoubleHandler = (record, index, event) => {
    let checkedArray = this.state.checkedArray.concat();
    if(this.props.multiple){
      checkedArray = checkedArray.map((v,k)=>{
        if(k !== index){
          return false;
        }
        return true;
      })
      checkedArray[index] = !this.state.checkedArray[index];
      this.setState({
          checkedArray: checkedArray
      });
      this.onSelectTableItems(this.state.data.slice().filter((v,k)=>{
        return checkedArray[k]==true;
      }),'multiple');
      // setTimeout(()=>{
      //   this.onClickBtn('save');
      // },100)
    }
    
  }
  rowClassNameHandler = (record,index,indent) => {
    if (this.state.checkedArray[index]) {
        if(this.props.multiple){
          return 'selected';
        }else{
          return '';
        }
    } else {
        return '';
    }
  }

  renderColumnsMultiSelect(columns) {
    var self = this;
    const { data,checkedArray } = this.state;
    const { multiSelect } = this.props;
    let select_column = {};
    let indeterminate_bool = false;
    if(!this.props.multiple){
      if (multiSelect && multiSelect.type === "checkbox") {
        let i = checkedArray.length-1;
        while(i>=0){
            if(checkedArray[i]){
              indeterminate_bool = true;
              break;
            }
            i--;
        }//判断是否有部分选中
        let defaultColumns = [
          {
            title:(
              <Checkbox
                className="table-checkbox"
                checked={this.state.checkedAll}
                indeterminate={indeterminate_bool&&!this.state.checkedAll}
                onChange={this.onAllCheckChange}
              />
            ),
            key: "checkbox",
            dataIndex: "checkbox",
            width: "5%",
            render: function(text, record, index){
              return (
                <Checkbox
                  className="table-checkbox"
                  checked={checkedArray[index]}
                  onChange={self.onCheckboxChange.bind(this, text, record, index)}
                  onClick={(e) => e.stopPropagation()}
                />
              );
            }
          }
        ];
        columns = defaultColumns.concat(columns);
      }
    }else{
      columns = [{key: "radio",width:'5%'}].concat(columns);
    }
    return columns;
  }
  render() {
    var { listData=[], cols=[] } = this.props.data;
    var selectedArray = this.props.selectedArray;
    var tabActiveKey = this.props.tabActiveKey;
    var language = this.props.language;
    var len = listData.length;
    let nodata = "没有查询到数据"
    switch(language)
          {
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
    var checkedArrayCreater = new Array(len).fill(false)
    function ifInSelected (v,selectedArray){
      let flag = false;
      selectedArray.forEach((val)=>{
        if(val.key == v.key || val.refpk == v.key) flag = true
      })
      return flag;
    }
    listData.slice().forEach((v,k)=>{
      ifInSelected(v,selectedArray)?(checkedArrayCreater[k]=true):(checkedArrayCreater[k]=false);
    })
    var data =null,checkedArray=null;
    if(tabActiveKey == '__selected'){
      //data = listData.filter((v,k)=>{return ifInSelected(v,selectedArray)});
      data = selectedArray;
      checkedArray =  data.slice().forEach((v,k)=>{
        ifInSelected(v,selectedArray) ? (checkedArrayCreater[k]=true):(checkedArrayCreater[k]=false);
      })
    }else{
      data = listData;
      checkedArray= checkedArrayCreater;
    }
    var ifAllSelected = checkedArrayCreater.indexOf(false)>-1
    this.state = {
      checkedAll : !ifAllSelected && data.length!=0,//data.length == selectedArray.length 
      checkedArray: checkedArrayCreater,
      data: data,
    };
    let columns = this.renderColumnsMultiSelect(cols);
    let option = {
      scroll: { y: 270 },
      emptyText: ()=>nodata,
      style:{'height':301,},
    }
    return (
      <div className='tableCon'>
        <div className='ref-core-table'>
          <Table {...option} ref={(el) => this.refTable = el }
            columns={columns} 
            data={this.state.data} 
            rowClassName={this.rowClassNameHandler}
            onRowClick={this.clickRowHandler}
            onRowDoubleClick={this.clickRowDoubleHandler}
            />
        </div>
        {
          this.props.hasPage &&
            <div className='ref-core-table-pagination-wrap'>
              <Pagination
                  first last prev next boundaryLinks
                  items={this.props.pageCount}
                  size='sm'
                  maxButtons={5}
                  current={this.props.curPage+1}
                  onChange={this.handleSelect.bind(this)}
                  />
            </div>
        }
      </div>
      )
  }
}
export default RefCoreTable;
