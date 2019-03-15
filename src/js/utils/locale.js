/**这里是国际化 */

export function paginationLocale(lang){
    switch(lang.toLocaleLowerCase())
    {
    case "zh_cn":
    return{
      'lang': 'zh-cn',
      'total': '共',
      'items': '条',
      'show': '显示',
      'goto':'跳至',
      'page':'页',
      'ok':'确认',
    }
    break;
    case "en_us":
    return {
        'lang':'en',
        'total': 'Total',
        'items': 'Items',
        'show': 'page',
        'goto':'goto',
        'page':'',
        'ok':'ok'
    }
    break;
    case "zh_tw":
    return {
      'total': '共',
      'items': '條',
      'show': '顯示',
      'goto':'跳至',
      'ok':'確認'
    }
    break;
    default:
    return{
      'lang': 'zh-cn',
      'total': '共',
      'items': '条',
      'show': '显示',
      'goto':'跳至',
      'page':'页',
      'ok':'确认',
    }
  }
}