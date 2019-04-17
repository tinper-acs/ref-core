import React, { Component } from 'react';
import ReactDOM from 'react-dom';


//监听者模式对象
function Listenter() {
    this.events = {};
    this.on =  function(type, handler){
        if (typeof this.events[type] == "undefined"){
             this.events[type] = [];
        }
        this.events[type].push(handler);
    };
    this.fire = function(event){
         if (this.events[event] instanceof Array){
             var events = this.events[event];
             for (var i=0, len=events.length; i < len; i++){
                events[i](event); 
            }
         }
    }
    return this;
}

//监听队列
const Queue = {
}

//用于监听触发时间的 ReactJS 容器
class Container extends Component {
    constructor(props) {
      super(props);
      this.state = props;
    }
    componentDidMount() {
        let _this = this;
        let { listener } = Queue[this.props.eventId];
        if(!listener){
            listener = Queue[this.props.eventId] = new Listenter();
        }
        listener.on("show", () => {
            _this.setState({ 
                showModal: true  
            });
        });
        listener.on("hide", () => {
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
    const modalContainer = document.createElement('div');
    document.body.appendChild(modalContainer);
    //随机生成队列ID
    let eventId = `listener-${Math.random()}`;

    Queue[eventId] = new Listenter();
    let param = {
        show: () => {
            if(!Queue[eventId]){
                return false;
            }else{
                Queue[eventId].fire('show');
                return true
            }
        },
        hide: () => {
            if(!Queue[eventId]){
                return false;
            }else{
                Queue[eventId].fire('hide');
                return true
            }
        },
        destory: () => {
            if(!Queue[eventId]){
                return false;
            }else{
                delete Queue[eventId];
                return true
            }
        }
    };
    ReactDOM.render(
        
        <Container
            {...props}

            eventId = {eventId}
        >
        {
            React.cloneElement(component)
        }
        </Container>,
        modalContainer, () => {
            if(typeof callback === 'function'){
                callback(param)
            }
            
        });
    return param;
}

export {
    createRefModal, createRefInput
} 