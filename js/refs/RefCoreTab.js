import React, {Component} from 'react';
import PropTypes from 'prop-types'
import '../../css/refcoretab.css';
const propTypes = {
    show: PropTypes.bool,
    chosenText: PropTypes.string,
    hiddenChosenText: PropTypes.string,
    onSelectTabItem: PropTypes.func,
    selectedData: PropTypes.array,
    selecteing: PropTypes.bool
}

const defaultProps = {
    show: true,
    onSelectTabItem: ()=>{},
    selectedData: [],
    selecteing: true
}
class RefCoreTab extends Component {
    constructor(props){
        super(props);
        this.Alreadychosen = '';
        this.Hidechosen = '';

        const {language, chosenText, hiddenChosenText}= props;
        switch(language)
        {
            case "zh_CN":
                this.Alreadychosen = '已选';
                this.Hidechosen = "收起已选";
                break;
            case "en_US":
                this.Alreadychosen = 'chosen';
                this.Hidechosen = "Hide";
                break;
            case "zh_TW":
                this.Alreadychosen = '已選';
                this.Hidechosen = "收起已選";
                break;
            case "fr_FR":
                this.Alreadychosen = 'Choisissez';
                this.Hidechosen = "Cacher";
                break;
            case "de_DE":
                this.Alreadychosen = 'Gewählt Hat';
                this.Hidechosen = "Versteckt";
                break;
            case "ja_JP":
                this.Alreadychosen = '選択した';
                this.Hidechosen = "隠して";
                break;
            default:
                this.Alreadychosen = '已选';
                this.Hidechosen = "收起已选";
        }
        if (chosenText) {
          this.Alreadychosen = chosenText
        }
        if (hiddenChosenText) {
          this.Hidechosen = hiddenChosenText
        }
    }
    onSelectTabItem = () => {
        const { onSelectTabItem, selectedData, selecteing } = this.props;
        onSelectTabItem(selectedData, selecteing ? 'selected' : 'selecting')
    }
    render() {
        const {className, selectedData, show, selecteing} = this.props;
        return (
            <div className={`ref-tabs-panel ${ show ? '' : 'ref-tabs-hide' } ${className}`}>
                    {this.props.children}
                    <a className="selectedItemSum"
                        onClick={this.onSelectTabItem}>
                        {!selecteing ? this.Hidechosen : this.Alreadychosen + `：${selectedData.length}`}
                    </a>
            </div>
        );
    }
}
RefCoreTab.propTypes = propTypes;
RefCoreTab.defaultProps = defaultProps;
export default RefCoreTab;
