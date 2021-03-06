import axios from 'axios';
import {useState} from 'react';
import addSvg from '../../assets/img/add.svg';
import './Tasks.scss';


const AddTaskForm = ({list, onAddTask}) => {
    const[visibleForm, setFormVisible] = useState(false);
    const[inputValue, setInputValue] = useState('');
    const[isLoading, setIsLoading] = useState('');

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    };

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true);
        axios
        .post('https://to-do-react-deploy.herokuapp.com/tasks', obj)
        .then(({data}) => {
            console.log(data);
            onAddTask(list.id, data);
            toggleFormVisible(); 
        })
        .catch(()=> {
            alert('Ошибка при добавлении задачи');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    return (
        <div className='tasks__form'>
            {!visibleForm ? (<div onClick={toggleFormVisible} className='tasks__form-new'>
                <img src={addSvg} alt="Add icon"/>
                <span>Новая задача</span>
            </div>) : (
                <div className='tasks__form-block'>
                <input 
                className='field' 
                type='text' 
                placeholder='Текст задачи'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
                <button disabled={isLoading} onClick={addTask} className='button'>
                    {isLoading ? 'Добавление...' : 'Добавить задачу'}</button>
                <button onClick={toggleFormVisible} className='button button--grey'>Отмена</button>
                </div>
            )}           
        </div>
    )
}

export default AddTaskForm;
