import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Listener = {
    events: {},
    on: function(type, handler){
        if (typeof this.events[type] == "undefined"){
             this.events[type] = [];
        }
        this.events[type].push(handler);
    }, 
    fire: function(event){
         if (this.events[event] instanceof Array){
             var events = this.events[event];
             for (var i=0, len=events.length; i < len; i++){
                events[i](event); 
            }
         }
     }
}

class Container extends Component {
    constructor(props) {
      super(props);
      this.state = props;
    }
    componentDidMount() {
        let _this = this;
        Listener.on("show", () => {
            _this.setState({ 
                showModal: true  
            });
        });
        Listener.on("hide", () => {
            _this.setState({ 
                showModal: false  
            }, () => {
                let { onCancel } = this.props;
                if(onCancel){
                    onCancel();
                }
            });
        });
    }
    onCancelModal = (p) => {
        let { onCancel } = this.props;
		this.setState({ 
			showModal: false  
        });
        if(onCancel){
            onCancel();
        }
	}
    onSaveModal = (record) => {

        let { onSave } = this.props;
		this.setState({ 
			checkedArray: record,
			showModal: false  
        });
        if(onSave){
            onSave(record);
        }
	}
    render() {
        let {children} = this.props;
      return React.cloneElement(children, {
            ...this.state,
			onSave: this.onSaveModal,
			onCancel: this.onCancelModal
        });
    }
}

function createRefInput(selector, component, props){
    let dom = document.getElementById(selector);
    let destory = () => {
        try{
            dom.parentNode.removeChild(dom);
        }catch(e){
            console.log(e)
        }
    };

    ReactDOM.render(React.cloneElement(
                    component,
                    {...props}
                ),dom);
    return {
        destory: destory,
        dom: dom
    };
};

function createRefModal({component, ...props}, callback) {

    let div = document.createElement('div');
    document.body.appendChild(div);
    let param = {
        dom: div,
        show: () => {
            Listener.fire('show')
        },
        hide: () => {
            Listener.fire('hide')
        },
        destory: () => {
            div.parentNode.removeChild(div);
        }
    };
    ReactDOM.render(
        
        <Container
            {...props}
        >
        {
            React.cloneElement(component)
        }
        </Container>,div, () => {
            if(typeof callback === 'function'){
                callback(param)
            }
            
        });
    return param;
}

export {
    createRefModal, createRefInput
} 