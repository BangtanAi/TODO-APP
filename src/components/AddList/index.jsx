import {useState} from 'react';
import List from "../List";
import './AddButtonList.scss';
import '../../index.scss';

const AddButtonList = () => {
  const[visiblePopup, setVisiblePopup] = useState(true);
    return (
        <div className='add-list'>
            <List
            onClick={() => setVisiblePopup(true)}
            items={[
            {
              className: 'list__add-button',
              icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1V11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 6H11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>,
              name: 'Добавить список',
            }
          ]}
        />
        {visiblePopup && (
          <div className = 'add-list__popup'>
          <input className='field' type='text' placeholder='Название списка' />
          <button className='button' >Добавить</button>
          </div>
        )}
        </div>
        
    )
}
    
    
        

export default AddButtonList;