import React, {Component} from 'react';

import '../../css/refcoreerror.css'
const  RefCoreError = (props) => {
  const { language, show } = props
    let nodata = "没有查询到数据"
    switch(language)
    {
        case "zh_CN":
        nodata = '没有查询到数据';
        
        break;
        case "en_US":
        nodata = 'No query to data';
        break;
        case "zh_TW":
        nodata = '沒有査詢到數據'
        break;
        case "fr_FR":
        nodata = 'Pas de données';
        break;
        case "de_DE":
        nodata = 'Keine abfrage zu Daten';
        break;
        case "ja_JP":
        nodata = 'データが検索されていません';
        break;
        default:
        nodata = '没有查询到数据';
    }
    return (
      <div className={ show ? 'ref-core-error':'ref-core-error-hide'}>
        {nodata}
      </div>
    );
}
export default RefCoreError;
