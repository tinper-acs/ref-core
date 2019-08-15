<!--
 * @Date: 2019-08-10 15:29:39
 * @LastEditTime: 2019-08-15 20:15:21
 -->
# ref-core
参照组件的通用功能提取


## 如何使用

```shell
$ npm install ref-core --save

```
```javascript
import RefCoreError from 'ref-core/lib/refs/RefCoreError';
import RefCoreButton from 'ref-core/lib/refs/RefCoreButton';
import RefCoreTab from 'ref-core/lib/refs/RefCoreTab';
import RefCoreSearch from 'ref-core/lib/refs/RefCoreSearch';
import RefWithInput from 'ref-core/lib/refs/RefWithInput';
import RefCoreGlobal from 'ref-core/lib/refs/RefCoreGlobal';

```

## refcore提供以下通用组件

### RefCoreButton
    
    提供确认，取消，清空已选按钮，已经进行国际化适配。在树参照、表格参照可见到

### RefCoreError
    没有查询到数据的提示，默认提示‘没有查询到数据’，已经进行国际化适配。在树参照、表格参照可见到。

### RefCoreGlobal
    return (
            <div>
                { React.cloneElement(
                    this.props.children,
                    {...this.props}
                )}
            </div>  
        ）
    可以与所有参照类型进行组合
 
### RefCoreList
    输出带有多选的list列表。暂未使用
    
### RefCoreSearch
    带有input的搜索。在带有搜索的树参照、简单搜索表格参照可见。
    
### RefCoreTab
    tab切换，默认展示的文字是‘已选’，‘收起已选’。可在表格参照中见到
   

### RefCoreTable
    包含表格和分页。暂未使用

### RefCoreTree
    树组件。可在树参照中可见
 

### RefCoreWithInput
    input组件。可以与所有参照类型进行组合。
    

## API

<span style="color: red; font-size: 15px;">注意:分为接收参数和提供参数。</span>

### RefCoreButton
#### 接收参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
emptyBut| `bool` | false| 清空按钮是否展示 |否
onClickBtn | `function(value)` | - | 点击按钮的onclick回调，value分为save、cancel、clear | 否
language |`string`| `zh_CN` |多语配置，详情查看参数详解。可选'zh_CN'/'en_US'/'zh_TW'/'fr_FR'/'de_DE'/'ja_JP' | 否
buttons|`object`| - |{buttons:{cancelButton:'',saveButton:'',clearButton:''}} 按钮文字展示| 否


#### 提供参数暂无


### RefCoreError
#### 接收参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
language |`string`| `zh_CN` |多语配置，详情查看参数详解。可选'zh_CN'/'en_US'/'zh_TW'/'fr_FR'/'de_DE'/'ja_JP' | 否
show|`bool`| - |是否展示| 否

#### 提供参数暂无


###  RefCoreGlobal
#### 接收参数

暂无
#### 提供参数

暂无

###  RefCoreList
略

### RefCoreSearch

#### 接收参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
language |`string`| `zh_CN` |多语配置，详情查看参数详解。可选'zh_CN'/'en_US'/'zh_TW'/'fr_FR'/'de_DE'/'ja_JP' | 否
placeholder|`string`| `zh_CN` |input的placeholder，已做国际化。可选'zh_CN'/'en_US'/'zh_TW'/'fr_FR'/'de_DE'/'ja_JP' | 否
className| `string`| '' |input的class类名。| 否
show | `bool` | true | input是否展示 | 否
onSearch | `function(value)` | --|搜索按钮点击回调，value是搜索内容|否
onChange | `function(value)` | --|input输入回调，value是输入内容|否

#### 提供参数

暂无

### RefCoreTab
#### 接收参数
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
language |`string`| `zh_CN` |多语配置，详情查看参数详解。可选'zh_CN'/'en_US'/'zh_TW'/'fr_FR'/'de_DE'/'ja_JP' | 否
className| `string`| '' |tabPanel的class类名。| 否
show | `bool` | true | tabPanel是否展示 | 否
selectedData | `array` | [] | 已选择的数据 | 否
selecteing | `bool` | --|selecteing:true，展示已选择数；selecteing:false，展示文字：收起已选|否
onSelectTabItem | `function(selectedData, selecteing ? 'selected' : 'selecting')` | --|tab切换文字点击操作| 否

#### 提供参数

暂无

### RefCoreTable

略

### RefCoreTree

#### 接收参数
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
show | `bool` | true | tree是否展示 | 否
data | `array` | -- | tree数据|否
~~checkable~~| `bool` | -- | ~~行数据选中有对号展示~~| 否
nodeKeys | `function(value,index)` | 	return item.id || index;| <TreeNode/>节点的key | 否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
treeNodeDisabledKey | `string` | '' | tree上带有treeNodeDisabledKey指定属性并且为true时该树节点不可选中 | 否
### 提供参数
暂无

### RefCoreWithInput

#### 接收参数
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
filterUrlFunc| `function(value)` | ()=>{} | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会回调filterUrlFunc | 否
filertData| `Array`| [] | 必须配合filterUrl使用，当filterUrl为空或者不传入，才会使用filterData| 否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 
menuIcon | `react node` | menuIcon的dom | <span className="iconfont icon-nav-menu"></span>|否

注意refcorewithinput在1.0.0版本以上新增的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
inputDisplay |<code>string 或 function</code>|'{refname}' |记录中显示的内容的格式。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>inputDisplay: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
selectorOpen | `bool`| -- |控制下拉面板的展开或者关闭 | 否
onDropdownVisibleChangeSelector | `function(open,documentClick)` | -- | 触发下拉面板状态变化时的回调函数，open=true、false，documentClick是object，{documentClick:true/false},表示触发下拉面板状态变化的动作是点击input框还是其他区域，前者true，后false。注意return false可以阻止下拉面板正常下一步操作。 | 否
showMenuIcon| `boolean` | 是否展示menuIcon| true | 否
dropdownDisabled | `boolean` | 下拉是否展示，false是展示，true是不展示 | false | 否

#### 提供的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调，会更新checkedArray，showname（input的value），showModal关闭,最后回调RefWithInput接收的参数onSave| 否
onCancel | `function()` | -- | 参照取消的回调，会更新showModal关闭,最后回调RefWithInput接收的参数onCancel| 否
checkedArray | `Array` | [] | 传给树选中的节点| 否
onMatchInitValue| `function(value)` | onMatchInitValue = (checkedArray) => {this.setState({checkedArray})} | 更改checkedArray | 否

> <span style="color: red; font-size: 15px;"> RefCoreWithInput提供的参数可以保证参照组件的checkedArray更新以及参照showModal关闭打开，因此在使用RefCoreWithInput就不需要额外手动维护这两个参数</span>
