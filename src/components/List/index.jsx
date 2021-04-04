import './List.scss';
import classNames from 'classnames';
import axios from 'axios';
import Badge from '../Badge';

import removeSvg from '../../assets/img/remove.svg';

const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if(window.confirm('Вы действительно хотите удалить список?')){
            axios.delete('http://localhost:3005/lists/' + item.id).then(() => {
                onRemove(item.id);
            } )
            
        }
    }
    return (
        <ul onClick={onClick} className='list'>
            {items.map((item, index) => (
                <li 
                key={index} 
                className={classNames(item.className, {
                    active: item.active 
                    ? item.active 
                    : activeItem && activeItem.id === item.index
                })}
                onClick={onClickItem ? ()=> onClickItem(item) : null}>
                    {/* className={item.active ? 'active' : ''} */}
                    <i>{item.icon ? item.icon : <Badge color={item.color.name} /> }</i>
                    <span>
                        {item.name}
                        {item.tasks && `(${item.tasks.length})` }
                        </span>
                    {isRemovable && <img 
                    className='list__remove-icon' 
                    src={removeSvg} 
                    alt='Remove icon'
                    onClick={() => removeList(item)} />}
                </li>
            ))}
        </ul>
    )
}

export default List;