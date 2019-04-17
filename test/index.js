
import React from 'react';
import ReactDOM from 'react-dom';
import RefCoreWithInput from '../js/refs/RefCoreWithInput'
import RefCoreSearch from '../js/refs/RefCoreSearch'
import RefCoreButton from '../js/refs/RefCoreButton'
import '../css/refcore.css'
import Loading from 'bee-loading';
import 'bee-loading/build/Loading.css'
function createLoading(){
    let div = document.createElement('div');
    document.body.appendChild(div);
    return {
        show: () =>{
            ReactDOM.render(<Loading
                showBackDrop={true}
                loadingType="line"
                show={true}
            /> ,div);
        },
        destory: () => {
            try{
                div.parentNode.removeChild(div);
                let loadingDom = document.getElementsByClassName('u-loading-backdrop')[0];
                loadingDom.parentNode.parentNode.removeChild(loadingDom.parentNode);
            }
            catch(e){
                console.log(e)
            }
        }
    }
};

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }
    render() {
        return (
            <div className="ref-core-modal-footer">
                {/* <button onClick={()=>{
                    let loading = createLoading()
                    loading.show();
                    setTimeout(()=>{
                        loading.destory();
                    }, 1000)
                }}>start</button> */}
                {/* <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={true}
                /> */}
                <RefCoreSearch />

                <RefCoreButton emptyBut={true}/>
            </div>
        )
    }
}


ReactDOM.render(
    <Demo />
    ,
    document.getElementById('root')
);

